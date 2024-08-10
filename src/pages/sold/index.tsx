import { Outlet, useLocation, useNavigate } from "react-router";
import { PageContainer } from "@ant-design/pro-components";

export function SoldPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <PageContainer
        fixedHeader
        title="已售出的房源"
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
