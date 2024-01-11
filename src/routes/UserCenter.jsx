import { useContext } from "react"
import { Descriptions } from "antd"

import { userContext } from "../states/userContext"
import { pathToTitle } from "./route_config"

export async function loader() {
  document.title = pathToTitle.get("user")
  return {}
}

export default function UserCenterTab() {
  const user = useContext(userContext)
  const userInfo = user.info

  const userInfoItems = [
    {
      key: "1",
      label: "昵称",
      children: userInfo.name,
    },
    {
      key: "2",
      label: "邮箱",
      children: userInfo.email,
    }
  ]

  return (
    <div>
        <Descriptions
          title="个人信息"
          items={userInfoItems}
        />
    </div>
  )
}
