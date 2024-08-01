import {
  Button,
  Cascader,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  theme,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { CommunityFrom } from "../../model/Community";
import {
  useCommunityByName,
  useCreateCommunity,
  useUpdateCommunity,
} from "../../api/community";
import { useEffect } from "react";

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: "迎江",
    label: "迎江",
    children: [
      {
        value: "百货大楼",
        label: "百货大楼",
      },
      {
        value: "绿地新都会",
        label: "绿地新都会",
      },
      {
        value: "新城吾悦广场",
        label: "新城吾悦广场",
      },
    ],
  },
  {
    value: "宜秀",
    label: "宜秀",
    children: [
      {
        value: "光彩大市场",
        label: "光彩大市场",
      },
      {
        value: "文化广场",
        label: "文化广场",
      },
    ],
  },
  {
    value: "大观",
    label: "大观",
    children: [
      {
        value: "安庆八佰伴",
        label: "安庆八佰伴",
      },
      {
        value: "百联",
        label: "百联",
      },
    ],
  },
  {
    value: "其他",
    label: "其他",
  },
];

export function Edit() {
  const [from] = useForm<CommunityFrom>();
  const { communityName } = useParams<{ communityName: string }>();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const create = useCreateCommunity();
  const update = useUpdateCommunity();
  const { data } = useCommunityByName(communityName);
  const formData = data?.data;

  useEffect(() => {
    if (formData) {
      from.setFieldsValue(formData as any);
    }
  }, [formData]);

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Flex justify="space-between" align="center">
          <Button
            type="link"
            size="small"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate("/residential");
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              marginLeft: 30,
              color: "#000",
            }}
          >
            {communityName ? `编辑小区/${communityName}` : "新建小区"}
          </Button>
          <div style={{ marginRight: 16 }}>
            <Button
              size="large"
              shape="round"
              type="primary"
              loading={create.isLoading || update.isLoading}
              onClick={() => from.submit()}
            >
              保存
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
        <Form
          form={from}
          layout={"vertical"}
          onFinish={async (value) => {
            let newValue = {
              city: "安庆",
              state: "安徽省",
              postal_code: "246000",
              ...value,
            };

            if (communityName) {
              await update.mutateAsync(newValue);
            } else {
              await create.mutateAsync(newValue);
            }

            from.resetFields();

            if (communityName) {
              navigate("/residential", {
                replace: true,
              });
            } else {
              Modal.confirm({
                title: "小区保存成功",
                icon: <CheckCircleFilled color="green" />,
                okText: "继续添加小区",
                cancelText: "返回列表",
                onOk() {
                  navigate("/residential/new", {
                    replace: true,
                  });
                },
                onCancel() {
                  navigate("/residential", {
                    replace: true,
                  });
                },
              });
            }
          }}
          style={{ padding: 50, margin: "0 auto" }}
        >
          <Form.Item
            label="小区名称"
            name="community_name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="所在区域"
            name="region"
            rules={[{ required: true }]}
          >
            <Cascader
              options={options}
              placeholder="区域"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="建设年份" name="year_built">
            <InputNumber min={1000} max={2030} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="住宅区类型" name="community_type">
            <Select
              placeholder="物业类型"
              onChange={() => {}}
              style={{ minWidth: 200 }}
              options={[
                {
                  value: "普通住宅",
                  label: "普通住宅",
                },
                {
                  value: "公寓",
                  label: "公寓",
                },
                {
                  value: "别墅",
                  label: "别墅",
                },
                {
                  value: "写字楼",
                  label: "写字楼",
                },
                {
                  value: "商住两用",
                  label: "商住两用",
                },
                {
                  value: "其他",
                  label: "其他",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="物业公司" name="property_management_company">
            <Input />
          </Form.Item>
          <Form.Item label="小区描述" name="description">
            <Input.TextArea rows={10} />
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}
