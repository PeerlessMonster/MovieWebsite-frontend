import { Outlet } from "react-router-dom"
import { Layout } from "antd"
import HeaderBar from "./compenents/HeaderBar"
const { Header, Content, Footer } = Layout

export default function App() {
    

    return (
        <Layout className="layout">
            <Header
                style={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <HeaderBar />
            </Header>
            
            <Content>
                <Outlet />
            </Content>

            <Footer
                style={{
                    textAlign: "center"
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    )
}
