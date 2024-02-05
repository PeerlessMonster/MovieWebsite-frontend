import { useContext, useState } from "react";
import { Button, Modal, QRCode, Result, Space } from "antd";

import classes from "./PayModal.module.less";
import logoImg from "../../assets/video_icon.png";
import { upgradeVip } from "../../requests/user";
import { UserContext } from "../../states/UserContext";

export default function PayModal({ modalOpen, closeModal }) {
  const [submitted, setSubmitted] = useState(false)

  const user = useContext(UserContext)

  const checkPay = async () => {
    const response = await upgradeVip()
    if (response.ok) {
      const userInfo = user.info
      /* 深复制 */
      const userInfoCopy = JSON.parse(JSON.stringify(userInfo))
      userInfoCopy.vip = userInfoCopy.vip + 1
      user.updateInfo(userInfoCopy)

      setSubmitted(true)
    }
  }

  return (
    <Modal
      centered
      width={450}
      footer={null}

      title="手机支付"
      open={modalOpen}
      onCancel={closeModal}
    >
      {!submitted ? (
        <>
          <QRCode
            className={classes.qrcodeBottomofTitle}
            size={400}
            iconSize={100}
            icon={logoImg}
            value="https://github.com/PeerlessMonster/MovieWebsite-frontend"
            type="svg"
          />
          <div className={classes.buttonBottomofQrcode}>
            <Space size="middle">
              <Button onClick={closeModal}>我再想想</Button>
              <Button
                type="primary"

                onClick={checkPay}
              >
                我已支付
              </Button>
            </Space>
          </div>
        </>
      ) : (
        <Result
          status="success"
          title="支付成功 !"
          extra={[
            <Button
              type="primary"
              
              key="close"
              onClick={closeModal}
            >
              开始享受会员权益
            </Button>
          ]}
        />
      )}
    </Modal>
  )
}
