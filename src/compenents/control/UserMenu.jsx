import { useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, Popconfirm, Space, message } from "antd";

import classes from "./UserMenu.module.less"
import LoginModal from "../form/list/LoginModal";
import { tryLogout } from "../../requests/user";
import { userContext } from "../../states/userContext";
import { loginModalContext } from "../../states/loginModalContext";
import { pathToTitle } from "../../routes/route_config";
import { FrownTwoTone, SmileTwoTone } from "@ant-design/icons";

export default function UserMenu() {
  const user = useContext(userContext)
  const userInfo = user.info

  const logout = async () => {
    const response = await tryLogout()
    if (response.ok) {
      message.success("退出成功")
      // user.updateInfo(null)

      location.href = "/"
    }
  }

  const loginModal = useContext(loginModalContext)

  const menuItems = [
    {
      key: "info",
      label: (
        <Link
          rel="noopener noreferrer"

          to={`/user`}
        >
          <Space>
            <SmileTwoTone />
            {pathToTitle.get("user")}
          </Space>
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <Popconfirm
          placement="topRight"

          title=""
          description="你确定要退出登录吗？"
          onConfirm={logout}
          // onCancel={}
          okText="确定"
          cancelText="取消"
        >
          <a
            rel="noopener noreferrer"

            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <Space>
              <FrownTwoTone />
              退出登录
            </Space>
          </a>
        </Popconfirm>
      ),
    },
  ]
  
  return userInfo ? (
    <Dropdown
      placement="bottomRight"
      arrow

      menu={{
        items: menuItems,
      }}
    >
      <div>
        <Avatar
          size="large"
          className={classes.avatar}
        >{
          ((userInfo.name != null && userInfo.name != "") ? userInfo.name : userInfo.email)
            .substring(0, 4)
        }</Avatar>
      </div>
    </Dropdown>
  ) : (
    <div>
      <Avatar
        size="large"
        className={classes.avatar}

        onClick={loginModal.open}
      >
        登录
      </Avatar>
      <LoginModal
        loginModalOpen={loginModal.opened}
        closeLoginModal={loginModal.close}
        // switchToLogined={() => setIsLogined(true)}
      />
    </div>
  )
}
