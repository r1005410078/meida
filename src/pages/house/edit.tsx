import { Button, Card, Divider, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import { useCommunity } from "../../components/Community";
import { useHouse } from "../../components/House";
import { message } from "antd/lib";

export function Edit() {
  const navigate = useNavigate();
  const { houseId: paramsHouseId } = useParams<{ houseId: string }>();
  const {
    houseNode,
    houseForm,
    houseSubmit,
    house,
    loading: houseLoading,
  } = useHouse();
  const {
    communityNode,
    communitySubmit,
    communityForm,
    loading: communityLoading,
  } = useCommunity(house?.community_name);

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
            message.success("保存成功");
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
        <Card title="房源信息" loading={houseLoading}>
          {houseNode}
          <Divider plain />
        </Card>
        <Card title="小区信息" loading={communityLoading}>
          {communityNode}
          <Divider plain />
        </Card>
      </Flex>
    </PageContainer>
  );
}
