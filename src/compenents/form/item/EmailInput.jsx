import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";

const labelText = "邮箱"

export default function EmailInput(
  { size: size, label: label } = { size: "default" }
) {
  if (label !== "inside" && label !== "outside") {
    label = "inside"
  }

  return (
    <Form.Item
      label={label === "outside" ? labelText : null}
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
        placeholder={label === "inside" ? labelText : null}
      />
    </Form.Item>
  )
}
