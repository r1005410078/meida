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
import { List as SecondHandHouseList } from "./pages/second_hand_house/list";
import { Edit as SecondHandHouseEdit } from "./pages/second_hand_house/edit";
import { SoldSecondHandHouseList } from "./pages/sold/second_hand_house";
import { SoldRentalHouseList } from "./pages/sold/rental_house";

import { List as RentalHouseList } from "./pages/rental_house/list";
import { Edit as RentalHouseEdit } from "./pages/rental_house/edit";
import { RentalPage } from "./pages/rental_house";

import { SecondHandHousePage } from "./pages/second_hand_house";
import { SoldPage } from "./pages/sold";
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
                  if (item.key === "sold") {
                    navigate(`/${item.key}/second-hand-house`);
                    return;
                  }
                  navigate(`/${item.key}`);
                }}
                items={[
                  {
                    key: "second-hand-house",
                    icon: <BankOutlined />,
                    label: "二手房管理",
                  },
                  {
                    key: "rental-house",
                    icon: <BankOutlined />,
                    label: "租房管理",
                  },
                  {
                    key: "house",
                    icon: <MediumOutlined />,
                    label: "房源管理",
                  },
                  {
                    key: "residential",
                    icon: <BankOutlined />,
                    label: "小区管理",
                  },
                  {
                    key: "sold",
                    icon: <BankOutlined />,
                    label: "售出房源管理",
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
        <Route path="/rental-house" element={<RentalPage />}>
          <Route index element={<RentalHouseList />} />
          <Route path="edit/:houseId" element={<RentalHouseEdit />} />
          <Route path="new" element={<RentalHouseEdit />} />
        </Route>
        <Route path="/second-hand-house" element={<SecondHandHousePage />}>
          <Route index element={<SecondHandHouseList />} />
          <Route path="edit/:houseId" element={<SecondHandHouseEdit />} />
          <Route path="new" element={<SecondHandHouseEdit />} />
        </Route>
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
        <Route path="/sold" element={<SoldPage />}>
          <Route
            index
            path="second-hand-house"
            element={<SoldSecondHandHouseList />}
          />
          <Route path="rental-house" element={<SoldRentalHouseList />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default App;
