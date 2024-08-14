import {
  Divider,
  Dropdown,
  Space,
  Table,
  TableProps,
  Tag,
  Typography,
  Modal,
} from "antd";
import useImagePhoto from "./ImagePhoto";
import { ImageIcon } from "./icons";
import useFanyFrom from "./FanyFrom";
import { useFangyFilter } from "../hooks/useFilterExpand";
import {
  DownOutlined,
  DeleteOutlined,
  WalletOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import { deleteSecondHandHousing } from "../api/SecondHandHousing";
import { SecondHandHousing } from "../model/second_hand_housing";
import { useQuerySecondHandHousing } from "../hooks/useQuerySecondHandHousing";

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
  const { result } = useQuerySecondHandHousing();

  const client = useQueryClient();

  const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation(
    ["DeleteSecondHandHousing"],
    (id: number) => deleteSecondHandHousing(id),
    {
      onSuccess: () => {
        client.invalidateQueries(["QuerySecondHandHousing"]);
      },
    }
  );

  const columns: TableProps<SecondHandHousing>["columns"] = [
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
      dataIndex: "address",
      key: "address",
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
      dataIndex: "direction",
      key: "direction",
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
      dataIndex: "tag",
      key: "tag",
      render: (tag) => {
        return (
          <div>
            {tag?.split(",").map((tag: string) => (
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
      width: 160,
      render: (_, item) => {
        return (
          <Space split={<Divider type="vertical" />}>
            <Typography.Link onClick={() => openDialog(item)}>
              编辑
            </Typography.Link>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: <span>卖出</span>,
                    icon: <WalletOutlined />,
                  },
                  {
                    key: "2",
                    label: (
                      <span
                        onClick={() => {
                          Modal.confirm({
                            title: "是否要删除房源?",
                            icon: <ExclamationCircleFilled />,
                            content: "删除后不可恢复",
                            okText: "删除",
                            okType: "danger",
                            cancelText: "取消",
                            okButtonProps: { loading: deleteLoading },
                            onOk() {
                              deleteMutate(item.id);
                            },
                          });
                        }}
                      >
                        删除
                      </span>
                    ),
                    icon: <DeleteOutlined />,
                  },
                ],
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  更多
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const dataSource = result?.data;
  const { expand } = useFangyFilter();

  return (
    <div>
      {imagePhotoNode}
      <Table
        size="small"
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          total: result?.total,
          pageSize: 20,
          size: "default",
          onChange: (page) => {
            console.log(page);
          },
        }}
        scroll={{ y: window.innerHeight - (expand ? 618 : 532) }}
        dataSource={dataSource}
      />
      {fanyFromNode}
    </div>
  );
}
