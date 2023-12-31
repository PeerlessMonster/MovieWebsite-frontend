import { Outlet } from "react-router-dom"
import { Layout } from "antd"
const { Header, Content, Footer } = Layout

import HeaderBar from "./compenents/HeaderBar"

export default function App() {
    return (
        <Layout className="layout">
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <HeaderBar />
            </Header>
            
            <Content id="content">
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
