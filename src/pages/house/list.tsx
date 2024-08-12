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
  TableDropdown,
} from "@ant-design/pro-components";
import { useState } from "react";
import { useHouseColumns } from "../../value_object/house_columns";
import { HouseParams, useHouseList } from "../../api/house";
import { useNavigate } from "react-router";
import { House } from "../../model/House";

export type TableListItem = House;

export function List() {
  const navigator = useNavigate();

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

  const [listedParams, setListedParams] = useState<HouseParams>({
    page_index: 1,
    page_size: 10,
  });

  const columns = useHouseColumns();
  const { data, isLoading } = useHouseList(listedParams);
  const result = data?.data;

  return (
    <PageContainer
      loading={isLoading}
      token={{
        paddingBlockPageContainerContent: 16,
        paddingInlinePageContainerContent: 24,
      }}
      header={{
        title: "租房",
        ghost: true,
        extra: [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigator("new")}
          >
            登记房屋信息
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
        pagination={{
          total: result?.total,
          showTotal: (total) => `共 ${total} 条`,
          pageSize: listedParams.page_size,
          current: listedParams.page_index,
          onChange: (page, pageSize) => {
            setListedParams({
              ...listedParams,
              page_index: page,
              page_size: pageSize,
            });
          },
        }}
        columns={columns.concat([
          {
            title: "操作",
            valueType: "option",
            key: "option",
            render: (_, record, _1, action) => [
              <a
                key="editable"
                onClick={() => {
                  navigator(`edit/${record.house_id}`);
                }}
              >
                编辑
              </a>,
              <a target="_blank" rel="noopener noreferrer" key="view">
                查看
              </a>,
              <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                  {
                    key: "删除",
                    name: "删除",
                    onClick: () => {},
                  },
                ]}
              />,
            ],
          },
        ])}
        dataSource={result?.data}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        rowKey="house_id"
        search={{
          layout: "horizontal",
          defaultCollapsed: true,
        }}
        dateFormatter="string"
        toolbar={{
          title: <></>,
        }}
      />
    </PageContainer>
  );
}
