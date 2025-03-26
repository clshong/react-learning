import { FC } from "react"
import { Layout } from 'antd'
import { ThemeProps } from '../../types'
import { Outlet } from 'react-router-dom'
const { Content } = Layout
const AppMian: FC<ThemeProps> = ({ colorBgContainer, borderRadiusLG }) => {

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            <Outlet />
        </Content>
    )
}

export default AppMian