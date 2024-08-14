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

import { SecondHandHousingFrom } from "../../model/second_hand_housing";
import {
  useGetSecondHandByHouseId,
  useSecondHandHouseSave,
} from "../../api/second_hand_house";

import { PageContainer } from "@ant-design/pro-components";
import { useCommunity } from "../../components/Community";
import { useHouse } from "../../components/House";
import { useGuShi } from "../../api/gushi";

const labelCol = { span: 6 };

export function Edit() {
  const navigate = useNavigate();
  const [secondHandHouseForm] = useForm<SecondHandHousingFrom>();
  const { houseId: paramsHouseId } = useParams<{ houseId: string }>();
  const { data: formData } = useGetSecondHandByHouseId(paramsHouseId);
  const { houseNode, houseForm, houseSubmit, house } = useHouse();
  const { communityNode, communitySubmit, communityForm } = useCommunity(
    paramsHouseId ? formData?.community_name : house?.community_name
  );

  const { data: guShi } = useGuShi();

  // 更新
  const save = useSecondHandHouseSave();

  useEffect(() => {
    if (formData) {
      secondHandHouseForm.setFieldsValue(formData as any);
      houseForm.setFieldsValue(formData as any);
    }
  }, [formData]);

  return (
    <PageContainer
      title={paramsHouseId ? "编辑二手房" : "新增二手房"}
      content={guShi}
      footer={[
        <Button
          key="rest"
          onClick={() => {
            communityForm.resetFields();
            houseForm.resetFields();
            secondHandHouseForm.resetFields();
          }}
        >
          重置
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={async () => {
            const { community_name } = await communitySubmit();
            const { house_id } = await houseSubmit(
              community_name,
              paramsHouseId
            );

            await secondHandHouseFormSubmit(house_id!);
          }}
        >
          提交
        </Button>,
      ]}
    >
      <Flex vertical gap={8}>
        <Card title="房源信息">
          {houseNode}
          <Divider plain />
        </Card>
        <Card title="小区信息">
          {communityNode}
          <Divider plain />
        </Card>
        <Card title="二手房信息" key="3">
          <Form
            form={secondHandHouseForm}
            labelCol={labelCol}
            layout="horizontal"
          >
            <Row>
              <Col span={8}>
                <Form.Item
                  label="报价"
                  name="pice"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} addonAfter="万元" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="低价"
                  name="low_pice"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} addonAfter="万元" />
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

  async function secondHandHouseFormSubmit(house_id: string) {
    const houseValues = secondHandHouseForm.getFieldsValue();

    let newValue = {
      ...houseValues,
      house_id,
    };

    await save.mutateAsync(newValue);

    secondHandHouseForm.resetFields();

    message.success("保存成功");

    if (paramsHouseId) {
      navigate("/house/second-hand-house");
    }
  }
}
