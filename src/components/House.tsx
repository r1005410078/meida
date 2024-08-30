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
  DatePicker,
} from "antd";
import { AimOutlined, RollbackOutlined } from "@ant-design/icons";
import UploadHouse, { fangImagesUpload } from "./UploadHouse";
import axios from "axios";
import { House, HouseFrom } from "../model/House";
import {
  useHouseById,
  useHouseListByOwnerName,
  useSaveHouse,
} from "../api/house";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  building_structure_options,
  current_status_options,
  decoration,
  facilities_options,
  house_property,
  house_type_options,
  household_registration_options,
  orientation_options,
  property_rights_options,
  school_qualification_options,
  source_options,
} from "../value_object/house_columns";
import { useDebounceFn } from "@ant-design/pro-components";

export function useHouse() {
  const [houseForm] = Form.useForm<HouseFrom>();
  const { houseId: paramsHouseId } = useParams<{ houseId: string }>();
  const { data: result } = useHouseById(paramsHouseId);
  const initFormData = result?.data;

  const save = useSaveHouse();
  const [ownerName, setOwnerName] = useState<string>();
  const { data: houseResult } = useHouseListByOwnerName(ownerName);
  const [house, setHouse] = useState<House>();
  const ownerNameDebounce = useDebounceFn(
    async (data) => setOwnerName(data),
    300
  );

  useEffect(() => {
    if (house) {
      houseForm.setFieldsValue(house as any);
    } else {
      houseForm.resetFields();
    }
  }, [house]);

  useEffect(() => {
    if (initFormData) {
      setHouse(initFormData);
    }
  }, [initFormData]);

  const houseNode = (
    <Form form={houseForm} layout="vertical">
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="业主姓名"
            name="owner_name"
            rules={[{ required: true }]}
          >
            <AutoComplete
              onChange={(e) => ownerNameDebounce.run(e)}
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
            <Input placeholder="联系方式" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="房源名称" name="title" rules={[{ required: true }]}>
            <Input placeholder="房源名称" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="房屋地址"
            name="house_address"
            rules={[{ required: true }]}
          >
            <Input placeholder="房屋地址" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="产权" name="property" rules={[{ required: true }]}>
            <Select placeholder="产权" options={house_property} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="面积 (单位 m²)" name="area">
            <InputNumber min={0} placeholder="面积" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="使用面积 (单位 m²)" name="usable_area">
            <InputNumber
              min={0}
              placeholder="使用面积"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="房屋朝向" name="orientation">
            <Select
              placeholder="朝向"
              defaultValue={[]}
              onChange={() => {}}
              style={{ minWidth: 200 }}
              options={orientation_options}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="房屋装修"
            name="decoration_status"
            rules={[{ required: true }]}
          >
            <Select placeholder="房屋装修" options={decoration} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="配套"
            name="facilities"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              placeholder="配套"
              options={facilities_options}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="现状"
            name="current_status"
            rules={[{ required: true }]}
          >
            <Select placeholder="现状" options={current_status_options} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="房屋类型"
            name="house_type"
            rules={[{ required: true }]}
          >
            <Select placeholder="房屋类型" options={house_type_options} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="建筑结构" name="building_structure">
            <Select
              placeholder="建筑结构"
              options={building_structure_options}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="产权性质" name="property_rights">
            <Select placeholder="产权性质" options={property_rights_options} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Form.Item label="楼层">
          <Space>
            <Form.Item name="floor_range" rules={[{ required: true }]} noStyle>
              <Space.Compact>
                <InputNumber placeholder="最底层" />
                <InputNumber
                  placeholder="总楼层"
                  addonBefore="到"
                  addonAfter="层"
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item name="floor" rules={[{ required: true }]} noStyle>
              <InputNumber min={0} placeholder="住宅楼层" addonAfter="楼层" />
            </Form.Item>
            <Form.Item name="elevator" noStyle>
              <InputNumber min={0} placeholder="梯" addonAfter="梯" />
            </Form.Item>
            <Form.Item name="household" noStyle>
              <InputNumber min={0} placeholder="户" addonAfter="户" />
            </Form.Item>
          </Space>
        </Form.Item>
      </Row>
      <Row>
        <Form.Item label="房型">
          <Space>
            <Form.Item name="bedrooms" rules={[{ required: true }]}>
              <InputNumber min={0} placeholder="室" addonAfter="室" />
            </Form.Item>
            <Form.Item name="living_rooms" rules={[{ required: true }]}>
              <InputNumber min={0} placeholder="厅" addonAfter="厅" />
            </Form.Item>
            <Form.Item name="bathrooms" rules={[{ required: true }]}>
              <InputNumber min={0} placeholder="卫" addonAfter="卫" />
            </Form.Item>
            <Form.Item name="balcony" rules={[{ required: true }]}>
              <InputNumber min={0} placeholder="阳台" addonAfter="阳台" />
            </Form.Item>
            <Form.Item name="kitchen" rules={[{ required: true }]}>
              <InputNumber min={0} placeholder="厨房" addonAfter="厨房" />
            </Form.Item>
          </Space>
        </Form.Item>
      </Row>
      <Row>
        <Space size={16}>
          <Form.Item label="建筑年代" name="building_year">
            <DatePicker placeholder="建筑年代" picker="year" />
          </Form.Item>
          <Form.Item label="产权年限" name="property_duration">
            <DatePicker placeholder="产权年限" picker="year" />
          </Form.Item>
          <Form.Item label="产权日期" name="property_date">
            <DatePicker placeholder="产权日期" />
          </Form.Item>
          <Form.Item label="交房日期" name="delivery_date">
            <DatePicker placeholder="交房日期" />
          </Form.Item>
        </Space>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="学位" name="school_qualification">
            <Select
              placeholder="学位"
              defaultValue={[]}
              onChange={() => {}}
              options={school_qualification_options}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="户口" name="household_registration">
            <Select
              placeholder="户口"
              options={household_registration_options}
            />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item label="唯一住房" name="unique_house">
            <Select
              placeholder="是否是唯一住房"
              options={[
                {
                  label: "是",
                  value: true,
                },
                {
                  label: "否",
                  value: false,
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <Form.Item label="来源" name="source">
            <Select placeholder="来源" options={source_options} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="房源描述" name="house_description">
            <Input.TextArea placeholder="房源描述" rows={3} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="房屋图片" name="house_image">
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
    loading: save.isLoading,
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
      house_id: house_id ?? house?.house_id,
      ...value,
    };

    const res = await save.mutateAsync(newValue as any);
    houseForm.resetFields();

    return {
      house_id: res.data.house_id,
    };
  }
}
