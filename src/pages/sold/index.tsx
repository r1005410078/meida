import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export function SoldPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname === "/house/sold" && (
        <Navigate to="/house/sold/second-hand-house" />
      )}
      <PageContainer
        fixedHeader
        token={{
          paddingBlockPageContainerContent: 16,
          paddingInlinePageContainerContent: 24,
        }}
        header={{
          title: "已售出的房源",
          ghost: true,
          extra: [
            <Button type="primary" icon={<DownloadOutlined />}>
              导出房源数据
            </Button>,
          ],
        }}
        tabActiveKey={location.pathname}
        onTabChange={(key) => {
          navigate(key);
        }}
        tabList={[
          {
            tab: "二手房",
            key: "/house/sold/second-hand-house",
          },
          {
            tab: "出租房",
            key: "/house/sold/rental-house",
          },
        ]}
      >
        <Outlet />
      </PageContainer>
    </>
  );
}
