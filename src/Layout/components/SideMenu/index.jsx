import React, { useState, useEffect, useCallback } from "react";
import { Layout, Menu, theme } from "antd";
import {
    UserOutlined,
    VideoCameraOutlined,
    DesktopOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./index.module.less";

const { Sider } = Layout;

const SideMenu = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(["home"]);
    const [openKeys, setOpenKeys] = useState([]);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    // 监听路径变化，更新菜单选中项
    useEffect(() => {
        const key = pathname.split("/")[1] || "";
        setSelectedKeys([key]);
    }, [pathname]);

    // 处理菜单点击
    const onClickMenu = useCallback(({ key }) => {
        console.log(key, '-');
        navigate(`/${key}`);
    }, [navigate]);

    // 处理菜单展开/折叠
    const onOpenChange = useCallback((keys) => {
        setOpenKeys(keys);
    }, []);

    const menuItems = [
        {
            label: "工作台",
            icon: <DesktopOutlined />,
            key: "home",
        },
        {
            label: "关于",
            icon: <DesktopOutlined />,
            key: "about",
        },
        {
            label: "dashboard",
            icon: <DesktopOutlined />,
            key: "dashboard",
        },
        {
            label: "reports",
            icon: <DesktopOutlined />,
            key: "reports",
        },
        {
            label: "系统管理",
            icon: <SettingOutlined />,
            key: "system",
            children: [
                {
                    label: "用户管理",
                    icon: <UserOutlined />,
                    key: "system/user",
                },
                {
                    label: "角色管理",
                    icon: <VideoCameraOutlined />,
                    key: "system/roles",
                },
            ],
        },
    ];

    return (
        <Sider className={style.sideMenu} collapsible collapsed={collapsed} trigger={null}>
            <div className={style.sideBox}>
                {/* Logo 区域 */}
                <div>
                    <div className={style.logo}>
                        <img
                            src="https://image.woshipm.com/wp-files/2021/12/ZtAFn75YpagtIoK9dE6h.jpg"
                            alt="logo"
                        />
                    </div>

                    {/* 侧边栏菜单 */}
                    <Menu
                        mode="inline"
                        items={menuItems}
                        selectedKeys={selectedKeys}
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        onClick={onClickMenu}
                    />
                </div>
                {/* 折叠/展开按钮 */}
                <div
                    onClick={() => {
                        setCollapsed(!collapsed)
                    }}
                    className={style.footer}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>

            </div>
        </Sider>
    );
};

SideMenu.displayName = "SideMenu";
export default SideMenu;
