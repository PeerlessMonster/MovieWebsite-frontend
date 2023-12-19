import { useState } from "react";
import { Avatar, Dropdown, Popconfirm } from "antd";
import LoginModal from "./LoginModal";

export default function UserMenu() {
    const [logined, setLogined] = useState(false)
    const logout = () => {

        
        setLogined(true)
    }

    const [modalOpen, setModalOpen] = useState(false)

    const menuItems = [
        {
          key: "info",
          label: (
            <a target="_blank" rel="noopener noreferrer" href="./user">
              账号信息
            </a>
          ),
        },
        {
          key: "logout",
          label: logined ? (
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={logout}
              // onCancel={}
              okText="Yes"
              cancelText="No"
            >
              <a
                rel="noopener noreferrer"
                href="#"
                onClick={(e) => e.preventDefault()}>
                退出登录
              </a>
            </Popconfirm>
          ) : (<></>)
        },
      ];
    
    return logined ? (
        <Dropdown
          menu={{
            items: menuItems,
          }}
          placement="bottomRight"
          arrow
        >
          <div>
            <Avatar
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
              }}
            >
              登录
            </Avatar>
          </div>
        </Dropdown>
    ) : (
        <div>
            <Avatar
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
              }}
              onClick={() => setModalOpen(true)}
            >
              登录
            </Avatar>
            <LoginModal
                modalOpen={modalOpen}
                closeModal={() => setModalOpen(false)}
            />
          </div>
    )
}