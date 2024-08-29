import { Button, Card, Flex, Form, Select, Spin } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { useGetSecondHandByHouseId } from "../../api/second_hand_house";

import { PageContainer } from "@ant-design/pro-components";
import { useCommunity } from "../../components/Community";
import { useHouse } from "../../components/House";
import { useGuShi } from "../../api/gushi";
import {
  pice_type_options,
  rental_status_options,
  usage_options,
} from "../../value_object/house_columns";
import { useSecondHandHouseList } from "../../components/second_hand_house";
import { useRentalHouse } from "../../components/rental_house";

export function SaveResidential({ pice_type = 1 }) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { houseId: paramsHouseId } = useParams<{ houseId: string }>();
  const { data: formData } = useGetSecondHandByHouseId(paramsHouseId);
  const { houseNode, houseForm, houseSubmit, house } = useHouse();
  const { communityNode, communitySubmit, communityForm } = useCommunity(
    paramsHouseId ? formData?.community_name : house?.community_name
  );

  const {
    secondHandHouseListNode,
    secondHandHouseForm,
    secondHandHouseFormSubmit,
  } = useSecondHandHouseList();

  const { rentalHouseNode, rentalHouseFrom, rentalHouseSubmit } =
    useRentalHouse();

  const { data: guShi } = useGuShi();
  const [isLoading, setIsLoading] = useState(false);

  // 更新

  const watch_pice_type = Form.useWatch("pice_type", form);

  return (
    <PageContainer
      title={paramsHouseId ? "编辑房源" : "新增房源"}
      content={guShi}
      extra={[
        <Form
          layout="inline"
          form={form}
          initialValues={{
            usage: 1,
            pice_type,
            rental_status: 1,
          }}
        >
          <Form.Item name="usage" noStyle>
            <Select
              labelRender={({ label }) => <strong>{label}</strong>}
              variant="borderless"
              options={usage_options}
            />
          </Form.Item>
          <Form.Item name="pice_type" noStyle>
            <Select
              labelRender={({ label }) => <strong>{label}</strong>}
              variant="borderless"
              options={pice_type_options}
            />
          </Form.Item>
          <Form.Item name="rental_status" noStyle>
            <Select
              labelRender={({ label }) => <strong>{label}</strong>}
              variant="borderless"
              options={rental_status_options}
            />
          </Form.Item>
        </Form>,
      ]}
      footer={[
        <Button key="rest" onClick={() => navigate(`/house/second-hand-house`)}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={async () => {
            const validations: Promise<any>[] = [
              houseForm.validateFields(),
              communityForm.validateFields(),
            ];

            if (watch_pice_type === 1 || watch_pice_type === 3) {
              validations.push(secondHandHouseForm.validateFields());
            }

            if (watch_pice_type === 2 || watch_pice_type === 3) {
              validations.push(rentalHouseFrom.validateFields());
            }
            // 验证表单
            await Promise.all(validations);
            // 保存小区
            const { community_name } = await communitySubmit();
            // 保证住宅
            const { house_id } = await houseSubmit(
              community_name,
              paramsHouseId
            );

            if (watch_pice_type === 1 || watch_pice_type === 3) {
              // 保存二手房
              await secondHandHouseFormSubmit(house_id);
            }

            if (watch_pice_type === 2 || watch_pice_type === 3) {
              // 保存租房
              await rentalHouseSubmit(house_id);
            }
          }}
        >
          提交
        </Button>,
      ]}
    >
      <Spin spinning={isLoading}>
        <Flex vertical gap={8} className="save-residential">
          {watch_pice_type === 1 || watch_pice_type === 3 ? (
            <Card title="出售信息">{secondHandHouseListNode}</Card>
          ) : null}
          {watch_pice_type === 2 || watch_pice_type === 3 ? (
            <Card title="出租信息">{rentalHouseNode}</Card>
          ) : null}
          <Card title="房源信息">{houseNode}</Card>
          <Card title="小区信息">{communityNode}</Card>
        </Flex>
      </Spin>
    </PageContainer>
  );
}
