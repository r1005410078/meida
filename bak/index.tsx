import { Button, Flex, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import useFanyFrom from "../../components/FanyFrom";
import FanyList from "../../components/FanyList";

export interface HouseProps {}

export function HousePage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { openDialog, fanyFromNode } = useFanyFrom();

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
              onClick={() => openDialog()}
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
        }}
      >
        <FanyList />
        {fanyFromNode}
      </Content>
    </>
  );
}
