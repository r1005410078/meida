import {
  Button,
  Card,
  Flex,
  Form,
  InputNumber,
  Modal,
  Select,
  theme,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { HouseFrom } from "../../model/House";
import { useEffect } from "react";

import { SecondHandHousingFrom } from "../../model/SecondHandHousing";
import {
  useGetSecondHandByHouseId,
  useSecondHandHouseCreate,
  useSecondHandHouseUpdate,
} from "../../api/SecondHandHouse";
import { useHouseList } from "../../api/house";

export function Edit() {
  const [form] = useForm<SecondHandHousingFrom>();
  const { houseId } = useParams<{ houseId: string }>();
  const { data: formData } = useGetSecondHandByHouseId(houseId);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [houseForm] = useForm<HouseFrom>();
  const navigate = useNavigate();

  // 创建
  const create = useSecondHandHouseCreate();
  // 更新
  const update = useSecondHandHouseUpdate();
  const ownerName = Form.useWatch("owner_name", houseForm);
  const { data: houseResult } = useHouseList({
    page_index: 1,
    page_size: 10000,
  });
  const houseList = houseResult?.data ?? [];
  const houseData = houseList.filter((item) => item.owner_name === ownerName);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData as any);
      houseForm.setFieldsValue(formData as any);
    }
  }, [formData]);

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Flex justify="space-between" align="center">
          <Button
            type="link"
            size="small"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate("/house");
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              marginLeft: 30,
              color: "#000",
            }}
          >
            房源{houseId ? `编辑` : "新建房源"}
          </Button>
          <div style={{ marginRight: 16 }}>
            <Button
              size="large"
              shape="round"
              type="primary"
              loading={create.isLoading || update.isLoading}
              onClick={() => form.submit()}
            >
              保存
            </Button>
          </div>
        </Flex>
      </Header>
      <Content
        style={{
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          overflow: "auto",
        }}
      >
        <Flex vertical gap="large">
          <Card title="房屋信息">
            <Form form={houseForm}>
              <Form.Item
                label="户主姓名"
                name="owner_name"
                rules={[{ required: true }]}
              >
                <Select showSearch>
                  {houseList?.map((item) => (
                    <Select.Option
                      value={item.owner_name}
                      key={item.owner_name}
                    >
                      {item.owner_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="小区名称"
                name="community_name"
                rules={[{ required: true }]}
              >
                <Select showSearch>
                  {houseData?.map((item) => (
                    <Select.Option
                      value={item.community_name}
                      key={item.community_name}
                    >
                      {item.community_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="房屋地址"
                name="house_address"
                rules={[{ required: true }]}
              >
                <Select showSearch>
                  {houseData?.map((item) => (
                    <Select.Option
                      value={item.house_address}
                      key={item.house_address}
                    >
                      {item.house_address}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Card>
          <Card title="二手房">
            <Form
              form={form}
              onFinish={async (value) => {
                const houseValues = houseForm.getFieldsValue();
                const house_id = houseList.find(
                  (item) =>
                    item.owner_name === ownerName &&
                    item.house_address === houseValues.house_address &&
                    item.community_name === houseValues.community_name
                )?.house_id!;

                let newValue = {
                  ...value,
                  house_id,
                };

                if (value.listed) {
                  await create.mutate(newValue);
                } else {
                  await update.mutateAsync(newValue);
                }

                form.resetFields();

                if (houseId) {
                  navigate("/second-hand-house", { replace: true });
                } else {
                  Modal.confirm({
                    title: "房源保存成功",
                    icon: <CheckCircleFilled color="green" />,
                    okText: "继续添加房源",
                    cancelText: "返回列表",
                    onOk() {
                      navigate("/second-hand-house/new", {
                        replace: true,
                      });
                    },
                    onCancel() {
                      navigate("/second-hand-house", {
                        replace: true,
                      });
                    },
                  });
                }
              }}
            >
              <Form.Item label="报价" name="pice" rules={[{ required: true }]}>
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="低价"
                name="low_pice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="是否上架"
                name="listed"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value={1}>上架</Select.Option>
                  <Select.Option value={0}>下架</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </Content>
    </>
  );
}
