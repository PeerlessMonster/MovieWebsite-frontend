import { useState, useEffect } from "react";
import { Alert, Button, Form, Input, Modal, message } from "antd";
const { useWatch } = Form

import classes from "./RegisterModal.module.css"
import { postRegister } from "../requests/user";

export default function RegisterModal({ modalOpen, closeModal }) {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const resetAndCloseForm = () => {
    closeModal()
    setErrorMessage("")
    form.resetFields()
  }

  const formData = useWatch([], form)
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        },
      );
  }, [formData])

  const submitRegister = async () => {
    const response = await postRegister(formData)
    if (response.ok) {
      resetAndCloseForm()
      message.success("注册成功")

    } else {
      const data = await response.json()
      if (response.status == 401) {
        setErrorMessage(data.message)
        setSubmittable(false)
      }
    }
  }

  return (
    <Modal
      centered
      className={classes.modalWhole}
    
      title=""
      open={modalOpen}
      //   onOk={closeModal}
      onCancel={resetAndCloseForm}
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
        layout="vertical"
        className={classes.formBottomofTitle}

        name="register"
        form={form}
        onFinish={submitRegister}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="昵称"
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              type: "email",
              message: "邮箱不符合格式！"
            },
            {
              required: true,
              message: "请输入邮箱！",
            },
          ]}
        >
          <Input />
        </Form.Item>

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
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="password2"
          rules={[
            {
              required: true,
              message: "请再次输入密码！"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致！"));
              },
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className={classes.buttonsBottomofInputs}>
          <Button
            className={classes.resetButton}
            
            htmlType="button"
            onClick={() => form.resetFields()}>
            重置
          </Button>

          <Button
            type="primary"
            className={classes.submitButtonEndofReset}

            htmlType="submit"
            disabled={!submittable}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
