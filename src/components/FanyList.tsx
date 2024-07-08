import React, { useEffect, useState } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Tooltip } from "antd";
import useImagePhoto from "./ImagePhoto";
import useFanyFrom from "./FanyFrom";
import { useQuery } from "react-query";
import { query_fangy } from "../api/fangy";

// const data = Array.from({ length: 23 }).map((_, i) => ({
//   href: "https://ant.design",
//   title: `ant design part ${i}`,
//   avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//   description:
//     "Ant Design, a design language for background applications, is refined by Ant UED Team.",
//   content:
//     "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
// }));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

interface FanyListProps {
  keyword: string;
}

const FanyList: React.FC<FanyListProps> = ({ keyword }) => {
  const { openPhotoView, imagePhotoNode } = useImagePhoto();
  const { openDialog, fanyFromNode } = useFanyFrom();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const { data: result } = useQuery(
    ["query_fangy", keyword, page, pageSize],
    () =>
      query_fangy({ page_index: `${page}`, page_size: `${pageSize}`, keyword })
  );

  useEffect(() => {
    setPage(0);
  }, [keyword]);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          total: result?.total,
          onChange: (page) => {
            setPage(page);
          },
          pageSize,
        }}
        dataSource={result?.data}
        footer={
          <div>
            <b>美大</b> 房源管理
          </div>
        }
        renderItem={(item) => {
          const images = item.image_url.split(",");
          const image = images[0];

          if (image) {
            console.log(image);
          }

          return (
            <List.Item
              key={item.name}
              actions={[
                <Tooltip title="最后更新时间">
                  <IconText
                    icon={FieldTimeOutlined}
                    text={item.updated_at}
                    key="list-vertical-star-o"
                  />
                </Tooltip>,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  onClick={() => openPhotoView(images)}
                  src={
                    image ||
                    "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  }
                />
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                }
                title={
                  <a
                    onClick={() => {
                      openDialog(item);
                    }}
                  >
                    {item.name}
                  </a>
                }
                description={
                  <div>
                    <span>{item.phone}</span>
                  </div>
                }
              />
              <p>房屋地址：{item.address}</p>
              <p>备注： {item.comment}</p>
            </List.Item>
          );
        }}
      />
      {imagePhotoNode}
      {fanyFromNode}
    </>
  );
};

export default FanyList;
