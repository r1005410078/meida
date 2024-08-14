import { Form, InputNumber, Modal, DatePicker } from "antd";
import { useState } from "react";
import { useSold } from "../../api/rental_house";
import { SoldRentalHouseForm } from "../../model/rental_house";

const { RangePicker } = DatePicker;

export function useSoldModal() {
  const [open, setOpen] = useState(false);
  const [house_id, setHouseId] = useState<string>();
  const [form] = Form.useForm<SoldRentalHouseForm>();
  const sold = useSold();

  const soldModalNode = (
    <Modal
      open={open}
      title="租售房源"
      okText="租出"
      cancelText="取消"
      onCancel={() => {
        form.resetFields();
        setOpen(false);
      }}
      onOk={async () => {
        const values = await form.validateFields();
        const [rent_start_time, rent_end_time] = values.date;

        await sold.mutateAsync({
          house_id: house_id!,
          rent_start_time: rent_start_time.format("YYYY-MM-DDTHH:mm:ss"),
          rent_end_time: rent_end_time.format("YYYY-MM-DDTHH:mm:ss"),
          rent_pice: values.rent_pice,
        });

        form.resetFields();
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
          name="rent_pice"
          label="租金"
          rules={[
            {
              required: true,
              message: "请输入卖出价格！",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="输入价格 (单位元)"
          />
        </Form.Item>
        <Form.Item
          name="date"
          label="售价"
          rules={[
            {
              required: true,
              message: "请输入租期！",
            },
          ]}
        >
          <RangePicker />
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
