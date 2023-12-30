import { useEffect, useState } from "react";
import { Avatar, Dropdown, Popconfirm, message } from "antd";

import LoginModal from "./LoginModal";

export default function UserMenu() {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const startFetching = async () => {
      const response = await fetch("http://localhost:8080/user", {
        method: "GET",
        credentials: "include"
      })

      if (response.ok) {
        const data = await response.json()
        setUserInfo(data)
      }
    }

    let ignore = false
    startFetching()
    return () => {
      ignore = true
    }
  }, [])

  const logout = async () => {
    const response = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include"
    })

    if (response.ok) {
      message.success("退出成功")
    }
    setUserInfo(null)
  };

  const [modalOpen, setModalOpen] = useState(false);

  const menuItems = [
    {
      key: "info",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="./user">
          个人中心
        </a>
      ),
    },
    {
      key: "logout",
      label: userInfo != null ? (
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
            退出登录
          </a>
        </Popconfirm>
      ) : null,
    },
  ];

  const avatarStyle = {
    backgroundColor: "#9cacc8",
    color: "#476ba8",
    fontWeight: "bold"
  };

  return userInfo != null ? (
    <Dropdown
      menu={{
        items: menuItems,
      }}
      placement="bottomRight"
      arrow
    >
      <div>
        <Avatar size="large" style={avatarStyle}>{
          (userInfo.name != "" ? userInfo.name : userInfo.email)
            .substring(0, 4)
        }</Avatar>
      </div>
    </Dropdown>
  ) : (
    <div>
      <Avatar
        size="large"
        style={avatarStyle}
        onClick={() => setModalOpen(true)}
      >
        登录
      </Avatar>
      <LoginModal
        loginModalOpen={modalOpen}
        closeLoginModal={() => setModalOpen(false)}
        setUserInfo={setUserInfo}
      />
    </div>
  );
}
