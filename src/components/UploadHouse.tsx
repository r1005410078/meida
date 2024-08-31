import React, { useMemo } from "react";
import { Upload } from "antd";
import { createMultipartUploadV2Task, FileData } from "qiniu-js";
import { v4 } from "uuid";
import axios from "axios";
import type { FormInstance, UploadFile } from "antd";
import { HouseFrom } from "../model/House";
import Compressor from "compressorjs";

interface UploadHouseProps {
  onChange?: (value: UploadFile<any>[]) => void;
  value?: UploadFile<any>[];
}

const UploadHouse: React.FC<UploadHouseProps> = ({ onChange, value }) => {
  const fileList = useMemo(() => {
    if (typeof value === "string") {
      return (value as string).split(",").map((url) => {
        return {
          name: "image.png",
          status: "done",
          url,
        };
      });
    }
    return value;
  }, [value]);

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList as any}
        customRequest={async () => {}}
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
  form: FormInstance<HouseFrom>,
  house_image: UploadFile[]
) {
  if (Array.isArray(house_image)) {
    const will_upload_house_image = house_image
      .filter((item) => item.originFileObj)
      .map((uploadFile) => {
        return new Promise<File>((success, error) => {
          new Compressor(uploadFile.originFileObj as File, {
            quality: 0.6,
            success(file) {
              success(new File([file], uploadFile.name));
            },
            error,
          });
        });
      })
      .map(async (file) => {
        const uploadFile = await file;
        const uploadTask = qiniuUpload(uploadFile);
        // 设置进度回调函数
        uploadTask.onProgress((progress) => {
          // 处理进度回调
          const old_house_image: UploadFile[] =
            form.getFieldValue("house_image");

          form.setFieldValue(
            "house_image",
            old_house_image.map((item) => {
              if (item.originFileObj?.name === uploadFile.name) {
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
            "house_image",
            house_image.map((item) => {
              if (item.originFileObj?.name === uploadFile.name) {
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
            "house_image",
            house_image.map((item) => {
              if (item.originFileObj?.name === uploadFile.name) {
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

        return await uploadTask.start();
      });

    // 等待所有图片上传完成
    return Promise.all(will_upload_house_image);
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
        .get(`/api/v1/qiniu/get_token/${fileName}`)
        .then((res) => res.data.data);
    },
  });

  return uploadTask;
}

export default UploadHouse;
