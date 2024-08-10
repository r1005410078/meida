import { useSecondHandHouseListSold } from "../../api/SecondHandHouse";
import { ProTable } from "@ant-design/pro-components";

export function SoldSecondHandHouseList() {
  const { data: list } = useSecondHandHouseListSold();

  return (
    <>
      <ProTable
        dataSource={list}
        columns={[
          {
            title: "户主姓名",
            dataIndex: "owner_name",
            key: "owner_name",
          },
          {
            title: "联系方式",
            dataIndex: "owner_phone",
            key: "owner_phone",
            hideInSearch: true,
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
    </>
  );
}
