import { Button, Card, Divider, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";
import { useCommunity } from "../../components/Community";

export function Edit() {
  const navigate = useNavigate();
  const { community_name } = useParams<{ community_name: string }>();
  const { communityNode, communitySubmit, communityForm } =
    useCommunity(community_name);

  return (
    <PageContainer
      title={community_name ? "编辑小区" : "新增小区"}
      content="庭院深深深几许，杨柳堆烟，帘幕无重数。"
      footer={[
        <Button
          key="rest"
          onClick={() => {
            communityForm.resetFields();
            if (community_name) {
              navigate(`/house/community`);
            }
          }}
        >
          重置
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={async () => {
            await communitySubmit();
          }}
        >
          提交
        </Button>,
      ]}
    >
      <Flex vertical gap={8}>
        <Card title="小区信息">
          {communityNode}
          <Divider plain />
        </Card>
      </Flex>
    </PageContainer>
  );
}
