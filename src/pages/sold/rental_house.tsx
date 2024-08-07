import { Table } from "antd";
import { useGetRentalHouseListSold } from "../../api/rental_house";

export function SoldRentalHouseList() {
  const { data: list } = useGetRentalHouseListSold();

  return (
    <>
      <Table
        size="small"
        dataSource={list}
        columns={[
          {
            title: "户主姓名",
            dataIndex: "owner_name",
            key: "owner_name",
          },
          {
            title: "户主联系方式",
            dataIndex: "owner_phone",
            key: "owner_phone",
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
