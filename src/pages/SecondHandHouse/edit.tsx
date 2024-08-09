import {
  Button,
  Card,
  Cascader,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";

import { useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { HouseFrom } from "../../model/House";
import { useEffect } from "react";

import { SecondHandHousingFrom } from "../../model/SecondHandHousing";
import { useGetSecondHandByHouseId } from "../../api/SecondHandHouse";
import UploadHouse from "../../components/UploadHouse";
import { PageContainer } from "@ant-design/pro-components";

const labelCol = { span: 6 };

export function Edit() {
  const [form] = useForm<SecondHandHousingFrom>();
  const { houseId } = useParams<{ houseId: string }>();
  const { data: formData } = useGetSecondHandByHouseId(houseId);
  const [houseForm] = useForm<HouseFrom>();

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData as any);
      houseForm.setFieldsValue(formData as any);
    }
  }, [formData]);

  return (
    <PageContainer
      title="新增二手房源"
      content="庭院深深深几许，杨柳堆烟，帘幕无重数。"
      footer={[
        <Button key="rest">重置</Button>,
        <Button key="submit" type="primary">
          提交
        </Button>,
      ]}
    >
      <Flex vertical gap={8}>
        <Card title="小区信息">
          <Form
            labelCol={labelCol}
            layout="horizontal"
            onFinish={async (value) => {}}
            style={{ margin: "0 auto" }}
          >
            <Row>
              <Col span={8}>
                <Form.Item
                  label="小区名称"
                  name="community_name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="所在区域"
                  name="region"
                  rules={[{ required: true }]}
                >
                  <Cascader
                    options={[]}
                    placeholder="区域"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="建设年份" name="year_built">
                  <InputNumber
                    min={1000}
                    max={2030}
                    style={{ width: "100%" }}
                  />
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
          <Divider plain />
        </Card>
        <Card title="房源信息">
          <Form
            form={form}
            labelCol={labelCol}
            layout="horizontal"
            onFinish={async (value) => {}}
          >
            <Row>
              <Col span={8}>
                <Form.Item
                  label="户主姓名"
                  name="owner_name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="联系方式"
                  name="owner_phone"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="房源名称"
                  name="community_name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="房屋地址"
                  name="house_address"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="房屋类型"
                  name="house_type"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="房屋状态"
                  name="status"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <Form.Item label="面积 (单位 m²)" name="area">
                  <InputNumber placeholder="面积" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="房屋朝向" name="orientation">
                  <Select
                    placeholder="朝向"
                    defaultValue={[]}
                    onChange={() => {}}
                    style={{ minWidth: 200 }}
                    options={[
                      {
                        value: "东",
                        label: "东",
                      },
                      {
                        value: "西",
                        label: "西",
                      },
                      {
                        value: "南",
                        label: "南",
                      },
                      {
                        value: "北",
                        label: "北",
                      },
                      {
                        value: "东南",
                        label: "东南",
                      },
                      {
                        value: "东北",
                        label: "东北",
                      },
                      {
                        value: "西南",
                        label: "西南",
                      },
                      {
                        value: "西北",
                        label: "西北",
                      },
                      {
                        value: "东西",
                        label: "东西",
                      },
                      {
                        value: "南北",
                        label: "南北",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="房屋装修"
                  name="decoration_status"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="房型">
                  <Space>
                    <Form.Item label="室" name="bedrooms" noStyle>
                      <InputNumber placeholder="几室" />
                    </Form.Item>
                    <Form.Item label="卫" name="bathrooms" noStyle>
                      <InputNumber placeholder="几卫" />
                    </Form.Item>
                    <Form.Item label="厅" name="living_rooms" noStyle>
                      <InputNumber placeholder="几厅" />
                    </Form.Item>
                  </Space>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <Form.Item label="房源描述" name="house_description">
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item
                  label="房屋图片"
                  name="house_image"
                  rules={[{ required: true }]}
                >
                  <UploadHouse />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider plain />
        </Card>
        <Card title="二手房信息" key="3">
          <Form
            form={form}
            labelCol={labelCol}
            layout="horizontal"
            onFinish={async (value) => {}}
          >
            <Row>
              <Col span={8}>
                <Form.Item
                  label="报价"
                  name="pice"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="低价"
                  name="low_pice"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item
                  label="备注"
                  name="comment"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Flex>
    </PageContainer>
  );
}
