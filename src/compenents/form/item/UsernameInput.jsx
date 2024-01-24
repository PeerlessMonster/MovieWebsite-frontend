import { Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const labelText = "邮箱"

export default function UsernameInput(
  { size: size, label: label } = { size: "default" }
) {
  if (label !== "inside" && label !== "outside") {
    label = "inside"
  }

  return (
    <Form.Item
      label={label === "outside" ? labelText : null}
      name="username"
      rules={[
        {
          required: true,
          message: "请输入用户名！"
        }
      ]}
    >
      <Input
        size={size}
        prefix={<UserOutlined />}
        placeholder={label === "inside" ? labelText : null}
      />
    </Form.Item>
  )
}
