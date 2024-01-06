// import { useLoaderData } from "react-router-dom"
import { useContext } from "react"

// import { getUserInfo } from "../requests/user_info"
import { Descriptions } from "antd"
import { userContext } from "../states/userContext"

// export async function loader() {
//   const userInfo = await getUserInfo()
//   return { userInfo }
//   /* 必须包花括号 */
// }

export default function UserCenterTab() {
  // /* 变量名必须相同 */
  // const { userInfo } = useLoaderData()
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
