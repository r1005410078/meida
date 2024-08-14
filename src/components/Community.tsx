import {
  AutoComplete,
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
} from "antd";
import { AimOutlined, RollbackOutlined } from "@ant-design/icons";
import { CommunityFrom } from "../model/community";
import { region } from "../value_object/house_columns";
import {
  useCommunityByName,
  useGetCommunityNames,
  useSaveCommunity,
} from "../api/community";
import { useEffect, useState } from "react";

const labelCol = { span: 6 };

export function useCommunity(propCommunityName?: string) {
  const [communityName, setCommunityName] = useState<string>();
  const [communityForm] = Form.useForm<CommunityFrom>();
  const save = useSaveCommunity();
  const { data } = useGetCommunityNames();
  const { data: communityRes } = useCommunityByName(communityName);
  const community = communityRes?.data;

  useEffect(() => {
    if (community) {
      communityForm.setFieldsValue(community as any);
    } else {
      communityForm.resetFields();
    }
  }, [community]);

  useEffect(() => {
    setCommunityName(propCommunityName);
  }, [propCommunityName]);

  const communityNode = (
    <Form
      form={communityForm}
      labelCol={labelCol}
      layout="horizontal"
      style={{ margin: "0 auto" }}
    >
      <Row>
        <Col span={8}>
          <Form.Item
            label="小区名称"
            name="community_name"
            rules={[{ required: true }]}
          >
            <AutoComplete
              style={{ width: "100%" }}
              onSelect={(community_name) => setCommunityName(community_name)}
              options={data?.data.map((community_name) => {
                return {
                  value: community_name,
                  label: (
                    <Flex justify="space-between">
                      <span>{community_name}</span>
                      <Button type="link" icon={<AimOutlined />} size="small" />
                    </Flex>
                  ),
                };
              })}
              placeholder="输入小区名称"
              suffixIcon={
                communityName && (
                  <Tooltip title="撤销小区内容填充">
                    <RollbackOutlined
                      onClick={() => setCommunityName(undefined)}
                    />
                  </Tooltip>
                )
              }
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="所在区域"
            name="region"
            rules={[{ required: true }]}
          >
            <Select options={region} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="建设年份" name="year_built">
            <InputNumber min={1000} max={2030} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label="物业公司" name="property_management_company">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
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
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label="小区描述" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return {
    communityNode,
    communityForm,
    communitySubmit,
    loading: save.isLoading,
  };

  async function communitySubmit() {
    const value = await communityForm.validateFields();
    let newValue = {
      city: "安庆",
      state: "安徽省",
      postal_code: "246000",
      ...value,
    };

    await save.mutateAsync(newValue);
    return value;
  }
}
