import { Button, Flex, Form, Input, Space } from "antd";
import { useForm } from "antd/es/form/Form";
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
  TowardFormItem,
} from "./FangyFromItems";
import { useFangyFilter } from "../hooks/useFilterExpand";

export function FilterSecondHandHousing() {
  const [form] = useForm();
  const { expand, setExpand } = useFangyFilter();

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
                onClick={() => setExpand(!expand)}
              >
                {expand ? "收起" : "展开"}
              </Button>
            </Space>
          </Form.Item>
        </Flex>
        {expand ? (
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
