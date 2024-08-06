import {
  Button,
  Divider,
  Dropdown,
  Flex,
  Modal,
  Space,
  Table,
  theme,
  Typography,
} from "antd";
import {
  PlusOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { useDeleteHouse, useHouseList } from "../../api/house";
import { useState } from "react";

export function List() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [listParams, setListParams] = useState({
    page_index: 1,
    page_size: 20,
  });
  const { data } = useHouseList(listParams);
  const deleteCommunity = useDeleteHouse();

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Flex justify="space-between" align="center">
          <Button
            type="text"
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div style={{ marginRight: 16 }}>
            <Button
              size="large"
              shape="round"
              type="primary"
              onClick={() => {
                navigate("/house/new");
              }}
              icon={<PlusOutlined />}
            >
              登记房源
            </Button>
          </div>
        </Flex>
      </Header>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          overflow: "auto",
        }}
      >
        <Table
          size="small"
          dataSource={data?.data}
          rowKey={(record) => record.community_name}
          scroll={{ x: 2000 }}
          columns={[
            {
              title: "小区名称",
              dataIndex: "community_name",
              key: "community_name",
              width: 120,
              fixed: "left",
            },
            {
              title: "房屋地址",
              dataIndex: "house_address",
              key: "house_address",
              width: 120,
            },
            {
              title: "房屋类型",
              dataIndex: "house_type",
              key: "house_type",
            },
            {
              title: "住宅区类型",
              dataIndex: "community_type",
              key: "community_type",
            },
            {
              title: "房屋面积",
              dataIndex: "area",
              key: "area",
            },
            {
              title: "客厅数量",
              dataIndex: "living_rooms",
              key: "living_rooms",
            },
            {
              title: "卧室数量",
              dataIndex: "bedrooms",
              key: "bedrooms",
            },
            {
              title: "卫生间数量",
              dataIndex: "bathrooms",
              key: "bathrooms",
            },
            {
              title: "房屋朝向",
              dataIndex: "orientation",
              key: "orientation",
            },
            {
              title: "房屋装修情况",
              dataIndex: "decoration_status",
              key: "decoration_status",
            },
            {
              title: "房屋状态",
              dataIndex: "status",
              key: "status",
            },
            {
              title: "房屋图片",
              dataIndex: "house_image",
              key: "house_image",
              width: 200,
            },
            {
              title: "房屋朝向",
              dataIndex: "orientation",
              key: "orientation",
            },
            {
              title: "户主姓名",
              dataIndex: "owner_name",
              key: "owner_name",
            },
            {
              title: "户主联系方式",
              dataIndex: "owner_phone",
              key: "owner_phone",
            },
            {
              title: "房屋描述",
              dataIndex: "house_description",
              key: "house_description",
            },
            {
              title: "操作",
              dataIndex: "action",
              width: 130,
              fixed: "right",
              key: "action",
              render: (_, record) => (
                <Space split={<Divider type="vertical" />}>
                  <Typography.Link
                    onClick={() => {
                      navigate(`/house/edit/${record.house_id}`);
                    }}
                  >
                    编辑
                  </Typography.Link>
                  <Dropdown
                    trigger={["click"]}
                    menu={{
                      items: [
                        {
                          key: "2",
                          label: "登记成二手房",
                          icon: <PlusOutlined />,
                          onClick: () => {
                            console.log(111);
                          },
                        },
                        {
                          key: "3",
                          label: "登记成租房",
                          icon: <PlusOutlined />,
                          onClick: () => {
                            console.log(333);
                          },
                        },
                        {
                          key: "1",
                          label: "删除房源",
                          icon: <DeleteOutlined />,
                          onClick: () => {
                            Modal.confirm({
                              title: "确定删除房源吗?",
                              icon: <ExclamationCircleFilled />,
                              content: "删除后不可恢复!!",
                              okText: "确定",
                              okType: "danger",
                              cancelText: "取消",
                              onOk() {
                                deleteCommunity.mutate(record.house_id);
                              },
                            });
                          },
                        },
                      ],
                    }}
                  >
                    <Typography.Link>
                      <Space>
                        更多
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </Space>
              ),
            },
          ]}
        />
      </Content>
    </>
  );
}
