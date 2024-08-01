import React, { useState } from "react";
import { BankOutlined, MediumOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./App.css";

import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { NoMatch } from "./components/ui/NoMatch";
import { HousePage } from "./pages/house";
import { ResidentialPage } from "./pages/community";
import { List as CommunityList } from "./pages/community/list";
import { Edit as CommunityEdit } from "./pages/community/edit";
import { List as HouseList } from "./pages/house/list";
import { Edit as HouseEdit } from "./pages/house/edit";
const { Sider } = Layout;

const App: React.FC = () => {
  const [collapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout hasSider>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              style={{
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[pathname.split("/")[1]]}
                onSelect={(item) => {
                  navigate(`/${item.key}`);
                }}
                items={[
                  {
                    key: "house",
                    icon: <MediumOutlined />,
                    label: "房源",
                  },
                  {
                    key: "residential",
                    icon: <BankOutlined />,
                    label: "小区管理",
                  },
                ]}
              />
            </Sider>
            <Layout
              style={{
                marginLeft: collapsed ? 80 : 200,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <Outlet />
            </Layout>
          </Layout>
        }
      >
        <Route path="/house" element={<HousePage />}>
          <Route index element={<HouseList />} />
          <Route path="edit/:houseId" element={<HouseEdit />} />
          <Route path="new" element={<HouseEdit />} />
        </Route>
        <Route path="/residential" element={<ResidentialPage />}>
          <Route index element={<CommunityList />} />
          <Route path="edit/:communityName" element={<CommunityEdit />} />
          <Route path="new" element={<CommunityEdit />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default App;
