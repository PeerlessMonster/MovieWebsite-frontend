import { useState } from "react";
import { Alert, Button, Form, Modal, message } from "antd";
const { useWatch } = Form

import classes from "./RegisterModal.module.less"
import { postRegister } from "../../../requests/user";
import EmailInput from "../item/EmailInput";
import NicknameInput from "../item/NicknameInput";
import PasswordInputWithConfirm from "../item/PasswordInputWithConfirm";
import useFormValidate from "../../../states/useFormValidate";

export default function RegisterModal({ modalOpen, closeModal }) {
  const [form] = Form.useForm()
  const formData = useWatch([], form)
  const formValidate = useFormValidate(form, formData)

  const [errorMsg, setErrorMsg] = useState("")
  const resetAndCloseForm = () => {
    closeModal()
    setErrorMsg("")
    form.resetFields()
  }

  const submitRegister = async () => {
    const response = await postRegister(formData)
    if (response.ok) {
      resetAndCloseForm()
      message.success("注册成功")

    } else {
      const data = await response.json()
      if (response.status === 400) {
        setErrorMsg(data.message)
        formValidate.disableSubmit()
      }
    }
  }

  return (
    <Modal
      centered
      width={550}
    
      title=""
      open={modalOpen}
      //   onOk={closeModal}
      onCancel={resetAndCloseForm}
      footer={null}
    >
      {errorMsg !== "" ?
      (<Alert
        type="error"
        showIcon
        className={classes.alertBottomofTitle}

        message={errorMsg}
      />) : null}

      <Form
        layout="vertical"
        className={classes.formBottomofTitle}

        name="register"
        form={form}
        onFinish={submitRegister}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <NicknameInput />
        
        <EmailInput />

        <PasswordInputWithConfirm />

        <Form.Item className={classes.buttonsBottomofInputs}>
          <Button
            className={classes.resetButton}
            
            // htmlType="reset"
            onClick={() => form.resetFields()}>
            重置
          </Button>

          <Button
            type="primary"
            className={classes.submitButtonEndofReset}

            htmlType="submit"
            disabled={formValidate.submitDisabled}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
