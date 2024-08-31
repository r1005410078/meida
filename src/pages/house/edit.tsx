import { Button, Card, Divider, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import { useCommunity } from "../../components/Community";
import { useHouse } from "../../components/House";
import { message } from "antd/lib";
import { useGuShi } from "../../api/gushi";

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

  const { data: guShi } = useGuShi();

  return (
    <PageContainer
      breadcrumb={{
        items: [],
      }}
      title={paramsHouseId ? "编辑房源信息" : "新增房源信息"}
      content={guShi}
      footer={[
        <Button
          key="rest"
          onClick={() => {
            navigate(`/base-info/house`);
          }}
        >
          返回
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={houseLoading || communityLoading}
          onClick={async () => {
            // 验证表单
            await Promise.all([
              communityForm.validateFields(),
              houseForm.validateFields(),
            ]);

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
        </Card>
        <Card title="小区信息" loading={communityLoading}>
          {communityNode}
        </Card>
      </Flex>
    </PageContainer>
  );
}
