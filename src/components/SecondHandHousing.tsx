import { ArrowUpOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Checkbox, Popover, Tabs } from "antd";
import { FilterSecondHandHousing } from "./FilterSecondHandHousing";
import "./FanyList.less";
import { SecondHandHousingTable } from "./SecondHandHousingTable";
import { useQuerySecondHandHousing } from "../hooks/useQuerySecondHandHousing";

export function SecondHandHousing() {
  const { result } = useQuerySecondHandHousing();
  const options = [
    { label: "房源图片", value: "image_url", style: { width: 110 } },
    { label: "位置", value: "location", style: { width: 110 } },
    { label: "区域", value: "region", style: { width: 110 } },
    { label: "联系方式", value: "phone", style: { width: 110 } },
    { label: "报价", value: "price", style: { width: 110 } },
    { label: "低价", value: "low_price", style: { width: 110 } },
    { label: "房型", value: "room", style: { width: 110 } },
    { label: "面积", value: "area", style: { width: 110 } },
    { label: "朝向", value: "toward", style: { width: 110 } },
    { label: "楼层", value: "floor", style: { width: 110 } },
    { label: "产权", value: "property", style: { width: 110 } },
    { label: "装修", value: "decoration", style: { width: 110 } },
    { label: "房龄", value: "age", style: { width: 110 } },
    { label: "电梯", value: "property_type", style: { width: 110 } },
    { label: "标签", value: "tags", style: { width: 110 } },
    { label: "更新时间", value: "updated_at", style: { width: 110 } },
    { label: "备注", value: "comment", style: { width: 110 } },
  ];

  return (
    <div>
      <Card>
        <FilterSecondHandHousing />
      </Card>
      <Tabs
        className="tangy-list-tabs"
        tabBarExtraContent={{
          left: (
            <div style={{ width: "100%" }}>
              共找到 <strong style={{ color: "red" }}>{result?.total}</strong>{" "}
              套二手房房源
            </div>
          ),
          right: (
            <Popover
              placement="bottomRight"
              title={"设置隐藏列"}
              content={
                <div style={{ width: "360px" }}>
                  <Checkbox.Group
                    options={options}
                    defaultValue={["Apple"]}
                    onChange={() => {}}
                  />
                </div>
              }
            >
              <SettingOutlined
                style={{ marginLeft: "16px", cursor: "pointer" }}
              />
            </Popover>
          ),
        }}
        defaultActiveKey="2"
        items={[
          {
            label: "总价",
            key: "1",
            icon: <ArrowUpOutlined />,
          },
          {
            label: "单价",
            key: "3",
            icon: <ArrowUpOutlined />,
          },
          {
            label: "面积",
            key: "2",
            icon: <ArrowUpOutlined />,
          },
          {
            label: "最新发布房源",
            key: "4",
            icon: <ArrowUpOutlined />,
          },
        ]}
      />
      <SecondHandHousingTable />
    </div>
  );
}
