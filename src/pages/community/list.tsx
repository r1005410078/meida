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
import { useCommunityColumns } from "../../value_object/house_columns";
import { QueryCommunityParams, useCommunityList } from "../../api/community";
import { useNavigate } from "react-router";
import { Community } from "../../model/Community";
import { useProDescriptionsModal } from "../../components/ProDescriptionsModal";

export type TableListItem = Community;

export function List() {
  const navigator = useNavigate();
  const [columnsStateMap, setColumnsStateMap] = useState<
    Record<string, ColumnsState>
  >({
    owner_phone: {
      show: false,
    },
    floor: {
      show: false,
    },
    low_price: {
      show: false,
    },
  });

  const [params, setParams] = useState<QueryCommunityParams>({});

  const { data, isLoading } = useCommunityList(params);
  const columns = useCommunityColumns();
  const { openProDescriptionsModal, proDescriptionsModalNode } =
    useProDescriptionsModal({
      title: "小区详情",
      width: 1000,
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
        title: "小区",
        ghost: true,
        extra: [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigator("new")}
          >
            新增小区
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
      {proDescriptionsModalNode}
      <ProTable<TableListItem>
        onSubmit={(params) => {
          setParams({
            community_name: params.community_name,
            region: params.region,
            year_built: params.year_built,
            community_type: params.community_type,
            description: params.description,
            updated_at: params.updated_at,
          });
        }}
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
                  navigator(`edit/${record.community_name}`);
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
                    residential: record,
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
                    key: "sold",
                    name: "删除",
                    onClick: () => {
                      console.log("删除");
                    },
                  },
                ]}
              />,
            ],
          },
        ])}
        dataSource={data?.data}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        rowKey="community_name"
        pagination={{
          showQuickJumper: true,
        }}
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
