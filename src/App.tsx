import { MediumOutlined, ShopOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Button, Result } from "antd";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { SecondHandHousePage } from "./pages/SecondHandHouse";
import { List as SecondHandHouseList } from "./pages/SecondHandHouse/list";
import { Edit as SecondHandHouseEdit } from "./pages/SecondHandHouse/edit";
import { List as RentalHouseList } from "./pages/rental_house/list";
import { Edit as RentalHouseEdit } from "./pages/rental_house/edit";
import { List as CommunityList } from "./pages/community/list";
import { Edit as CommunityEdit } from "./pages/community/edit";
import { List as HouseList } from "./pages/house/list";
import { Edit as HouseEdit } from "./pages/house/edit";
import { SoldPage } from "./pages/sold";
import { SoldRentalHouseList } from "./pages/sold/rental_house";
import { SoldSecondHandHouseList } from "./pages/sold/second_hand_house";

export default () => {
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProLayout
            menu={{
              autoClose: false,
              defaultOpenAll: true,
            }}
            title=""
            logo="/meida.png"
            fixSiderbar
            fixedHeader
            route={{
              path: "/",
              routes: [
                {
                  path: "/house",
                  name: "租售管理",
                  icon: <MediumOutlined />,
                  children: [
                    {
                      path: "second-hand-house",
                      name: "二手房",
                    },
                    {
                      path: "rental-house",
                      name: "出租房",
                    },
                    {
                      path: "sold/second-hand-house",
                      name: "已租售",
                    },
                  ],
                },
                {
                  path: "/base-info",
                  name: "房屋基础信息",
                  icon: <ShopOutlined />,
                  children: [
                    {
                      path: "community",
                      name: "小区",
                    },
                    {
                      path: "house",
                      name: "房屋信息",
                    },
                  ],
                },
              ],
            }}
            onMenuHeaderClick={(e) => console.log(111, e)}
            menuItemRender={(item, dom) => (
              <a
                onClick={() => {
                  navigator(item.path!);
                }}
              >
                {dom}
              </a>
            )}
            breakpoint={false}
            layout="mix"
            location={{
              pathname: location.pathname,
            }}
          >
            <Outlet />
            {location.pathname === "/" ? (
              <Navigate to="/house/second-hand-house" />
            ) : null}
          </ProLayout>
        }
      >
        <Route path="house" element={<SecondHandHousePage />}>
          <Route
            index
            path="second-hand-house"
            element={<SecondHandHouseList />}
          />
          <Route
            path="second-hand-house/edit/:houseId"
            element={<SecondHandHouseEdit />}
          />
          <Route
            path="second-hand-house/new"
            element={<SecondHandHouseEdit />}
          />

          <Route index path="rental-house" element={<RentalHouseList />} />
          <Route
            path="rental-house/edit/:houseId"
            element={<RentalHouseEdit />}
          />
          <Route path="rental-house/new" element={<RentalHouseEdit />} />

          <Route path="sold" element={<SoldPage />}>
            <Route
              index
              path="second-hand-house"
              element={<SoldSecondHandHouseList />}
            />
            <Route path="rental-house" element={<SoldRentalHouseList />} />
          </Route>
        </Route>

        <Route path="base-info" element={<SecondHandHousePage />}>
          <Route index path="community" element={<CommunityList />} />
          <Route path="community/edit/:houseId" element={<CommunityEdit />} />
          <Route path="community/new" element={<CommunityEdit />} />
        </Route>

        <Route path="base-info" element={<SecondHandHousePage />}>
          <Route index path="house" element={<HouseList />} />
          <Route path="house/edit/:houseId" element={<HouseEdit />} />
          <Route path="house/new" element={<HouseEdit />} />
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
};
