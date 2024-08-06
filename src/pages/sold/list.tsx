import { Button, Flex, MenuProps, Table, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useListSold } from "../../api/SecondHandHouse";

export function List() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { data: list } = useListSold();

  // 卖出
  const [listParams, setListParams] = useState({
    page_index: 1,
    page_size: 20,
  });

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
              icon={<PlusOutlined />}
            >
              下载房源
            </Button>
          </div>
        </Flex>
      </Header>
      <Content
        style={{
          margin: "0",
          padding: "0 24px 24px",
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          overflow: "auto",
        }}
      >
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
              title: "出售的价格",
              dataIndex: "sold_price",
              key: "sold_price",
              width: 120,
            },
          ]}
        />
      </Content>
    </>
  );
}
