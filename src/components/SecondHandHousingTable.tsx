import { Divider, Space, Table, TableProps, Tag, Typography } from "antd";
import useImagePhoto from "./ImagePhoto";
import { ImageIcon } from "./icons";
import useFanyFrom from "./FanyFrom";
import { useFangyFilter } from "../hooks/useFilterExpand";

interface DataType {
  // 房源图片
  image_url: string[];
  // 户主姓名
  name: string;
  // 位置
  location: string;
  // 区域
  region: string;
  // 联系方式
  phone: string;
  // 报价
  price: string;
  // 低价
  low_price?: string;
  // 房型
  room: string;
  // 面积
  area: string;
  // 朝向
  toward: string;
  // 楼层`
  floor: string;
  // 产权
  property: string;
  // 装修
  decoration: string;
  // 房龄
  age: string;
  // 电梯
  property_type: string;
  // 标签
  tags: string;
  // 更新事件
  updated_at: string;

  // 备注
  comment?: string;
}

export function SecondHandHousingTable() {
  const { openDialog, fanyFromNode } = useFanyFrom();
  const { openPhotoView, imagePhotoNode } = useImagePhoto();
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "图片",
      dataIndex: "image_url",
      key: "image_url",
      render: (image_url) => {
        return (
          <div
            onClick={() => openPhotoView(image_url)}
            style={{ cursor: "pointer" }}
          >
            <ImageIcon />
          </div>
        );
      },
    },
    {
      title: "户主姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "联系方式",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "位置",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "区域",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "报价",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "低价",
      dataIndex: "low_price",
    },
    {
      title: "房型",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "面积 (单位 m²)",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "朝向",
      dataIndex: "toward",
      key: "toward",
    },
    {
      title: "楼层",
      dataIndex: "floor",
      key: "floor",
    },
    {
      title: "产权",
      dataIndex: "property",
      key: "property",
    },
    {
      title: "装修",
      dataIndex: "decoration",
      key: "decoration",
    },
    {
      title: "房龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "物业类型",
      dataIndex: "property_type",
      key: "property_type",
    },

    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => {
        return (
          <div>
            {tags.split(",").map((tag: string) => (
              <Tag color="green" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 150,
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: () => {
        return (
          <Space split={<Divider type="vertical" />}>
            <Typography.Link onClick={() => openDialog()}>编辑</Typography.Link>
            <Typography.Link>
              <span style={{ color: "#000000e0" }}>删除</span>
            </Typography.Link>
          </Space>
        );
      },
    },
  ];

  const data = new Array(100).fill({
    image_url: [
      "https://image2a.5i5j.com/scm/HOUSE_CUSTOMER/3d59a520f7e54fe7a66a9f31f92df0ef.jpg_P5.jpg",
      "https://image2a.5i5j.com/scm/HOUSE_CUSTOMER/ca88d267121f4e25b625b400f008afbc.jpg_P5.jpg",
    ],
    name: "罗玉美",
    location: "K1842四季花城",
    region: "朝阳区",
    price: "123万",
    low_price: "121万",
    room: "二室一厅",
    area: "100",
    toward: "南",
    floor: "5",
    property: "商品房",
    decoration: "毛坯",
    age: "5年",
    property_type: "住宅",
    tags: "绿化好",
    phone: "12345678901",
    updated_at: "2021-10-10 10:10:10",
    comment: "这个房子很好",
  });

  const { expand } = useFangyFilter();

  return (
    <div>
      {imagePhotoNode}
      <Table
        size="small"
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          total: 100,
          pageSize: 20,
          size: "default",
          onChange: (page) => {
            console.log(page);
          },
        }}
        scroll={{ y: window.innerHeight - (expand ? 618 : 532) }}
        dataSource={data}
      />
      {fanyFromNode}
    </div>
  );
}
