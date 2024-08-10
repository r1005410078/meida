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
  Space,
  Tooltip,
} from "antd";
import { AimOutlined, RollbackOutlined } from "@ant-design/icons";
import UploadHouse, { fangImagesUpload } from "./UploadHouse";
import axios from "axios";
import { House, HouseFrom } from "../model/House";
import {
  useCreateHouse,
  useHouseListByOwnerName,
  useUpdateHouse,
} from "../api/house";
import { useEffect, useState } from "react";

const labelCol = { span: 6 };

export function useHouse() {
  const [houseForm] = Form.useForm<HouseFrom>();
  const create = useCreateHouse();
  const update = useUpdateHouse();
  const [ownerName, setOwnerName] = useState<string>();
  const { data: houseResult } = useHouseListByOwnerName(ownerName);
  const [house, setHouse] = useState<House>();

  useEffect(() => {
    if (house) {
      houseForm.setFieldsValue(house as any);
    } else {
      houseForm.resetFields();
    }
  }, [house]);

  const houseNode = (
    <Form form={houseForm} labelCol={labelCol} layout="horizontal">
      <Row>
        <Col span={8}>
          <Form.Item
            label="户主姓名"
            name="owner_name"
            rules={[{ required: true }]}
          >
            <AutoComplete
              onChange={(e) => setOwnerName(e)}
              onSelect={(house_id) =>
                setHouse(
                  houseResult?.data.find((item) => item.house_id === house_id)
                )
              }
              suffixIcon={
                house && (
                  <Tooltip title="撤销小区内容填充">
                    <RollbackOutlined onClick={() => setHouse(undefined)} />
                  </Tooltip>
                )
              }
              options={houseResult?.data.map((item) => ({
                label: (
                  <Flex justify="space-between">
                    <Space>
                      <span>{item.owner_name}</span>
                      <span>{item.community_name}</span>
                    </Space>
                    <Tooltip title={item.house_address}>
                      <Button type="link" icon={<AimOutlined />} size="small" />
                    </Tooltip>
                  </Flex>
                ),
                value: item.house_id,
              }))}
            />
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
  );

  return {
    houseNode,
    houseForm,
    houseSubmit,
    house,
  };

  async function houseSubmit(community_name: string, house_id?: string) {
    const value = await houseForm.validateFields();
    const house_image = value.house_image;
    if (Array.isArray(house_image)) {
      const data = await fangImagesUpload(houseForm, house_image);

      let urls = await Promise.all(
        data!.map((item: any) =>
          axios
            .get(`/api/v1/qiniu/get_upload_url/${JSON.parse(item.result).key}`)
            .then((res) => res.data.data)
        )
      );

      value.house_image = urls.join(",") as any;
    }

    value.community_name = community_name;
    let newValue = {
      house_id,
      ...value,
    };

    let result = { house_id };
    if (house_id) {
      const res = await update.mutateAsync(newValue);
      result.house_id = res.data.house_id;
    } else {
      const res = await create.mutateAsync(newValue);
      result.house_id = res.data.house_id;
    }

    houseForm.resetFields();
    return result;
  }
}
