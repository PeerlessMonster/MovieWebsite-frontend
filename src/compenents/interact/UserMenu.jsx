import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Popconfirm, Space, message, notification } from "antd";

import classes from "./UserMenu.module.less"
import LoginModal from "../form/list/LoginModal";
import { tryLogout } from "../../requests/user";
import { UserContext } from "../../states/UserContext";
import { LoginModalContext } from "../../states/LoginModalContext";
import { FrownTwoTone, SmileTwoTone } from "@ant-design/icons";
import { tabInfo } from "../../main";
import LoginExpireNotification from "./LoginExpireNotification";

export default function UserMenu() {
  const location = useLocation()
  const navigate = useNavigate()

  const loginModal = useContext(LoginModalContext)
  const user = useContext(UserContext)
  const userInfo = user.info

  const logout = async () => {
    const response = await tryLogout()
    if (response.ok) {
      const path = location.pathname

      const noNeedLoginTab = ["rank", "category", "user"]
      const redirect = !noNeedLoginTab.some((name) => {
        const info = tabInfo.titleToPath.get(name)
        return info.path === path
      })
      if (redirect) {
        const indexTab = tabInfo.INDEX
        const indexTabInfo = tabInfo.titleToPath.get(indexTab)
        
        message.info("已退出，正在跳转首页……")
        navigate(indexTabInfo.path)
        /* 确保先跳转再清除登录的用户信息 */
        setTimeout(() => {
          user.updateInfo(null)
        }, 0.5*1000)
      } else {
        user.updateInfo(null)
        message.success("退出成功")
      }
    }
  }

  useEffect(() => {
    if (userInfo) {
      const expireTime = userInfo.sessionExpire

      const timer = setTimeout(LoginExpireNotification(), expireTime)
      return () => clearTimeout(timer)
    }
  }, [userInfo])

  const userTabInfo = tabInfo.titleToPath.get("user")
  return userInfo ? (
    <Dropdown
      placement="bottomRight"
      arrow

      menu={{
        items: [
          {
            key: "info",
            label: (
              <Link
                rel="noopener noreferrer"
      
                to={userTabInfo.path}
              >
                <Space>
                  <SmileTwoTone />
                  {userTabInfo.title}
                </Space>
              </Link>
            )
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
            )
          }
        ]
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
      />
    </div>
  )
}
