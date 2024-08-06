import { Form, Input } from "antd";

export function SecondHandHouseForm() {
  return (
    <>
      <Form.Item
        name="title"
        label="Title"
        rules={[
          { required: true, message: "Please input the title of collection!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input type="textarea" />
      </Form.Item>
      <Form.Item
        name="modifier"
        className="collection-create-form_last-form-item"
      >
        <Input />
      </Form.Item>
    </>
  );
}
