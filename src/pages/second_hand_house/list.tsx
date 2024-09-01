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
  price,
  region,
  usage_options,
  useSecondHandHouseColumns,
} from "../../value_object/house_columns";
import {
  GetListListedParams,
  useDeleteSecondHandHouse,
  useGetListListed,
  useListed,
  useUnListed,
} from "../../api/second_hand_house";
import { useNavigate } from "react-router";
import { useSoldModal } from "./sold_modal";
import { processHouseSubmitValue } from "../house/list";
import { useProDescriptionsModal } from "../../components/ProDescriptionsModal";
import {
  CommunityColumn,
  houseAddressColumn,
  houseAreaColumn,
  houseImageColumn,
  houseTypeColumn,
} from "../../value_object/columns";
import dayjs from "dayjs";

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
    // owner_phone: {
    //   show: false,
    // },
  });

  const columns = useSecondHandHouseColumns();
  const { data, isFetching } = useGetListListed(params);
  const listed = useListed();
  const unlisted = useUnListed();
  const { openSoldModal, soldModalNode } = useSoldModal();
  const deleteSecondHand = useDeleteSecondHandHouse();
  const { openProDescriptionsModal, proDescriptionsModalNode } =
    useProDescriptionsModal({
      title: "出售",
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
        loading={isFetching}
        onSubmit={(value) => {
          setParams({
            ...params,
            ...processHouseSubmitValue(value),
            pice: value.pice ? JSON.parse(value.pice) : undefined,
            community_type: value.community_type,
          });
        }}
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
          CommunityColumn(),
          {
            title: "售价",
            dataIndex: "pice",
            valueType: "select",
            fieldProps: {
              options: price,
            },
            render: (_1, record) => {
              const pice = record.house_second_hand?.pice;
              if (pice) {
                return `${pice} 万元`;
              }
              return "--";
            },
          },
          {
            title: "看房方式",
            dataIndex: "house_second_hand.viewing_method",
            hideInSearch: true,
            render: (_1, record) => {
              return record.house_second_hand?.viewing_method ?? "--";
            },
          },
          {
            title: "更新时间",
            dataIndex: "update_time",
            hideInSearch: true,
            render: (_1, record) => {
              return dayjs(record.house_second_hand?.created_at).format(
                "YYYY-MM-DD HH:mm:ss"
              );
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
                    houseImageColumn(),
                      navigator(`/house/second-hand-house/edit/${house_id}`);
                  }}
                >
                  编辑
                </a>,
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  key="view"
                  onClick={() => {
                    openProDescriptionsModal({
                      ...record,
                      columns_data: record.house_second_hand,
                    });
                  }}
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
                      name: "卖出",
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
                            deleteSecondHand.mutateAsync(house_id);
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
        dataSource={data?.data}
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
