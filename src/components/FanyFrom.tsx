import { useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
  UploadFile,
} from "antd";
import UploadFany, { fangImagesUpload, qiniuUpload } from "./UploadHouse";
import { useMutation, useQueryClient } from "react-query";
import {
  DecorationFormItem,
  PropertyFormItem,
  PropertyTypeFormItem,
  RegionFormItem,
  TagsFormItem,
  DirectionFormItem,
} from "./FangyFromItems";
import { save } from "../api/SecondHandHousing";
import {
  SecondHandHousing,
  SecondHandHousingFrom,
} from "../model/SecondHandHousing";

const useFanyFrom = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<SecondHandHousingFrom>();
  const [isUpdated, setIsUpdated] = useState(false);
  const client = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ["SaveSecondHandHousing", isUpdated],
    (data: SecondHandHousing) => {
      if (isUpdated) {
        return save({ Update: data as any });
      }
      return save({ Insert: data });
    },
    {
      onSuccess: () => {
        onClose();
      },
    }
  );

  const onClose = () => {
    client.invalidateQueries(["QuerySecondHandHousing"]);
    form.resetFields();
    setOpen(false);
  };

  const openDialog = (data?: SecondHandHousing) => {
    if (data) {
      form.setFieldsValue(data as any);
    }

    setIsUpdated(!!data);
    setOpen(true);
  };

  const fanyFromNode = (
    <>
      <Drawer
        title={isUpdated ? "修改房源信息" : "新增房源信息"}
        width={820}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button
              loading={isLoading}
              onClick={() => form.submit()}
              type="primary"
            >
              保存
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={async (value) => {
            const image_data = value.image_data;
            if (image_data) {
              const data = await fangImagesUpload(form, image_data);
              data?.map(
                (item: any) =>
                  `sgpubjz98.hd-bkt.clouddn.com/${JSON.parse(item.result).key}`
              );
            }

            value.region = value.region?.toString();
            value.tag = value.tag?.toString();

            mutate(value as any);
          }}
        >
          <Form.Item name="id" hidden />
          <Form.Item name="broker" hidden initialValue="admin" />
          <Form.Item name="image_data" label="房源图片">
            <UploadFany />
          </Form.Item>
          <Form.Item
            label="户主姓名"
            name="name"
            required
            rules={[{ required: true }]}
          >
            <Input placeholder="户主姓名" />
          </Form.Item>
          <Form.Item label="地址" name="address">
            <Input placeholder="地址" />
          </Form.Item>
          <RegionFormItem />
          <Form.Item label="联系方式" name="phone">
            <Input placeholder="联系方式" />
          </Form.Item>
          <Form.Item label="报价 (单位 万元)" name="price">
            <InputNumber placeholder="售价" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="低价 (单位 万元)" name="low_price">
            <InputNumber placeholder="低价" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="房型">
            <Space>
              <Form.Item label="室" name="room" noStyle>
                <InputNumber placeholder="几室" />
              </Form.Item>
              <Form.Item label="卫" name="bath" noStyle>
                <InputNumber placeholder="几卫" />
              </Form.Item>
              <Form.Item label="厅" name="hall" noStyle>
                <InputNumber placeholder="几卫" />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label="面积 (单位 m²)" name="area">
            <InputNumber placeholder="面积" />
          </Form.Item>
          <DirectionFormItem />
          <Form.Item label="楼层" name="floor">
            <InputNumber placeholder="楼层" />
          </Form.Item>
          <PropertyFormItem />
          <DecorationFormItem />
          <Form.Item label="房龄" name="age">
            <Input placeholder="房龄" />
          </Form.Item>
          <PropertyTypeFormItem />
          <Form.Item label="电梯" name="elevator">
            <Radio.Group>
              <Radio value={true}>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="停车位" name="parking">
            <Radio.Group>
              <Radio value={true}>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>
          </Form.Item>
          <TagsFormItem />
          <Form.Item label="备注" name="comment">
            <Input.TextArea placeholder="备注" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );

  return {
    openDialog,
    fanyFromNode,
  };
};

export default useFanyFrom;
