import { useState, useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
const { useWatch } = Form

export default function RegisterModal({ modalOpen, closeModal }) {
  const [form] = Form.useForm();
  const resetAndCloseForm = () => {
    closeModal()
    form.resetFields()
  }

  const formData = useWatch([], form)

  const [submittable, setSubmittable] = useState(false)
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

  const submitRegister = (values) => {
    console.log(values);
  }

  return (
    <Modal
      style={{
        maxWidth: "37em",
        textAlign: "center"
      }}
      title=""
      centered
      open={modalOpen}
      //   onOk={closeModal}
      onCancel={resetAndCloseForm}
      footer={null}
    >
      <Form
        name="register"
        style={{
          marginTop: "3vh",
          maxWidth: "33em",
          textAlign: "start"
        }}
        layout="vertical"
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

        <Form.Item
          style={{
            marginTop: "4vh",
            textAlign: "center"
          }}
        >
          <Button
            style={{
              width: "47%",
            }}
            htmlType="button"
            onClick={() => form.resetFields()}>
            重置
          </Button>

          <Button
            style={{
              marginLeft: "5%",
              width: "47%",
            }}
            type="primary"
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
