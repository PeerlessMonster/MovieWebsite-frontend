import { Outlet, ScrollRestoration } from "react-router-dom";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

import classes from "./App.module.less";
import HeaderBar from "./compenents/layout/HeaderBar";
import MovieInfoProvider from "./states/MovieInfoContext";
import { UserProvider } from "./states/UserContext";
import { LoginModalProvider } from "./states/LoginModalContext";
import { tabInfo } from "./main";

export default function App() {
  return (
    <LoginModalProvider>
      <UserProvider>
        <Layout className="layout">
          <Header className={classes.header}>
            <HeaderBar />
          </Header>

          <Content className={classes.content}>
            <MovieInfoProvider />
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
      </UserProvider>
    </LoginModalProvider>
  )
}
