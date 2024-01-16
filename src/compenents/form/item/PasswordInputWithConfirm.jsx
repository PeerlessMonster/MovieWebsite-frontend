import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

export default function PasswordInputWithConfirm({ size: size } = {size: "default" }) {
  return (
    <>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "请设置密码！"
          },
          () => ({
            validator(_, value) {
              if (!value || value.length > 6) {
                return Promise.resolve()
              }
              return Promise.reject(new Error("密码不能少于6位！"))
            },
          })
        ]}
      >
        <Input.Password
          size={size}
          prefix={<LockOutlined />}
        />
      </Form.Item>

      <Form.Item
        label="确认密码"
        name="password2"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "请再次输入密码！"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error("两次输入的密码不一致！"))
            },
          })
        ]}
      >
        <Input.Password
          size={size}
          prefix={<UnlockOutlined />}
        />
      </Form.Item>
    </>
  )
}
