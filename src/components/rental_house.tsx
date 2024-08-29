import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { RentalHouseFrom } from "../model/rental_house";
import {
  useGetRentalHouseByHouseId,
  useRentalHouseSave,
} from "../api/rental_house";
import {
  full_payment_required,
  house_tags,
  payment_method,
  urgent_sale,
  viewing_method,
} from "../value_object/house_columns";

export function useRentalHouse() {
  const navigate = useNavigate();
  const [rentalHouseFrom] = useForm<RentalHouseFrom>();
  const { houseId: paramsHouseId } = useParams<{ houseId: string }>();
  const { data: formData } = useGetRentalHouseByHouseId(paramsHouseId);

  // 更新
  const save = useRentalHouseSave();

  const rentalHouseNode = (
    <Form form={rentalHouseFrom} layout="vertical">
      <Row gutter={16}>
        <Col flex="160px">
          <Form.Item label="租金" name="rent_pice" rules={[{ required: true }]}>
            <InputNumber
              placeholder="租金"
              min={0}
              style={{ width: "100%" }}
              addonAfter="元"
            />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item
            label="出租低价"
            name="rent_low_pice"
            rules={[{ required: true }]}
          >
            <InputNumber
              placeholder="出租低价"
              min={0}
              style={{ width: "100%" }}
              addonAfter="元"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col flex="160px">
          <Form.Item
            label="看房方式"
            name="viewing_method"
            rules={[{ required: true }]}
          >
            <Select placeholder="看房方式" options={viewing_method} />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item
            label="付款方式"
            name="payment_method"
            rules={[{ required: true }]}
          >
            <Select placeholder="付款方式" options={payment_method} />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item
            label="是否全款"
            name="full_payment_required"
            rules={[{ required: true }]}
          >
            <Select placeholder="是否全款" options={full_payment_required} />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item
            label="是否急切"
            name="urgent_sale"
            rules={[{ required: true }]}
          >
            <Select placeholder="是否急切" options={urgent_sale} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label="标签" name="tags" rules={[{ required: true }]}>
            <Select placeholder="标签" mode="multiple" options={house_tags} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label="备注" name="comment" rules={[{ required: true }]}>
            <Input.TextArea placeholder="备注" rows={5} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  useEffect(() => {
    if (formData) {
      rentalHouseFrom.setFieldsValue(formData as any);
    }
  }, [formData]);

  return {
    rentalHouseNode,
    rentalHouseFrom,
    rentalHouseSubmit,
  };

  async function rentalHouseSubmit(house_id: string) {
    const houseValues = rentalHouseFrom.getFieldsValue();

    let newValue = {
      ...houseValues,
      house_id,
      tags: houseValues.tags?.join(",") || "",
    };

    await save.mutateAsync(newValue as any);

    message.success("保存成功");
    resetFields();

    if (paramsHouseId) {
      navigate("/house/rental-house", {
        replace: true,
      });
    }
  }

  function resetFields() {
    rentalHouseFrom.resetFields();
  }
}
