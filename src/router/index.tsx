import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Spin } from 'antd'

import Layout from '../Layout/index';
const Login = lazy(() => import("@/pages/Login"));
const Error404 = lazy(() => import("@/pages/Error404"));
const Error403 = lazy(() => import("@/pages/Error403"));
const Home = lazy(() => import("@/pages/Home"));
const BannerHome = lazy(() => import("@/pages/Banner/index"));

// 通用 Suspense 组件，用于路由懒加载时显示 loading 效果
const SuspenseView = (Component: any) => (
    <Suspense fallback={<Spin fullscreen size="default" tip="页面正在加载..." />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            // 默认重定向到 home 页面
            { index: true, element: <Navigate to="/home" replace /> },
            { path: "home", element: SuspenseView(Home) },
            {
                path: "banner",
                children: [
                    {
                        path: "home",
                        element: SuspenseView(BannerHome),
                    },
                ],
            },
        ]
    },
    { path: "/login", element: SuspenseView(Login) },
    { path: "/403", element: <Error403 /> },
    { path: "/404", element: <Error404 /> },
    { path: "*", element: <Navigate to="/404" replace /> },
])