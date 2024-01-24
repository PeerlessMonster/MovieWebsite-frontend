import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

const labelText = "密码"
const labelText2 = "确认密码"

export default function PasswordInputWithConfirm(
  { size: size, label: label } = { size: "default" }
) {
  if (label !== "inside" && label !== "outside") {
    label = "inside"
  }

  return (
    <>
      <Form.Item
        label={label === "outside" ? labelText : null}
        name="password"
        rules={[
          {
            required: true,
            message: "请设置密码！",
          },
          () => ({
            validator(_, value) {
              if (!value || value.length > 6) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("密码不能少于6位！"));
            },
          }),
        ]}
      >
        <Input.Password
          size={size}
          prefix={<LockOutlined />}
          placeholder={label === "inside" ? labelText : null}
        />
      </Form.Item>

      <Form.Item
        label={label === "outside" ? labelText2 : null}
        name="password2"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "请再次输入密码！",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error("两次输入的密码不一致！"))
            },
          }),
        ]}
      >
        <Input.Password
          size={size}
          prefix={<UnlockOutlined />}
          placeholder={label === "inside" ? labelText2 : null}
        />
      </Form.Item>
    </>
  )
}
