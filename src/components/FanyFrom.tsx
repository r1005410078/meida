import { useState } from "react";
import { Button, Drawer, Form, Input, Space } from "antd";
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
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话号码"
            rules={[{ required: true, message: "请输入电话号码" }]}
          >
            <Input placeholder="请输入电话号码" />
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: "请输入地址" }]}
          >
            <Input placeholder="请输入地址" />
          </Form.Item>
          <Form.Item name="image_data" label="照片">
            <UploadFany />
          </Form.Item>
          <Form.Item
            name="comment"
            label="备注"
            rules={[{ message: "请输入备注" }]}
          >
            <Input.TextArea placeholder="请输入备注" rows={4}></Input.TextArea>
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
