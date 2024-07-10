import { useState } from "react";
import { Button, Drawer, Form, Input, InputNumber, Space } from "antd";
import UploadFany from "./UploadFany";
import { useMutation, useQueryClient } from "react-query";
import {
  delete_fangy,
  Fangy,
  FangyPrimaryKey,
  insert_fangy,
  update_fangy,
  UpdateFangy,
} from "../api/fangy";
import {
  AgeFormItem,
  DecorationFormItem,
  FloorFormItem,
  PropertyFormItem,
  PropertyTypeFormItem,
  RegionFormItem,
  TagsFormItem,
  TowardFormItem,
} from "./FangyFromItems";

const useFanyFrom = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<UpdateFangy>();
  const [isUpdated, setIsUpdated] = useState(false);
  const client = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ["update_fangy", isUpdated],
    (data: UpdateFangy) => {
      if (isUpdated) {
        return update_fangy(data);
      }
      return insert_fangy(data);
    },
    {
      onSuccess: () => {
        onClose();
      },
    }
  );

  const { mutate: deleteMutate, isLoading: deleteIsLoading } = useMutation(
    ["delete_fangy", isUpdated],
    (data: FangyPrimaryKey) => {
      return delete_fangy(data);
    },
    {
      onSuccess: () => {
        onClose();
      },
    }
  );

  const onClose = () => {
    client.invalidateQueries(["query_fangy"]);
    form.resetFields();
    setOpen(false);
  };

  const openDialog = (data?: Fangy) => {
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
            {isUpdated ? (
              <Button
                type="primary"
                danger
                loading={deleteIsLoading}
                onClick={() => {
                  deleteMutate({ id: form.getFieldValue("id") });
                }}
              >
                删除
              </Button>
            ) : null}
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
          onFinish={(value) => {
            if (!value.image_data) {
              value.image_data = [];
            }
            mutate({ ...value });
          }}
        >
          <Form.Item name="id" hidden />
          <Form.Item name="image_url" label="房源图片">
            <UploadFany />
          </Form.Item>
          <Form.Item label="户主姓名" name="name">
            <Input placeholder="户主姓名" />
          </Form.Item>
          <Form.Item label="位置" name="location">
            <Input placeholder="位置" />
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
          <Form.Item label="房型" name="room">
            <Space>
              <Input placeholder="室" />
              <Input placeholder="厅" />
              <Input placeholder="卫" />
            </Space>
          </Form.Item>
          <Form.Item label="面积 (单位 m²)" name="area">
            <Input placeholder="面积" />
          </Form.Item>
          <TowardFormItem />
          <FloorFormItem />
          <PropertyFormItem />
          <DecorationFormItem />
          <AgeFormItem />
          <PropertyTypeFormItem />
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
