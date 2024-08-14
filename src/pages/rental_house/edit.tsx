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
} from "antd";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

import { RentalHouseFrom } from "../../model/rental_house";
import {
  useGetRentalHouseByHouseId,
  useRentalHouseSave,
} from "../../api/rental_house";

import { PageContainer } from "@ant-design/pro-components";
import { useCommunity } from "../../components/Community";
import { useHouse } from "../../components/House";
import { useGuShi } from "../../api/gushi";

const labelCol = { span: 6 };

export function Edit() {
  const navigate = useNavigate();
  const [rentalHouseFrom] = useForm<RentalHouseFrom>();
  const { houseId: paramsHouseId } = useParams<{ houseId: string }>();
  const { data: formData } = useGetRentalHouseByHouseId(paramsHouseId);
  const { houseNode, houseForm, houseSubmit, house } = useHouse();
  const { communityNode, communitySubmit, communityForm } = useCommunity(
    paramsHouseId ? formData?.community_name : house?.community_name
  );
  const guShi = useGuShi();

  // 更新
  const save = useRentalHouseSave();

  useEffect(() => {
    if (formData) {
      rentalHouseFrom.setFieldsValue(formData as any);
      houseForm.setFieldsValue(formData as any);
    }
  }, [formData]);

  return (
    <PageContainer
      title={paramsHouseId ? "编辑出租房" : "新增出租房"}
      content={guShi.data}
      footer={[
        <Button
          key="rest"
          onClick={() => {
            communityForm.resetFields();
            houseForm.resetFields();
            rentalHouseFrom.resetFields();
          }}
        >
          重置
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={save.isLoading}
          onClick={async () => {
            const { community_name } = await communitySubmit();
            const { house_id } = await houseSubmit(
              community_name,
              paramsHouseId
            );

            await formSubmit(house_id!);
          }}
        >
          提交
        </Button>,
      ]}
    >
      <Flex vertical gap={8}>
        <Card title="房源信息" loading={save.isLoading}>
          {houseNode}
          <Divider plain />
        </Card>
        <Card title="小区信息" loading={save.isLoading}>
          {communityNode}
          <Divider plain />
        </Card>
        <Card title="出租房信息" key="3">
          <Form form={rentalHouseFrom} labelCol={labelCol} layout="horizontal">
            <Row>
              <Col span={8}>
                <Form.Item
                  label="报价"
                  name="rent_pice"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} addonAfter="元" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="低价"
                  name="rent_low_pice"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} addonAfter="元" />
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

  async function formSubmit(house_id: string) {
    const houseValues = rentalHouseFrom.getFieldsValue();

    let newValue = {
      ...houseValues,
      house_id,
    };

    await save.mutateAsync(newValue);

    rentalHouseFrom.resetFields();
    communityForm.resetFields();
    houseForm.resetFields();

    message.success("保存成功");

    if (paramsHouseId) {
      navigate("/house/rental-house", {
        replace: true,
      });
    }
  }
}
