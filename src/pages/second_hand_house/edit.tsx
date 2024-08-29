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
  Spin,
} from "antd";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

import { SecondHandHousingFrom } from "../../model/second_hand_housing";
import {
  useGetSecondHandByHouseId,
  useSecondHandHouseSave,
} from "../../api/second_hand_house";

import { PageContainer } from "@ant-design/pro-components";
import { useCommunity } from "../../components/Community";
import { useHouse } from "../../components/House";
import { useGuShi } from "../../api/gushi";
import { house_tags } from "../../value_object/house_columns";

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
  const [isLoading, setIsLoading] = useState(false);

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
        <Button key="rest" onClick={() => navigate(`/house/second-hand-house`)}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            try {
              const { community_name } = await communitySubmit();
              const { house_id } = await houseSubmit(
                community_name,
                paramsHouseId
              );

              await secondHandHouseFormSubmit(house_id!);

              message.success("保存成功!");
              resetFields();
            } catch (error) {
              console.error(error);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          提交
        </Button>,
      ]}
    >
      <Spin spinning={isLoading}>
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
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      addonAfter="万元"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="低价"
                    name="low_pice"
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      addonAfter="万元"
                    />
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
              <Row>
                <Col span={8}>
                  <Form.Item
                    label="标签"
                    name="tags"
                    rules={[{ required: true }]}
                  >
                    <Select mode="multiple" options={house_tags} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Flex>
      </Spin>
    </PageContainer>
  );

  async function secondHandHouseFormSubmit(house_id: string) {
    const houseValues = secondHandHouseForm.getFieldsValue();

    let newValue = {
      ...houseValues,
      house_id,
      tags: houseValues.tags?.join(",") || "",
    };

    await save.mutateAsync(newValue as any);

    secondHandHouseForm.resetFields();

    message.success("保存成功");

    if (paramsHouseId) {
      navigate("/house/second-hand-house");
    }
  }

  function resetFields() {
    secondHandHouseForm.resetFields();
    houseForm.resetFields();
    communityForm.resetFields();
  }
}
