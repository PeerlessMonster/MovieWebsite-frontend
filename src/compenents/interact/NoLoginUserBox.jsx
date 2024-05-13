import { Button, Empty } from "antd";

import userProfileImg from "../../assets/user-profile-monochromatic.svg";
import classes from "./NoLoginUserBox.module.less";
import { useContext } from "react";
import { LoginModalContext } from "../../states/LoginModalContext";

export default function NoLoginUserBox() {
  const loginModal = useContext(LoginModalContext)
  const openLoginModal = loginModal.open

  return (
    <Empty
      className={classes.boxWhole}
      image={userProfileImg}
      imageStyle={{
        height: 200
      }}
      description="登录账号即可查看个人中心哦"
    >
      <Button
        type="primary"
        onClick={openLoginModal}
      >
        登录
      </Button>
    </Empty>
  )
}
