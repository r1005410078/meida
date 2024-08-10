import { Button, Card, Divider, Flex } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useHouseById } from "../../api/house";

import { PageContainer } from "@ant-design/pro-components";
import { useCommunity } from "../../components/Community";
import { useHouse } from "../../components/House";

export function Edit() {
  const navigate = useNavigate();
  const { houseId: paramsHouseId } = useParams<{ houseId: string }>();
  const { data: houseResult } = useHouseById(paramsHouseId);
  const formData = houseResult?.data;

  const { houseNode, houseForm, houseSubmit, house } = useHouse();
  const { communityNode, communitySubmit, communityForm } = useCommunity(
    paramsHouseId ? formData?.community_name : house?.community_name
  );

  useEffect(() => {
    if (formData) {
      houseForm.setFieldsValue(formData as any);
    }
  }, [formData]);

  return (
    <PageContainer
      title={paramsHouseId ? "编辑房源信息" : "新增房源信息"}
      content="庭院深深深几许，杨柳堆烟，帘幕无重数。"
      footer={[
        <Button
          key="rest"
          onClick={() => {
            communityForm.resetFields();
            houseForm.resetFields();
          }}
        >
          重置
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={async () => {
            const { community_name } = await communitySubmit();
            await houseSubmit(community_name, paramsHouseId);

            if (paramsHouseId) {
              navigate(`/base-info/house`);
            }
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
      </Flex>
    </PageContainer>
  );
}
