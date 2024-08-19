import {
  PageContainer,
  ProTable,
  TableDropdown,
} from "@ant-design/pro-components";
import { Avatar, Button, Modal, Segmented, Space } from "antd";
import {
  GetUsersParams,
  useDeleteUser,
  useRegisterUser,
  useUsersList,
} from "../../api/users";
import { useState } from "react";
import { useUserEdit } from "./edit";

export function UserList() {
  const [params, setParams] = useState<GetUsersParams>({
    page_index: 1,
    page_size: 10,
    is_active: true,
  });

  const { data: result, isLoading } = useUsersList(params);
  const { userEditNode, openUserEdit } = useUserEdit();
  const save = useRegisterUser();
  const deleteUser = useDeleteUser();

  return (
    <PageContainer
      token={{
        paddingBlockPageContainerContent: 24,
        paddingInlinePageContainerContent: 60,
      }}
      header={{
        title: "用户",
        ghost: true,
        extra: [
          <Button type="primary" key="1" onClick={() => openUserEdit()}>
            添加用户
          </Button>,
        ],
      }}
    >
      {userEditNode}
      <ProTable
        loading={isLoading}
        dataSource={result?.data}
        onSubmit={(values) => {
          setParams({
            ...params,
            ...values,
          });
        }}
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
            title: "用户",
            dataIndex: "username",
            key: "username",
            render: (_, item) => {
              return (
                <Space>
                  {item.avatar ? (
                    <Avatar size="small" src={item.avatar} />
                  ) : (
                    <Avatar size="small" style={{ backgroundColor: "#87d068" }}>
                      {item.username[0].toUpperCase()}
                    </Avatar>
                  )}
                  <span>{item.username}</span>
                </Space>
              );
            },
          },
          {
            title: "手机号",
            dataIndex: "phone",
            key: "phone",
          },
          {
            title: "角色",
            dataIndex: "role",
            key: "role",
            render: (_, item) => {
              return item.role === "admin" ? "管理员" : "用户";
            },
          },
          {
            title: "创建时间",
            dataIndex: "created_at",
            key: "created_at",
            hideInSearch: true,
          },
          {
            title: "操作",
            valueType: "option",
            key: "option",
            render: (_1, record, _2, action) => [
              <a
                key="editable"
                onClick={() => {
                  openUserEdit(record);
                }}
              >
                编辑
              </a>,
              <a
                target="_blank"
                rel="noopener noreferrer"
                key="view"
                onClick={() => {
                  save.mutateAsync({
                    id: record.id,
                    is_active: !record.is_active,
                  });
                }}
              >
                {record.is_active ? "禁用" : "启用"}
              </a>,
              <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                  {
                    key: "delete",
                    name: "删除",
                    onClick: () => {
                      Modal.confirm({
                        title: "删除",
                        content: `是否确认删除用户${record.username}`,
                        onOk: () => {
                          deleteUser.mutateAsync(record.id);
                        },
                      });
                    },
                  },
                ]}
              />,
            ],
          },
        ]}
        toolbar={{
          title: (
            <Segmented
              value={params.is_active ? "已启用" : "已禁用"}
              options={["已启用", "已禁用"]}
              onChange={(v) => {
                setParams({
                  ...params,
                  is_active: v === "已启用" ? true : false,
                });
              }}
            />
          ),
        }}
      />
    </PageContainer>
  );
}
