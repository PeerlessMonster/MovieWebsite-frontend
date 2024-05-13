import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";

const labelText = "密码"

export default function PasswordInput(
  { size: size, label: label } = { size: "default" }
) {
  if (label !== "inside" && label !== "outside") {
    label = "inside"
  }

  return (
    <Form.Item
      label={label === "outside" ? labelText : null}
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
        prefix={<LockOutlined />}
        type="password"
        placeholder={label === "inside" ? labelText : null}
      />
    </Form.Item>
  )
}
