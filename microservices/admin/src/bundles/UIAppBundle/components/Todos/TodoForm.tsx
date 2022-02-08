import { useRef } from "react";
import { Input, Button, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { CopyOutlined } from "@ant-design/icons";

import "./todo-form.scss";

export interface ISubmitDocument {
  title: string;
}

export interface ITodoFormProps {
  onSubmit: (document: ISubmitDocument) => void;
}

export function TodoForm({ onSubmit }: ITodoFormProps) {
  const [form] = useForm();
  const titleInputRef = useRef();

  const handleFormSubmit = (document: ISubmitDocument) => {
    form.resetFields();

    (titleInputRef as React.MutableRefObject<HTMLInputElement>).current.focus();

    onSubmit(document);
  };

  return (
    <Form form={form} onFinish={handleFormSubmit}>
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
          <Input
            allowClear
            ref={titleInputRef}
            className="input-add"
            placeholder="Todo title..."
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<CopyOutlined />} />
        </Form.Item>
      </Input.Group>
    </Form>
  );
}
