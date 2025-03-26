import React, { FC, useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { items } from '../../../router/menu';


interface MenuItem {
    key: string;
    label: React.ReactNode;
    children?: MenuItem[];
}

// 递归查找目标路由对应的菜单路径链
const findMenuPath = (menuItems: MenuItem[], target: string): MenuItem[] => {
    for (const item of menuItems) {
        if (item.key === target) {
            return [item];
        }
        if (item.children) {
            const childPath = findMenuPath(item.children, target);
            if (childPath.length) {
                return [item, ...childPath];
            }
        }
    }
    return [];
};

const AppBreadcrumb: FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // 根据路由查找菜单路径链，保证当菜单点击更新路由时，面包屑也会更新
    const menuPath = useMemo(() => {
        return findMenuPath(items as MenuItem[], currentPath);
    }, [currentPath]);

    // 构造面包屑项，每项均可点击跳转
    const breadcrumbItems = menuPath.map((item) => ({
        title: <Link to={item.key}>{item.label}</Link>,
    }));

    return (
        <Breadcrumb style={{ padding: '0 20px' }} items={breadcrumbItems} />
    );
};

export default AppBreadcrumb;
