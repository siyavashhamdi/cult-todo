import { Input, Button, Form } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import "./todo-form.scss";

export interface ISubmitDocument {
  title: string;
}

export interface ITodoFormProps {
  onSubmit: (document: ISubmitDocument) => void;
}

export function TodoForm({ onSubmit }: ITodoFormProps) {
  return (
    <Form onFinish={onSubmit}>
      <Input.Group compact className="title-holder">
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              whitespace: false,
              message: "Please input todo title!",
            },
          ]}
        >
          <Input allowClear className="input-add" placeholder="Todo title..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<CopyOutlined />} />
        </Form.Item>
      </Input.Group>
    </Form>
  );
}
