import React from "react";
import { Upload } from "antd";
import { createMultipartUploadV2Task, FileData } from "qiniu-js";
import { v4 } from "uuid";
import axios from "axios";
import type { FormInstance, UploadFile } from "antd";
import { SecondHandHousingFrom } from "../model/SecondHandHousing";

interface UploadFanyProps {
  onChange?: (value: UploadFile<any>[]) => void;
  value?: UploadFile<any>[];
}

const UploadFany: React.FC<UploadFanyProps> = ({ onChange, value }) => {
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={value}
        multiple
        onChange={({ fileList }) => {
          onChange?.(fileList.map((item) => ({ ...item, status: "done" })));
        }}
      >
        上传房源图片
      </Upload>
    </>
  );
};

export function fangImagesUpload(
  form: FormInstance<SecondHandHousingFrom>,
  image_data: UploadFile[]
) {
  if (image_data) {
    const will_upload_image_data = image_data.map((uploadFile) => {
      const uploadTask = qiniuUpload(uploadFile.originFileObj!);
      // 设置进度回调函数
      uploadTask.onProgress((progress) => {
        // 处理进度回调
        const old_image_data: UploadFile[] = form.getFieldValue("image_data");

        form.setFieldValue(
          "image_data",
          old_image_data.map((item) => {
            if (item.uid === uploadFile.uid) {
              return {
                ...item,
                status: "uploading",
                percent: progress.percent * 100,
              };
            }
            return item;
          })
        );
      });

      // 设置完成回调函数
      uploadTask.onComplete(() => {
        // 处理完成回调
        // 处理进度回调
        form.setFieldValue(
          "image_data",
          image_data.map((item) => {
            if (item.uid === uploadFile.uid) {
              return {
                ...item,
                status: "done",
              };
            }
            return item;
          })
        );
      });

      // 设置错误回调函数
      uploadTask.onError((error) => {
        // 处理错误回调
        form.setFieldValue(
          "image_data",
          image_data.map((item) => {
            if (item.uid === uploadFile.uid) {
              return {
                ...item,
                status: "error",
                error,
              };
            }
            return item;
          })
        );
      });

      return uploadTask.start();
    });

    // 等待所有图片上传完成
    return Promise.all(will_upload_image_data);
  }
}

export function qiniuUpload(file: File) {
  const fileName = `${v4()}_${file.name}`;
  const data = new File([file], fileName);
  const fileData: FileData = {
    type: "file",
    data,
  };

  const uploadTask = createMultipartUploadV2Task(fileData, {
    /** 上传 token 提供器；SDK 通过该接口获取上传 Token */
    tokenProvider: async () => {
      return axios
        .get(`/api/second_hand_housing/get_qiniu_token/${fileName}`)
        .then((res) => res.data.data);
    },
  });

  return uploadTask;
}

export default UploadFany;
