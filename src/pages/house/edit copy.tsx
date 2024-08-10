import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  theme,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { HouseFrom } from "../../model/House";
import { useEffect } from "react";
import { useCreateHouse, useHouseById, useUpdateHouse } from "../../api/house";
import { useCommunityList } from "../../api/community";
import UploadHouse, { fangImagesUpload } from "../../components/UploadHouse";
import axios from "axios";

export function Edit() {
  const [form] = useForm<HouseFrom>();
  const { houseId } = useParams<{ houseId: string }>();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const create = useCreateHouse();
  const update = useUpdateHouse();
  const { data } = useHouseById(houseId);
  const { data: communityList } = useCommunityList();
  const formData = data?.data;

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData as any);
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
            {houseId ? `编辑房源` : "新建房源"}
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
        <Form
          form={form}
          layout={"vertical"}
          onFinish={async (value) => {
            const house_image = value.house_image;
            if (Array.isArray(house_image)) {
              const data = await fangImagesUpload(form, house_image);

              let urls = await Promise.all(
                data!.map((item: any) =>
                  axios
                    .get(
                      `/api/v1/qiniu/get_upload_url/${
                        JSON.parse(item.result).key
                      }`
                    )
                    .then((res) => res.data.data)
                )
              );

              value.house_image = urls.join(",") as any;
            }

            let newValue = {
              house_id: houseId,
              ...value,
            };

            if (houseId) {
              await update.mutateAsync(newValue);
            } else {
              await create.mutateAsync(newValue);
            }

            form.resetFields();

            if (houseId) {
              navigate("/house", { replace: true });
            } else {
              Modal.confirm({
                title: "房源保存成功",
                icon: <CheckCircleFilled color="green" />,
                okText: "继续添加房源",
                cancelText: "返回列表",
                onOk() {
                  navigate("/house/new", {
                    replace: true,
                  });
                },
                onCancel() {
                  navigate("/house", {
                    replace: true,
                  });
                },
              });
            }
          }}
          style={{ padding: 50, margin: "0 auto" }}
        >
          <Form.Item
            label="房源名称"
            name="community_name"
            rules={[{ required: true }]}
          >
            <Select>
              {communityList?.data?.map((item) => (
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
            <Input />
          </Form.Item>
          <Form.Item
            label="房屋类型"
            name="house_type"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="面积 (单位 m²)" name="area">
            <InputNumber placeholder="面积" />
          </Form.Item>
          <Form.Item label="房型">
            <Space>
              <Form.Item label="室" name="bedrooms" noStyle>
                <InputNumber placeholder="几室" />
              </Form.Item>
              <Form.Item label="卫" name="bathrooms" noStyle>
                <InputNumber placeholder="几卫" />
              </Form.Item>
              <Form.Item label="厅" name="living_rooms" noStyle>
                <InputNumber placeholder="几厅" />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label="朝向" name="orientation">
            <Select
              placeholder="朝向"
              defaultValue={[]}
              onChange={() => {}}
              style={{ minWidth: 200 }}
              options={[
                {
                  value: "东",
                  label: "东",
                },
                {
                  value: "西",
                  label: "西",
                },
                {
                  value: "南",
                  label: "南",
                },
                {
                  value: "北",
                  label: "北",
                },
                {
                  value: "东南",
                  label: "东南",
                },
                {
                  value: "东北",
                  label: "东北",
                },
                {
                  value: "西南",
                  label: "西南",
                },
                {
                  value: "西北",
                  label: "西北",
                },
                {
                  value: "东西",
                  label: "东西",
                },
                {
                  value: "南北",
                  label: "南北",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="房屋装修情况"
            name="decoration_status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="房屋状态"
            name="status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="房屋图片"
            name="house_image"
            rules={[{ required: true }]}
          >
            <UploadHouse />
          </Form.Item>
          <Form.Item
            label="户主姓名"
            name="owner_name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="户主联系方式"
            name="owner_phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="房源描述" name="house_description">
            <Input.TextArea rows={10} />
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}
