import { Button, Flex, Form, Input, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import {
  AgeFormItem,
  AreaFormItem,
  DecorationFormItem,
  FloorFormItem,
  PriceFormItem,
  PropertyFormItem,
  PropertyTypeFormItem,
  RegionFormItem,
  RoomFormItem,
  TagsFormItem,
} from "./FangyFromItems";

export function FilterRenting() {
  const [form] = useForm();
  const [more, setMore] = useState(false);

  const onFormLayoutChange = () => {};

  return (
    <div>
      <Form layout={"vertical"} form={form} onValuesChange={onFormLayoutChange}>
        <Flex wrap gap="large">
          <Form.Item label="位置" name="location">
            <Input placeholder="房子名称或地址" style={{ width: 425 }} />
          </Form.Item>
          <RegionFormItem />
          <PriceFormItem />
          <RoomFormItem />
          <Form.Item>
            <Space>
              <Button style={{ marginTop: 30 }} onClick={() => {}}>
                重置
              </Button>
              <Button
                type="primary"
                style={{ marginTop: 30 }}
                onClick={() => {}}
              >
                查询
              </Button>
              <Button
                type="link"
                size="small"
                style={{ marginTop: 32 }}
                onClick={() => setMore(!more)}
              >
                {more ? "收起" : "展开"}
              </Button>
            </Space>
          </Form.Item>
        </Flex>
        {more ? (
          <Flex wrap gap="large">
            <AreaFormItem />
            <TowardFormItem />
            <FloorFormItem />
            <PropertyFormItem />
            <DecorationFormItem />
            <AgeFormItem />
            <PropertyTypeFormItem />
            <TagsFormItem />
          </Flex>
        ) : null}
      </Form>
    </div>
  );
}
