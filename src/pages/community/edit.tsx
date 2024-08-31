import { Button, Card, Divider, Flex, message } from "antd";
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
      breadcrumb={{
        items: [],
      }}
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
          返回
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={async () => {
            await communitySubmit();
            communityForm.resetFields();

            message.success("提交成功");
            if (community_name) {
              navigate(`/base-info/community`);
            }
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
