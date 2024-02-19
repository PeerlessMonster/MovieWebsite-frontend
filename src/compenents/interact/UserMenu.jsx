import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Popconfirm, Space, message } from "antd";

import classes from "./UserMenu.module.less"
import LoginModal from "../form/list/LoginModal";
import { tryLogout } from "../../requests/user";
import { UserContext } from "../../states/UserContext";
import { LoginModalContext } from "../../states/LoginModalContext";
import { FrownTwoTone, SmileTwoTone } from "@ant-design/icons";
import { tabInfo } from "../../main";
import LoginExpireNotification from "./LoginExpireNotification";

class Tab {
  static #_noNeedLoginTab = ["rank", "category", "user"]

  static needLogin(path) {
    return this.#_noNeedLoginTab.some((name) => {
      const info = tabInfo.titleToPath.get(name)
      return info.path === path
    })
  }
}

export default function UserMenu() {
  const navigate = useNavigate()
  const { pathname: path } = useLocation()

  const loginModal = useContext(LoginModalContext)
  const user = useContext(UserContext)
  const userInfo = user.info

  const logout = async () => {
    const response = await tryLogout()
    if (response.ok) {
      const redirect = !Tab.needLogin(path)
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

  const [logouted, setLogouted] = useState(false)
  useEffect(() => {
    if (userInfo) {
      const expireTime = userInfo.sessionExpire
      const timer = setTimeout((path) => {
        LoginExpireNotification()

        const nowCleanUser = Tab.needLogin(path)
        if (!nowCleanUser) {
          /* 登录过期时，还在需要登录才能访问的页面，先设登出状态，稍后清除用户信息 */
          setLogouted(true)
        } else {
          /* 登录过期时，不在需要登录才能访问的页面，可以立即清除用户信息 */
          user.updateInfo(null)
        }
      }, expireTime)
      return () => clearTimeout(timer)
    }
  }, [userInfo])
  /* 离开当前页面，才清除用户信息 */
  useEffect(() => {
    if (logouted) {
      user.updateInfo(null)

      setLogouted(false)
    }
  }, [path])

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
                // target="_blank"
      
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
