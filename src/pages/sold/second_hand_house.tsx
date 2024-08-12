import { useState } from "react";
import {
  GetSecondHandHouseSoldParams,
  useSecondHandHouseListSold,
} from "../../api/SecondHandHouse";
import { ProTable } from "@ant-design/pro-components";

export function SoldSecondHandHouseList() {
  const [params, setParams] = useState<GetSecondHandHouseSoldParams>({
    page_index: 1,
    page_size: 10,
  });
  const { data: result } = useSecondHandHouseListSold(params);

  return (
    <>
      <ProTable
        dataSource={result?.data}
        rowKey="sold_id"
        pagination={{
          total: result?.total,
          showTotal: (total) => `共 ${total} 条`,
          pageSize: params.page_size,
          current: params.page_index,
          onChange: (page, pageSize) => {
            setParams({
              ...params,
              page_index: page,
              page_size: pageSize,
            });
          },
        }}
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
