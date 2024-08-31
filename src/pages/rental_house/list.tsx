import { Button, Modal, Segmented, Select } from "antd";
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
import {
  bedrooms_options,
  region,
  rent_pice,
  usage_options,
  useRentalHouseColumns,
} from "../../value_object/house_columns";
import {
  GetListListedParams,
  useDeleteRentalHouse,
  useGetRentalHouseList,
  useListed,
  useUnListed,
} from "../../api/rental_house";
import { useNavigate } from "react-router";
import { useSoldModal } from "./sold_modal";
import { processHouseSubmitValue } from "../house/list";
import { useProDescriptionsModal } from "../../components/ProDescriptionsModal";
import {
  houseAddressColumn,
  houseAreaColumn,
  houseImageColumn,
  houseTypeColumn,
} from "../../value_object/columns";

export function List() {
  const navigator = useNavigate();
  const [params, setParams] = useState<GetListListedParams>({
    listed: 1,
    page_index: 1,
    page_size: 10,
  });

  const [columnsStateMap, setColumnsStateMap] =
    useState<Record<string, ColumnsState>>();

  const columns = useRentalHouseColumns();
  const { data, isLoading } = useGetRentalHouseList(params);
  const listed = useListed();
  const unlisted = useUnListed();
  const deleteRental = useDeleteRentalHouse();
  const { openSoldModal, soldModalNode } = useSoldModal();

  const { openProDescriptionsModal, proDescriptionsModalNode } =
    useProDescriptionsModal({
      title: "出租详情",
      columns: columns as any,
    });

  return (
    <PageContainer
      breadcrumb={{
        items: [],
      }}
      token={{
        paddingBlockPageContainerContent: 16,
        paddingInlinePageContainerContent: 24,
      }}
      header={{
        title: "租房",
        ghost: true,
        extra: [
          <Select
            defaultValue={1}
            popupMatchSelectWidth={80}
            labelRender={({ label }) => <strong>{label}</strong>}
            variant="borderless"
            options={usage_options}
          />,
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigator("new")}
          >
            登记房源
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
      <ProTable
        loading={isLoading}
        columns={[
          houseAddressColumn(),
          houseTypeColumn(),
          houseAreaColumn(),
          houseImageColumn(),
        ].concat([
          {
            title: "卧室数量",
            dataIndex: "bedrooms",
            hideInTable: true,
            valueType: "select",
            fieldProps: {
              options: bedrooms_options,
            },
          },
          {
            title: "区域",
            dataIndex: "region",
            hideInTable: true,
            valueType: "select",
            fieldProps: {
              options: region,
            },
          },
          {
            title: "售价",
            dataIndex: "rent_pice",
            valueType: "select",
            fieldProps: {
              options: rent_pice,
            },
            render: (_1, record) => {
              const pice = record.rental_house?.rent_pice;
              if (pice) {
                return `${pice} 元/月`;
              }
              return "--";
            },
          },
          {
            title: "看房方式",
            dataIndex: "house_second_hand.viewing_method",
            hideInSearch: true,
            render: (_1, record) => {
              return record.rental_house?.viewing_method ?? "--";
            },
          },
          {
            title: "操作",
            valueType: "option",
            key: "option",
            render: (_, record, _1, action) => {
              const house_id = record.house.house_id;

              return [
                <a
                  key="editable"
                  onClick={() => {
                    navigator(`edit/${house_id}`);
                  }}
                >
                  编辑
                </a>,
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  key="view"
                  onClick={() =>
                    openProDescriptionsModal({
                      ...record,
                      columns_data: record.rental_house,
                    })
                  }
                >
                  查看
                </a>,
                <TableDropdown
                  key="actionGroup"
                  onSelect={() => action?.reload()}
                  menus={[
                    {
                      key: "listed",
                      name: record.house_second_hand?.listed ? "下架" : "上架",
                      onClick: () => {
                        if (record.house_second_hand?.listed) {
                          unlisted.mutate(house_id);
                        } else {
                          listed.mutate(house_id);
                        }
                      },
                    },
                    {
                      key: "sold",
                      name: "租出",
                      onClick: () => {
                        openSoldModal(house_id);
                      },
                    },
                    {
                      key: "delete",
                      name: "删除",
                      onClick: () => {
                        Modal.confirm({
                          title: "删除",
                          content: `是否确认删除房源`,
                          onOk: () => {
                            deleteRental.mutateAsync(house_id);
                          },
                        });
                      },
                    },
                  ]}
                />,
              ];
            },
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
        rowKey="record.house.house_id"
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
      {proDescriptionsModalNode}
    </PageContainer>
  );
}
