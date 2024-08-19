import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { Form } from "antd";
import { useState } from "react";
import { useRegisterUser } from "../../api/users";
import { UserFrom } from "../../model/user";

export function useUserEdit() {
  const [form] = Form.useForm<UserFrom>();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const save = useRegisterUser();

  const userEditNode = (
    <ModalForm<UserFrom>
      title={isEdit ? "编辑用户" : "新增用户"}
      open={open}
      form={form}
      autoFocusFirstInput
      loading={save.isLoading}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          setOpen(false);
          setIsEdit(false);
          form.resetFields();
        },
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await save.mutateAsync(values);
        setIsEdit(false);
        setOpen(false);
        form.resetFields();
        return true;
      }}
    >
      <ProForm.Item>
        <ProFormText
          width="md"
          name="username"
          label="用户名称"
          tooltip="最长为 24 位"
          rules={[{ required: true }]}
          placeholder="请输入用户名称"
        />
      </ProForm.Item>
      <ProForm.Item>
        <ProFormText
          width="md"
          name="phone"
          label="手机号"
          rules={[{ required: true }]}
          tooltip="最长为 11 位"
          placeholder="请输入手机号"
        />
      </ProForm.Item>
      <ProForm.Item>
        <ProFormText.Password
          width="md"
          name="password"
          label="用户密码"
          rules={[{ required: true }]}
          tooltip="最长为 24 位"
          placeholder="请输入用户密码"
        />
      </ProForm.Item>
    </ModalForm>
  );

  return {
    userEditNode,
    openUserEdit: (values?: any) => {
      setIsEdit(!!values);
      form.setFieldsValue(values);
      setOpen(true);
    },
  };
}
