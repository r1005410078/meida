import {
  Button,
  Divider,
  Flex,
  Modal,
  Space,
  Table,
  theme,
  Typography,
} from "antd";
import { PlusOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router";
import { useCommunityList, useDeleteCommunity } from "../../api/community";

export function List() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { data } = useCommunityList();
  const deleteCommunity = useDeleteCommunity();

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Flex justify="space-between" align="center">
          <Button
            type="text"
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div style={{ marginRight: 16 }}>
            <Button
              size="large"
              shape="round"
              type="primary"
              onClick={() => {
                navigate("/residential/new");
              }}
              icon={<PlusOutlined />}
            >
              登记小区
            </Button>
          </div>
        </Flex>
      </Header>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table
          size="small"
          dataSource={data?.data}
          rowKey={(record) => record.community_name}
          columns={[
            {
              title: "小区名称",
              dataIndex: "community_name",
              key: "community_name",
            },
            {
              title: "所在区域",
              dataIndex: "region",
              key: "region",
            },
            {
              title: "建设年份",
              dataIndex: "year_built",
              key: "year_built",
            },
            {
              title: "住宅区类型",
              dataIndex: "community_type",
              key: "community_type",
            },
            {
              title: "物业公司",
              dataIndex: "property_management_company",
              key: "property_management_company",
            },
            {
              title: "小区描述",
              dataIndex: "description",
              key: "description",
            },
            {
              title: "操作",
              dataIndex: "action",
              key: "action",
              render: (_, record) => {
                return (
                  <Space split={<Divider type="vertical" />}>
                    <Typography.Link
                      onClick={() => {
                        navigate(`/residential/edit/${record.community_name}`);
                      }}
                    >
                      编辑
                    </Typography.Link>
                    <Typography.Link
                      onClick={() => {
                        Modal.confirm({
                          title: "确定删除小区吗?",
                          icon: <ExclamationCircleFilled />,
                          content: "删除后不可恢复!!",
                          okText: "确定",
                          okType: "danger",
                          cancelText: "取消",
                          onOk() {
                            deleteCommunity.mutate(record.community_name);
                          },
                        });
                      }}
                    >
                      删除
                    </Typography.Link>
                  </Space>
                );
              },
            },
          ]}
        />
      </Content>
    </>
  );
}
