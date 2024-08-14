import { Form, InputNumber, Modal } from "antd";
import { useState } from "react";
import { useSold } from "../../api/second_hand_house";

interface SoldForm {
  sale_price: number;
}

export function useSoldModal() {
  const [open, setOpen] = useState(false);
  const [house_id, setHouseId] = useState<string>();
  const [form] = Form.useForm<SoldForm>();
  const sold = useSold();

  const soldModalNode = (
    <Modal
      open={open}
      title="出售房源"
      okText="卖出"
      cancelText="取消"
      onCancel={() => {
        form.resetFields();
        setOpen(false);
      }}
      onOk={async () => {
        const values = await form.validateFields();
        form.resetFields();
        await sold.mutateAsync({
          sale_price: values.sale_price,
          house_id: house_id!,
        });
        setOpen(false);
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="sale_price"
          label="售价"
          rules={[
            {
              required: true,
              message: "请输入卖出价格！",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="输入价格 (单位万元)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );

  return {
    soldModalNode,
    openSoldModal(house_id: string) {
      setOpen(true);
      setHouseId(house_id);
    },
  };
}
