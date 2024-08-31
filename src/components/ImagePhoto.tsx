import "react-photo-view/dist/react-photo-view.css";
import { PhotoSlider } from "react-photo-view";
import { useState } from "react";
import { Button, message } from "antd";

export default function useImagePhoto() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  // 封面
  const [isCover, setCover] = useState(true);
  // const images = [
  //   "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   "https://react-photo-view.vercel.app/_next/static/media/6.0271162c.jpg",
  // ];

  const imagePhotoNode = (
    <>
      <PhotoSlider
        toolbarRender={() => [
          isCover ? (
            <Button
              type="primary"
              onClick={() => {
                setCover(false);
                message.success("设置成功");
              }}
            >
              设置成封面
            </Button>
          ) : null,
        ]}
        images={images.map((item) => ({ src: item, key: item }))}
        visible={visible}
        onClose={() => setVisible(false)}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );

  return {
    imagePhotoNode,
    openPhotoView: (images?: string[]) => {
      if (images) {
        setVisible(true);
        setImages(images);
      }
    },
    closePhotoView() {
      setVisible(false);
    },
  };
}
