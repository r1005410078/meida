import React, { useEffect, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Avatar, Card, List, Segmented, Space, Tabs, Tooltip } from "antd";
import useImagePhoto from "./ImagePhoto";
import useFanyFrom from "./FanyFrom";
import { useQuery } from "react-query";
import { query_fangy } from "../api/fangy";
import { FilterSecondHandHousing } from "./FilterSecondHandHousing";
import "./FanyList.less";

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

interface FanyListProps {}

const FanyList: React.FC<FanyListProps> = () => {
  const { openPhotoView, imagePhotoNode } = useImagePhoto();
  const { openDialog, fanyFromNode } = useFanyFrom();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const { data: result } = useQuery(["query_fangy", page, pageSize], () =>
    query_fangy({ page_index: `${page}`, page_size: `${pageSize}` })
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "16px 0",
          justifyContent: "flex-end",
        }}
      >
        <Segmented size="large" options={["二手房", "租房", "新房"]} />
      </div>
      <Card>
        <FilterSecondHandHousing />
      </Card>
      <Tabs
        className="tangy-list-tabs"
        tabBarExtraContent={{
          left: (
            <div style={{ width: "100%" }}>
              共找到 <strong style={{ color: "red" }}>16305</strong>{" "}
              套二手房房源
            </div>
          ),
        }}
        defaultActiveKey="2"
        items={[
          {
            label: "总价",
            key: "1",
            icon: <ArrowUpOutlined />,
            children: <div>111</div>,
          },
          {
            label: "单价",
            key: "3",
            icon: <ArrowUpOutlined />,
            children: <div>333</div>,
          },
          {
            label: "面积",
            key: "2",
            icon: <ArrowUpOutlined />,
            children: <div>222</div>,
          },
          {
            label: "最新发布事件",
            key: "4",
            icon: <ArrowUpOutlined />,
            children: <div>444</div>,
          },
        ]}
      />
      {imagePhotoNode}
      {fanyFromNode}
    </>
  );
};

export default FanyList;
