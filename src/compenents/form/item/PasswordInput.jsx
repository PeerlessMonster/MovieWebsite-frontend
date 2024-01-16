import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

export default function PasswordInput({ size: size } = { size: "default" }) {
  return (
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: "请输入密码！"
        }
      ]}
    >
      <Input
        size={size}
        prefix={
          <LockOutlined />
        }
        type="password"

        placeholder="密码"
      />
    </Form.Item>
  )
}
