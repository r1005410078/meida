import { SecondHandHousingFrom } from "../model/second_hand_housing";
import {
  useGetSecondHandByHouseId,
  useSecondHandHouseSave,
} from "../api/second_hand_house";
import { useParams } from "react-router";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import {
  full_payment_required,
  house_tags,
  payment_method,
  urgent_sale,
  viewing_method,
} from "../value_object/house_columns";
import { useEffect } from "react";

export function useSecondHandHouseList(enabled = true) {
  const [secondHandHouseForm] = Form.useForm<SecondHandHousingFrom>();
  const { houseId: paramsHouseId } = useParams<{ houseId: string }>();
  const { data: formData } = useGetSecondHandByHouseId(
    enabled ? paramsHouseId : undefined
  );
  const save = useSecondHandHouseSave();

  const secondHandHouseListNode = (
    <Form form={secondHandHouseForm} layout="vertical">
      <Row gutter={16}>
        <Col flex="160px">
          <Form.Item label="售价" name="pice" rules={[{ required: true }]}>
            <InputNumber
              placeholder="售价"
              min={0}
              style={{ width: "100%" }}
              addonAfter="万元"
            />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item label="出售底价" name="low_pice">
            <InputNumber
              placeholder="出售底价"
              min={0}
              style={{ width: "100%" }}
              addonAfter="万元"
            />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item label="首付" name="down_payment">
            <InputNumber
              placeholder="首付"
              min={0}
              style={{ width: "100%" }}
              addonAfter="万元"
            />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item label="房源税费" name="taxes_and_fees">
            <InputNumber
              placeholder="房源税费"
              min={0}
              style={{ width: "100%" }}
              addonAfter="万元"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col flex="160px">
          <Form.Item label="看房方式" name="viewing_method">
            <Select placeholder="看房方式" options={viewing_method} />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item label="付款方式" name="payment_method">
            <Select placeholder="付款方式" options={payment_method} />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item label="是否全款" name="full_payment_required">
            <Select placeholder="是否全款" options={full_payment_required} />
          </Form.Item>
        </Col>
        <Col flex="160px">
          <Form.Item label="是否急切" name="urgent_sale">
            <Select placeholder="是否急切" options={urgent_sale} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label="出售标签" name="tags">
            <Select placeholder="标签" mode="multiple" options={house_tags} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label="出售备注" name="comment">
            <Input.TextArea placeholder="备注" rows={3} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  useEffect(() => {
    if (formData) {
      secondHandHouseForm.setFieldsValue(formData as any);
    }
  }, [formData]);

  return {
    secondHandHouseListNode,
    secondHandHouseForm,
    saveSecondHandHouse: save,
    secondHandHouseFormSubmit,
  };

  async function secondHandHouseFormSubmit(house_id: string) {
    const houseValues = await secondHandHouseForm.validateFields();
    let newValue = {
      ...houseValues,
      house_id,
      tags: houseValues.tags?.join(",") || "",
    };
    save.mutate(newValue as any);
  }
}
