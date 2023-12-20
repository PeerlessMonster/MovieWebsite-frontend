import { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const { useWatch } = Form;

import RegisterModal from "./RegisterModal"

export default function LoginModal({ loginModalOpen, closeLoginModal }) {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const [form] = Form.useForm();
  const resetAndCloseModal = () => {
    closeLoginModal()
    form.resetFields()
  }

  const submitLogin = () => {
    const formData = useWatch([], form)
  }

  return (
    <Modal
      style={{
        maxWidth: "25em",
        textAlign: "center"
      }}
      title="登录账号，解锁更多精彩~"
      centered
      open={loginModalOpen}
      //   onOk={closeModal}
      onCancel={resetAndCloseModal}
      footer={null}
    >
      <Form
        name="login"
        style={{
          marginTop: "5vh",
          maxWidth: "23em",
          textAlign: "start"
        }}
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={submitLogin}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名！",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="邮箱"
          />
        </Form.Item>
        <Form.Item
          style={{
            marginTop: "3vh",
          }}
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item
          style={{
            marginTop: "3vh",
          }}
        >
          <Button
            style={{
              width: "100%",
            }}
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
          <div
            style={{
              textAlign: "end"
            }}
          >
            还没有账号？
            <a href="" onClick={(e) => {
                e.preventDefault()
                setRegisterModalOpen(true)
            }}>
              现在注册
            </a>
            ！

            <RegisterModal
                modalOpen={registerModalOpen}
                closeModal={() => setRegisterModalOpen(false)}
            />

          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
