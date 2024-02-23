import { useContext, useState } from "react";
import { LockOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Popover, Space, message } from "antd";
const { useWatch } = Form;

import classes from "./UpdateUserBox.module.less";
import EmailInput from "../item/EmailInput";
import NicknameInput from "../item/NicknameInput";
import { changeInformation } from "../../../requests/user";
import { UserContext } from "../../../states/UserContext";
import useFormValidate from "../../../hooks/useFormValidate";
import ChangePasswordModal from "./ChangePasswordModal";

export default function UpdateUserBox({ data }) {
  const { name, email } = data

  const [form] = Form.useForm()
  const formData = useWatch([], form)
  const formValidate = useFormValidate(form, formData)

  const [errorMsg, setErrorMsg] = useState("")
  const reset = () => {
    setErrorMsg("")
    form.resetFields()
  }

  const user = useContext(UserContext)
  const submitSave = async () => {
    if (formData.name !== name || formData.email !== email) {
      const response = await changeInformation(formData)
      if (response.ok) {
        const userInfo = user.info
        /* 深复制 */
        const userInfoCopy = JSON.parse(JSON.stringify(userInfo))
        userInfoCopy.name = formData.name
        userInfoCopy.email = formData.email
        user.updateInfo(userInfoCopy)

        setErrorMsg("")
        message.success("修改成功")
      } else {
        const data = await response.json()
        if (response.status === 400) {
          setErrorMsg(data.message)
          formValidate.disableSubmit()
        }
      }
    }
  }

  const [modalOpen, setModalOpen] = useState(false)

  const size = "large"
  return (
    <>
      {errorMsg !== "" ? (
        <Alert
          type="error"
          showIcon
          className={classes.alertBottomofTitle}
          message={errorMsg}
        />
      ) : null}

      <Form
        className={classes.formWhole}
        layout="vertical"

        form={form}
        initialValues={{
          name: name,
          email: email,
          password: "",
        }}
        onFinish={submitSave}
      >
        <div className="input-single">
          <NicknameInput
            size={size}
            label="outside"
          />
        </div>

        <div className="input-single">
          <EmailInput
            size={size}
            label="outside"
          />
        </div>

        <ChangePasswordModal
          modalOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
        />
        <Popover
          placement="bottomLeft"
          content={
            <Button
              className={classes.changepasswordbutton}
              type="primary"
              onClick={() => setModalOpen(true)}
            >
              修改密码
            </Button>
          }
        >
          {/* 再套一层div，解决
            Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of DomWrapper4 which is inside StrictMode. Instead, add a ref directly to the element you want to reference. */}
          <div className="input-single">
            <Form.Item
              label="密码"
              name="password"
            >
              <Input.Password
                size={size}
                prefix={<LockOutlined />}
                disabled
              />
            </Form.Item>
          </div>
        </Popover>

        <div className={classes.buttonboxBottomofInput}>
          <Space size="large">
            <Button
              type="primary"
              ghost
              icon={<UndoOutlined />}
              onClick={reset}
            >
              重置
            </Button>

            <Button
              type="primary"
              icon={<SaveOutlined />}
              htmlType="submit"
              disabled={formValidate.submitDisabled}
            >
              更新
            </Button>
          </Space>
        </div>
      </Form>
    </>
  )
}