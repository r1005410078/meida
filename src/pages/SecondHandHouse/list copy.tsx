import {
  Button,
  Divider,
  Dropdown,
  Flex,
  MenuProps,
  Segmented,
  Space,
  Table,
  theme,
  Typography,
} from "antd";
import {
  PlusOutlined,
  DownOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  useGetListListed,
  useListed,
  useUnListed,
} from "../../api/SecondHandHouse";
import { useSoldModal } from "./SoldModal";

export function List() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { data: list } = useGetListListed();
  // 上架
  const listed = useListed();
  // 下架
  const unListed = useUnListed();
  // 卖出

  const [listParams, setListParams] = useState({
    page_index: 1,
    page_size: 20,
  });

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "已上架",
    },
    {
      key: "2",
      label: "已下架",
    },
    {
      key: "3",
      label: "已卖出",
    },
  ];

  const { openSoldModal, soldModalNode } = useSoldModal();

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
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
                navigate("/second-hand-house/new");
              }}
              icon={<PlusOutlined />}
            >
              登记二手房
            </Button>
          </div>
        </Flex>
      </Header>
      <Content
        style={{
          margin: "24px",
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          overflow: "auto",
        }}
      >
        <Flex gap="middle" align="center" style={{ height: 62 }}>
          <div style={{ flex: 1 }}></div>
          <Space size={0}>
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ["3"],
              }}
            >
              <Button type="text">
                <Space>
                  区域
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Dropdown
              menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ["3"],
              }}
            >
              <Button type="text">
                <Space>
                  已上架
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Segmented
              options={[
                { value: "List", icon: <BarsOutlined /> },
                {
                  value: "Kanban",
                  disabled: true,
                  icon: <AppstoreOutlined />,
                },
              ]}
            />
          </Space>
        </Flex>

        <Table
          size="small"
          dataSource={list}
          columns={[
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
              title: "小区名称",
              dataIndex: "community_name",
              key: "community_name",
              fixed: "left",
            },
            {
              title: "房屋地址",
              dataIndex: "house_address",
              key: "house_address",
              width: 220,
            },
            {
              title: "价格",
              dataIndex: "pice",
              key: "pice",
              width: 120,
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
                      navigate(`/second-hand-house/edit/${record.house_id}`);
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
                          label: record.listed ? "下架" : "上架",
                          icon: <PlusOutlined />,
                          onClick: () => {
                            if (record.listed) {
                              unListed.mutate(record.house_id);
                            } else {
                              listed.mutate(record.house_id);
                            }
                          },
                        },
                        {
                          key: "3",
                          label: "卖出",
                          icon: <PlusOutlined />,
                          onClick: () => {
                            openSoldModal(record.house_id);
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
      {soldModalNode}
    </>
  );
}
