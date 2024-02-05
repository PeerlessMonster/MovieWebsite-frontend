import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

import classes from "./App.module.less";
import HeaderBar from "./compenents/layout/HeaderBar";
import { getInformation } from "./requests/user";
import { useUser, UserContext } from "./states/UserContext";
import { LoginModalContext, useLoginModal } from "./states/LoginModalContext";
import { tabInfo } from "./main";

export async function loader() {
  let userInfo = null

  const response = await getInformation()
  if (response.ok) {
    userInfo = await response.json()
  }
  return { userInfo }
  /* 必须包花括号 */
}

export default function App() {
  const { userInfo } = useLoaderData()
  const user = useUser(userInfo)

  const loginModal = useLoginModal()

  return (
    <UserContext.Provider value={user}>
      <LoginModalContext.Provider value={loginModal}>
        <Layout className="layout">
          <Header className={classes.header}>
            <HeaderBar />
          </Header>

          <Content className={classes.content}>
            <Outlet />
            <ScrollRestoration
              getKey={(location) => {
                const restoreScrollMorethanBackTab = ["rank", "category"]
                return restoreScrollMorethanBackTab.some((name) => {
                  const info = tabInfo.titleToPath.get(name)
                  return info.path === location.pathname
                })
                  ? location.pathname
                  : location.key
              }}
            />
          </Content>

          <Footer className={classes.footer}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </LoginModalContext.Provider>
    </UserContext.Provider>
  )
}
