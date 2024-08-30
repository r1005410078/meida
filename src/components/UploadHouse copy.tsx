import React, { useEffect, useMemo, useState } from "react";
import { Upload } from "antd";
import { createMultipartUploadV2Task, FileData } from "qiniu-js";
import { v4 } from "uuid";
import axios from "axios";
import type { FormInstance, UploadFile, UploadProps } from "antd";
import { HouseFrom } from "../model/House";

interface UploadHouseProps {
  onChange?: (value: UploadFile<any>[]) => void;
  value?: UploadFile<any>[];
}

const UploadHouse: React.FC<UploadHouseProps> = ({
  onChange,
  value: fileList,
}) => {
  console.log("fileList", fileList);
  const memoFileList = useMemo(() => {
    if (typeof fileList === "string") {
      return (fileList as string).split(",").map((url) => {
        return {
          uid: v4(),
          name: "image.png",
          status: "done",
          url,
        } as any as UploadFile<any>;
      });
    }

    if (!fileList) {
      return [];
    }

    return fileList;
  }, [fileList]);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = memoFileList.indexOf(file);
      const newFileList = memoFileList.slice();
      newFileList.splice(index, 1);
      onChange?.(newFileList);
    },
    beforeUpload: (file) => {
      console.log("file", file);
      onChange?.([...memoFileList, file]);
      return false;
    },
    multiple: true,
    listType: "picture-card",
    fileList: memoFileList,
  };

  return (
    <>
      <Upload {...props}>上传房源图片</Upload>
    </>
  );
};

export function fangImagesUpload(
  form: FormInstance<HouseFrom>,
  house_image: UploadFile[]
) {
  if (Array.isArray(house_image)) {
    const will_upload_house_image = house_image.map((uploadFile) => {
      const uploadTask = qiniuUpload(uploadFile.originFileObj!);
      // 设置进度回调函数
      uploadTask.onProgress((progress) => {
        // 处理进度回调
        const old_house_image: UploadFile[] = form.getFieldValue("house_image");

        form.setFieldValue(
          "house_image",
          old_house_image.map((item) => {
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
          "house_image",
          house_image.map((item) => {
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
          "house_image",
          house_image.map((item) => {
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
