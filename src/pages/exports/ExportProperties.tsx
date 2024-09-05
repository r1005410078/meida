import {
  PageContainer,
  ProTable,
  TableDropdown,
} from "@ant-design/pro-components";
import {
  UploadOutlined,
  InboxOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  Button,
  message,
  Upload,
  Form,
  Modal,
  Select,
  UploadProps,
  Flex,
  Tag,
  Table,
  Space,
} from "antd";
import { useState } from "react";
import {
  pice_type_options,
  usage_options,
} from "../../value_object/house_columns";
import {
  ImportsPropertiesParams,
  useAsyncImportsList,
  useDeleteImportsList,
  useGetImportsProperties,
} from "../../api/imports";
import { useQueryClient } from "react-query";
import dayjs from "dayjs";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const { Dragger } = Upload;

export function ExportProperties() {
  const [open, setOpen] = useState(false);
  const [from] = Form.useForm();
  const client = useQueryClient();

  const [params, setParams] = useState<ImportsPropertiesParams>({
    page_index: 1,
    page_size: 10,
  });

  const { data, isLoading } = useGetImportsProperties(params);

  const asyncImports = useAsyncImportsList();
  const deleteImports = useDeleteImportsList();

  const props: UploadProps = {
    name: "file",
    multiple: true,
    data: from.getFieldsValue(),
    action: "/api/v1/imports/properties",
    headers: {
      token: localStorage.getItem("token")!,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        client.refetchQueries(["/imports/list/properties"]);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const showDeleteConfirm = (ids: string[], cb?: () => void) => {
    Modal.confirm({
      title: "是否确认删除文件?",
      icon: <ExclamationCircleFilled />,
      content: "删除后无法恢复",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        deleteImports.mutate(ids);
        cb?.();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <PageContainer
      breadcrumb={{
        items: [],
      }}
      token={{
        paddingBlockPageContainerContent: 16,
        paddingInlinePageContainerContent: 24,
      }}
    >
      <ProTable
        search={false}
        rowKey="id"
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [],
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space size={24}>
              <span>
                已选 {selectedRowKeys.length} 项
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  取消选择
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space size={16}>
              <a
                onClick={() => {
                  showDeleteConfirm(
                    selectedRowKeys as string[],
                    onCleanSelected
                  );
                }}
              >
                批量删除
              </a>
            </Space>
          );
        }}
        toolBarRender={() => [
          <Button
            key="export"
            onClick={() => {
              asyncImports.mutate();
            }}
          >
            重新同步
          </Button>,
          <Button
            icon={<UploadOutlined />}
            key="export"
            type="primary"
            onClick={() => setOpen(true)}
          >
            导入房源
          </Button>,
        ]}
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
        dataSource={data?.data}
        loading={isLoading}
        columns={[
          {
            title: "文件名称",
            dataIndex: "file_name",
          },
          {
            title: "文件大小",
            dataIndex: "file_size",
            render: (_, item) => `${(item.file_size / 1024).toFixed(2)} KB`,
          },
          {
            title: "导入时间",
            dataIndex: "updated_at",
            render: (_, item) =>
              dayjs(item.updated_at + "Z").format("YYYY-MM-DD HH:mm:ss"),
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (_, item) => {
              switch (item.file_status) {
                case "0":
                  return (
                    <Tag icon={<SyncOutlined spin />} color="processing">
                      导入中
                    </Tag>
                  );
                case "1":
                  return (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      导入成功
                    </Tag>
                  );
                case "2":
                  return (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      导入失败
                    </Tag>
                  );
                default:
                  return "未知";
              }
            },
          },
          {
            title: "错误信息",
            dataIndex: "file_error",
          },
          {
            title: "操作",
            valueType: "option",
            key: "option",
            render: (_, recode) => [
              <a
                key="editable"
                onClick={() => {
                  // asyncImports.mutate();
                }}
              >
                重试
              </a>,
              <a target="_blank" rel="noopener noreferrer" key="view">
                下载
              </a>,
              <TableDropdown
                key="actionGroup"
                menus={[
                  { key: "copy", name: "预览", disabled: true },
                  {
                    key: "delete",
                    name: "删除",
                    onClick: () => {
                      showDeleteConfirm([recode.id]);
                    },
                  },
                ]}
              />,
            ],
          },
        ]}
      />
      <Modal
        width={760}
        title="导入"
        open={open}
        destroyOnClose
        okText="同步数据"
        loading={asyncImports.isLoading}
        onCancel={() => setOpen(false)}
        onOk={() => {
          asyncImports.mutate();
          setOpen(false);
        }}
      >
        <Form
          layout="horizontal"
          form={from}
          initialValues={{
            usage: 0,
            pice_type: 0,
            platform: 1,
          }}
        >
          <Flex gap={16}>
            <Form.Item name="usage" label="用途">
              <Select
                style={{ width: 100 }}
                labelRender={({ label }) => <strong>{label}</strong>}
                options={[{ value: 0, label: "智能判断" }].concat(
                  usage_options
                )}
              />
            </Form.Item>
            <Form.Item name="pice_type" label="销售类型">
              <Select
                style={{ width: 100 }}
                labelRender={({ label }) => <strong>{label}</strong>}
                options={[{ value: 0, label: "智能判断" }].concat(
                  pice_type_options
                )}
              />
            </Form.Item>
            <Form.Item name="platform" label="导出格式平台">
              <Select
                style={{ width: 120 }}
                labelRender={({ label }) => <strong>{label}</strong>}
                options={[
                  {
                    value: 1,
                    label: "易遨云",
                  },
                ]}
              />
            </Form.Item>
          </Flex>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或将文件拖到此区域进行上传</p>
            <p className="ant-upload-hint">
              支持单次或批量上传。 仅 xlsx、xls、文件。
            </p>
          </Dragger>
        </Form>
      </Modal>
    </PageContainer>
  );
}
