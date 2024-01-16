import { MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

export default function EmailInput({ size: size } = { size: "default" }) {
  return (
    <Form.Item
      label="邮箱"
      name="email"
      rules={[
        {
          type: "email",
          message: "邮箱不符合格式！"
        },
        {
          required: true,
          message: "请输入邮箱！"
        }
      ]}
    >
      <Input
        size={size}
        prefix={<MailOutlined />}
      />
    </Form.Item>
  )
}
