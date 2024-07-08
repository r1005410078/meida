import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { ImageData } from "../api/fangy";

const fileList: UploadFile[] = [
  // {
  //   uid: "0",
  //   name: "xxx.png",
  //   status: "uploading",
  //   percent: 33,
  // },
  // {
  //   uid: "-1",
  //   name: "yyy.png",
  //   status: "done",
  //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   thumbUrl:
  //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  // },
  // {
  //   uid: "-2",
  //   name: "zzz.png",
  //   status: "error",
  // },
];

interface UploadFanyProps {
  onChange?: (value: ImageData[]) => void;
  value?: string;
}

const UploadFany: React.FC<UploadFanyProps> = ({ onChange, value }) => {
  const [uploadFiles, setUploadFiles] = useState<RcFile[]>([]);

  useEffect(() => {
    if (onChange) {
      let bufs = uploadFiles.map(async (file) => {
        const buf = await file.arrayBuffer();
        return {
          path: file.name,
          content: Array.from(new Uint8Array(buf)),
        };
      });

      Promise.all(bufs).then((buf) => {
        onChange(buf);
      });
    }
  }, [uploadFiles]);

  return (
    <>
      <Upload
        onRemove={(file) => {
          setUploadFiles(uploadFiles.filter((item) => item.uid !== file.uid));
        }}
        beforeUpload={async (file) => {
          setUploadFiles([...uploadFiles, file]);
          return false;
        }}
      >
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>
    </>
  );
};

export default UploadFany;
