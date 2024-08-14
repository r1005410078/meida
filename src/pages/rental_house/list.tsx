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
import { SecondRentalHouse } from "../../model/rental_house";
import { useState } from "react";
import { useRentalHouseColumns } from "../../value_object/house_columns";
import {
  GetListListedParams,
  useGetRentalHouseList,
  useListed,
  useUnListed,
} from "../../api/rental_house";
import { useNavigate } from "react-router";
import { useSoldModal } from "./sold_modal";
import { processHouseSubmitValue } from "../house/list";

export function List() {
  const navigator = useNavigate();
  const [params, setParams] = useState<GetListListedParams>({
    listed: 1,
    page_index: 1,
    page_size: 10,
  });

  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >({
    owner_phone: {
      show: false,
    },
    year_built: {
      show: false,
    },
    rent_low_pice: {
      show: false,
    },
  });

  const columns = useRentalHouseColumns();
  const { data, isLoading } = useGetRentalHouseList(params);
  const listed = useListed();
  const unlisted = useUnListed();
  const { openSoldModal, soldModalNode } = useSoldModal();

  return (
    <PageContainer
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
            登记租房
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
      <ProTable<SecondRentalHouse>
        loading={isLoading}
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
                    key: "listed",
                    name: record.listed ? "下架" : "上架",
                    onClick: () => {
                      if (record.listed) {
                        unlisted.mutate(record.house_id);
                      } else {
                        listed.mutate(record.house_id);
                      }
                    },
                  },
                  {
                    key: "sold",
                    name: "租出",
                    onClick: () => {
                      openSoldModal(record.house_id);
                    },
                  },
                ]}
              />,
            ],
          },
        ])}
        onSubmit={(value) => {
          setParams({
            ...params,
            ...processHouseSubmitValue(value),
            rent_pice: value.rent_pice
              ? JSON.parse(value.rent_pice)
              : undefined,
            community_type: value.community_type,
          });
        }}
        dataSource={data?.data as any}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        rowKey="house_id"
        pagination={{
          total: data?.total,
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
        search={{
          layout: "horizontal",
          defaultCollapsed: true,
        }}
        dateFormatter="string"
        toolbar={{
          title: (
            <Segmented
              value={params.listed ? "上架" : "下架"}
              options={["上架", "下架"]}
              onChange={(v) =>
                setParams({
                  ...params,
                  listed: v === "上架" ? 1 : 0,
                })
              }
            />
          ),
        }}
      />
      {soldModalNode}
    </PageContainer>
  );
}
