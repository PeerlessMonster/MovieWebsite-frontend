import { useContext, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Modal, message } from "antd";
const { useWatch } = Form;

import classes from "./LoginModal.module.less"
import RegisterModal from "./RegisterModal"
import { tryLogin } from "../../requests/user";
import { userContext } from "../../states/userContext";

export default function LoginModal({ loginModalOpen, closeLoginModal }) {
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  
  const [form] = Form.useForm()
  const [errorMessage, setErrorMessage] = useState("")
  const resetAndCloseModal = () => {
    closeLoginModal()
    setErrorMessage("")
    form.resetFields()
  }

  const user = useContext(userContext)

  const formData = useWatch([], form)
  const submitLogin = async () => {
    const response = await tryLogin(formData)
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
      user.updateInfo(data)
      
    } else {
      if (response.status === 401) {
        setErrorMessage(data.message)
      }
    }
  }

  return (
    <Modal
      centered
      className={classes.modalWhole}

      title="登录账号，解锁更多精彩~"
      open={loginModalOpen}
      //   onOk={closeModal}
      onCancel={resetAndCloseModal}
      footer={null}
    >
      {errorMessage != "" ?
      (<Alert
        type="error"
        showIcon
        className={classes.alertBottomofTitle}

        message={errorMessage}
      />) : null}

      <Form
        className={classes.formBottomofTitle}

        name="login"
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
            prefix={
              <UserOutlined />
            }
            placeholder="邮箱"
          />
        </Form.Item>
        <Form.Item
          className={classes.passwordBottomofUsername}
          
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        >
          <Input
            prefix={
              <LockOutlined />
            }
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item
          noStyle

          name="remember"
          valuePropName="checked"
        >
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item className={classes.buttonBottomofCheckbox}>
          <Button
            type="primary"
            className={classes.loginButton}

            htmlType="submit"
          >
            登录
          </Button>
          <div className={classes.registerHref}>
            还没有账号？
            <a
              href="#"
              onClick={(e) => {
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
