import { useState } from "react";
import { Alert, Button, Form, Modal, Result, Space, Steps } from "antd";
const { useWatch } = Form;

import classes from "./ChangePasswordModal.module.less";
import PasswordInput from "../item/PasswordInput";
import PasswordInputWithConfirm from "../item/PasswordInputWithConfirm";
import { changePassword, checkPassword } from "../../../requests/user";

export default function ChangePasswordModal({ modalOpen, closeModal }) {
  const [currentStep, setCurrentStep] = useState(0);

  const [form] = Form.useForm()
  const formData = useWatch([], form)
  const submitVerify = async () => {
    const response = await checkPassword(formData)
    if (response.ok) {
      /* name属性都为password，渲染下一个表单会有残留 */
      form.resetFields()
      setErrMsg("")
      setCurrentStep(currentStep + 1)

    } else {
      if (response.status === 401) {
        const data = await response.json()
        setErrMsg(data.message)
      }
    }
  }
  const submitAlter = async () => {
    const response = await changePassword(formData)
    if (response.ok) {
      setCurrentStep(currentStep + 1)
    
    } else {
      if (response.status === 400) {
        const data = await response.json()
        setErrMsg(data.message)
      }
    }
  }

  const [errMsg, setErrMsg] = useState("")
  const resetAndCloseForm = () => {
    closeModal()
    setErrMsg("")
    if (currentStep >= 1) {
      form.resetFields()
    }
    form.resetFields()
    setCurrentStep(0)
  }

  return (
    <Modal
      centered
      width={500}
      keyboard={false}
      maskClosable={false}
      footer={null}

      open={modalOpen}
      onCancel={resetAndCloseForm}
    >
      <Steps
        progressDot
        className={classes.stepbarBottomofTitle}
        current={currentStep}
        items={[
          {
            title: "验证身份"
          },
          {
            title: "修改密码"
          },
          {
            title: "提交更新"
          }
        ]}
      />
      {currentStep === 0 ? (
        <Form
          name="verify"
          form={form}
          onFinish={submitVerify}
        >
          <div className={classes.formBottomofStepbar}>
            <h3 className={classes.prompt}>正在进行敏感操作，需要先输入密码</h3>
            <PasswordInput label="inside" />

            {errMsg !== "" ?
            (<Alert
              type="error"
              showIcon
              className={classes.alertBottomofInput}

              message={errMsg}
            />) : null}
          </div>

          <div className={classes.buttonBottomofInput}>
            <Button
              type="primary"
              htmlType="submit"
            >
              确认
            </Button>
          </div>
        </Form>
      ) : currentStep === 1 ? (
        <Form
          name="alter"
          form={form}
          onFinish={submitAlter}
        >
          <div className={classes.formBottomofStepbar}>
            <h3 className={classes.prompt}>设置新的密码：</h3>
            <PasswordInputWithConfirm label="inside" />

            {errMsg !== "" ?
            (<Alert
              type="error"
              showIcon
              className={classes.alertBottomofInput}

              message={errMsg}
            />) : null}
          </div>

          <div className={classes.buttonBottomofInput}>
            <Space>
              <Button htmlType="reset">重置</Button>
              <Button
                type="primary"
                htmlType="submit"
              >
                确认
              </Button>
            </Space>
          </div>
        </Form>
      ) : currentStep === 2 ? (
        <Result
          className={classes.resultBottomofStepbar}
          status="success"
          title="修改成功"
          extra={[
            <Button
              type="primary"
              
              key="close"
              onClick={resetAndCloseForm}
            >
              关闭
            </Button>
          ]}
        />
      ) : null}
    </Modal>
  )
}
