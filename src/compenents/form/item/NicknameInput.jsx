import { SmileOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

const labelText = "昵称"

export default function NicknameInput(
  { size: size, label: label } = { size: "default" }
) {
  if (label !== "inside" && label !== "outside") {
    label = "inside"
  }

  return (
    <Form.Item
      label={label === "outside" ? labelText : null}
      name="name"
    >
      <Input
        size={size}
        prefix={<SmileOutlined />}
        placeholder={label === "inside" ? labelText : null}
      />
    </Form.Item>
  )
}
