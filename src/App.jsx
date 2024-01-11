import { Outlet, useLoaderData } from "react-router-dom"
import { Layout } from "antd"
const { Header, Content, Footer } = Layout

import classes from "./App.module.less"
import HeaderBar from "./compenents/HeaderBar"
import { getUserInfo } from "./requests/user"
import { useUser, userContext } from "./states/userContext"
import { loginModalContext, useLoginModal } from "./states/loginModalContext"

export async function loader() {
    let userInfo = null

    const response = await getUserInfo()
    if (response.ok) {
        userInfo = await response.json()
    }
    return { userInfo }
    /* 必须包花括号 */
}

export default function App() {
    /* 变量名必须相同 */
    const { userInfo } = useLoaderData()
    const user = useUser(userInfo)

    const loginModal = useLoginModal()

    return (
        <userContext.Provider value={user}>
            <loginModalContext.Provider value={loginModal}>
                <Layout className="layout">
                    <Header className={classes.header}>
                        <HeaderBar />
                    </Header>
                    
                    <Content className={classes.content}>
                        <Outlet />
                    </Content>

                    <Footer className={classes.footer}>
                        Ant Design ©2023 Created by Ant UED
                    </Footer>
                </Layout>
            </loginModalContext.Provider>
        </userContext.Provider>
    )
}
