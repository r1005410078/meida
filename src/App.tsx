import { CodepenCircleOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Button, Result } from "antd";
import { Outlet, Route, Routes } from "react-router-dom";
import { SecondHandHousePage } from "./pages/SecondHandHouse";
import { List as SecondHandHouseList } from "./pages/SecondHandHouse/list";
import { Edit as SecondHandHouseEdit } from "./pages/SecondHandHouse/edit";

export default () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProLayout
          title=""
          logo="/meida.png"
          fixSiderbar
          fixedHeader
          breakpoint={false}
          pageTitleRender={(props) => {
            return "ddd";
          }}
          menuDataRender={() => [
            {
              path: "/house",
              icon: <CodepenCircleOutlined />,
              name: "房源管理",
              children: [
                {
                  path: "second-hand-house",
                  name: "二手房",
                },
                {
                  path: "rental-house",
                  name: "租房",
                },
              ],
            },
          ]}
          layout="mix"
          location={{
            pathname: "/house/second-hand-house",
          }}
        >
          <Outlet />
        </ProLayout>
      }
    >
      <Route path="house/second-hand-house" element={<SecondHandHousePage />}>
        <Route index element={<SecondHandHouseList />} />
        {/* <Route path="edit/:houseId" element={<SecondHandHouseEdit />} />*/}
        <Route path="new" element={<SecondHandHouseEdit />} />
      </Route>
      <Route
        path="*"
        element={
          <Result
            status="404"
            title="404"
            subTitle="抱歉，您访问的页面不存在。"
            extra={<Button type="primary">回到首页</Button>}
          />
        }
      />
    </Route>
  </Routes>
);
