import { useContext, useState } from "react";
import { Alert, Button, Checkbox, Form, Modal, message } from "antd";
const { useWatch } = Form;

import classes from "./LoginModal.module.less"
import RegisterModal from "./RegisterModal"
import { tryLogin } from "../../../requests/user";
import { UserContext } from "../../../states/UserContext";
import PasswordInput from "../item/PasswordInput";
import UsernameInput from "../item/UsernameInput";

export default function LoginModal({ loginModalOpen, closeLoginModal }) {
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  
  const [form] = Form.useForm()
  const [errMsg, setErrMsg] = useState("")
  const resetAndCloseModal = () => {
    closeLoginModal()
    setErrMsg("")
    form.resetFields()
  }

  const user = useContext(UserContext)

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
      user.updateInfo(data)
      message.success("登录成功")
      
      const channel = new BroadcastChannel("login_status")
      /* 确保登录时，当前页面的userInfo改变，当前页面的useEffect先清理再执行，监听才收到登录的消息，其他页面处理而当前页面不会处理 */
      setTimeout(() => {
        channel.postMessage("login")
      }, 0.5*1000)

    } else {
      if (response.status === 401) {
        setErrMsg(data.message)
      }
    }
  }

  return (
    <Modal
      centered
      width={400}
      className={classes.modalWhole}

      title="登录账号，解锁更多精彩~"
      open={loginModalOpen}
      //   onOk={closeModal}
      onCancel={resetAndCloseModal}
      footer={null}
    >
      {errMsg !== "" ?
      (<Alert
        type="error"
        showIcon
        className={classes.alertBottomofTitle}

        message={errMsg}
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
        <UsernameInput label="inside" />
        
        <div className={classes.passwordBottomofUsername}>
          <PasswordInput label="inside" />
        </div>

        <Form.Item
          noStyle

          name="remember"
          valuePropName="checked"
        >
          <Checkbox>7天内免登录</Checkbox>
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
  )
}
