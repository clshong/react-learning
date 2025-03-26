import { FC } from "react"
import { Layout, Button, Switch, Dropdown, Space } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { ThemeProps } from '../../types'
import { useLayout } from '../../../store/index'
import { AppBreadcrumb } from '../index'
import style from './index.module.less'
import { DownOutlined } from '@ant-design/icons'

const NavHeader: FC<ThemeProps> = () => {
    const { Header } = Layout
    const { collapsed, changeCollapsed } = useLayout()
    const menuItems = [
        {
            label: `邮箱：Charles@x.cn`,
            key: '0',
        },
        {
            label: '退出登录',
            key: '1',
        },
    ]
    return (
        <Header className={style.header}>
            <div style={{ display: 'flex', alignItems: "center" }}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => changeCollapsed()}
                    style={{
                        fontSize: '16px',
                        width: 40,
                        height: 64,
                    }}
                />
                <AppBreadcrumb />
            </div>
            <div>
                <Switch
                    checkedChildren='默认'
                    unCheckedChildren='暗黑'
                    defaultChecked
                    onChange={(checked) => {
                        console.log(`switch to ${checked ? 'dark' : 'light'}`)
                    }}
                />
                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                    <a className={style.dropMenu} onClick={(e) => e.preventDefault()}>
                        <Space>
                            Charles
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Header >
    )
}

export default NavHeader