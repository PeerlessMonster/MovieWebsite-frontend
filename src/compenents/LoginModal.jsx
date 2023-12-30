import { useState } from "react";
import { Alert, Button, Checkbox, Form, Input, Modal, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const { useWatch } = Form;

import RegisterModal from "./RegisterModal"

export default function LoginModal({ loginModalOpen, closeLoginModal, setUserInfo }) {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("")

  const [form] = Form.useForm();
  const resetAndCloseModal = () => {
    closeLoginModal()
    setErrorMessage("")
    form.resetFields()
  }

  const formData = useWatch([], form)
  const submitLogin = async () => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      // .then((response) => {
      //   if (response.ok) {
      //     console.log("success")

      //   } else {
      //     return response.json()
      //   }
      // })
      // .then((data) => {
      //   console.log(data)
      // })
      // .catch((error) => {
      //   console.log(error)
      // })
    
    const data = await response.json()
    if (response.ok) {
      resetAndCloseModal()
      message.success("登录成功")
      setUserInfo(data)
      
    } else {
      if (response.status == 401) {
        setErrorMessage(data.message)
      }
    }
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
      {errorMessage != "" ?
      (<Alert
        style={{
          marginTop: "2vh",
          textAlign: "start"
        }}
        message={errorMessage}
        type="error"
        showIcon
      />) : null}

      <Form
        name="login"
        style={{
          marginTop: "3vh",
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
