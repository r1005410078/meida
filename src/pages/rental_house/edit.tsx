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
import { useEffect, useState } from "react";

import { RentalHouseFrom } from "../../model/rental_house";
import {
  useGetRentalHouseByHouseId,
  useRentalHouseSave,
} from "../../api/rental_house";

import { PageContainer } from "@ant-design/pro-components";
import { useCommunity } from "../../components/Community";
import { useHouse } from "../../components/House";
import { useGuShi } from "../../api/gushi";
import { house_tags } from "../../value_object/house_columns";

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
  const [isLoading, setIsLoading] = useState(false);
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
            navigate("/house/rental-house", {
              replace: true,
            });
          }}
        >
          返回
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

              await formSubmit(house_id!);
            } catch (error) {
              console.log(error);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          提交
        </Button>,
      ]}
    >
      <Flex vertical gap={8}>
        <Card title="房源信息">{houseNode}</Card>
        <Card title="小区信息">{communityNode}</Card>
        <Card title="出租房信息" key="3">
          <Form form={rentalHouseFrom} labelCol={labelCol} layout="horizontal">
            <Row>
              <Col span={8}>
                <Form.Item
                  label="报价"
                  name="rent_pice"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: "100%" }}
                    addonAfter="元"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="低价"
                  name="rent_low_pice"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: "100%" }}
                    addonAfter="元"
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
    </PageContainer>
  );

  async function formSubmit(house_id: string) {
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
    communityForm.resetFields();
    houseForm.resetFields();
  }
}
