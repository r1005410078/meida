import { Button, Segmented } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import {
  ColumnsState,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { SecondHandHousing } from "../../model/SecondHandHousing";
import { useState } from "react";
import { useHouseColumns } from "../../value_object/house_columns";

export type TableListItem = SecondHandHousing;

export function List() {
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >({
    owner_phone: {
      show: false,
    },
    year_built: {
      show: false,
    },
    floor: {
      show: false,
    },
    low_price: {
      show: false,
    },
  });

  const columns = useHouseColumns();

  return (
    <PageContainer
      token={{
        paddingBlockPageContainerContent: 16,
        paddingInlinePageContainerContent: 24,
      }}
      header={{
        title: "二手房",
        ghost: true,
        extra: [
          <Button type="primary" icon={<PlusOutlined />}>
            登记二手房
          </Button>,
          <Segmented
            options={[
              { value: "List", icon: <BarsOutlined /> },
              {
                value: "Kanban",
                disabled: true,
                icon: <AppstoreOutlined />,
              },
            ]}
          />,
        ],
      }}
    >
      <ProTable<TableListItem>
        columns={columns}
        dataSource={[]}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        rowKey="house_id"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          layout: "horizontal",
          defaultCollapsed: true,
        }}
        dateFormatter="string"
        toolbar={{
          title: "二手房列表",
          tooltip: "二手房列表",
        }}
      />
    </PageContainer>
  );
}
