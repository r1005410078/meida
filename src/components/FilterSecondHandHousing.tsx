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
  DirectionFormItem,
} from "./FangyFromItems";
import { useFangyFilter } from "../hooks/useFilterExpand";
import { useQuerySecondHandHousing } from "../hooks/useQuerySecondHandHousing";

export function FilterSecondHandHousing() {
  const [form] = useForm();
  const { expand, setExpand } = useFangyFilter();
  const { setQuery } = useQuerySecondHandHousing();

  return (
    <div>
      <Form layout={"vertical"} form={form}>
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
            <DirectionFormItem />
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
