import { SmileOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

export default function NicknameInput({ size: size } = { size: "default" }) {
  return (
    <Form.Item
      label="昵称"
      name="name"
    >
      <Input
        size={size}
        prefix={<SmileOutlined />}
      />
    </Form.Item>
  )
}
