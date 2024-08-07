import { Button, Flex, Tabs, TabsProps, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useLocation, useNavigate } from "react-router";

export function SoldPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: TabsProps["items"] = [
    {
      key: "second-hand-house",
      label: "二手房",
      children: <Outlet />,
    },
    {
      key: "rental-house",
      label: "出租房",
      children: <Outlet />,
    },
  ];

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
        <Tabs
          accessKey={pathname.split("/")[1]}
          items={items}
          onChange={(activeKey) => {
            navigate(`/sold/${activeKey}`);
          }}
        />
      </Content>
    </>
  );
}
