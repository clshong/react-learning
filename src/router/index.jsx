import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Spin } from "antd";
import RequireAuth from "./promises"; // 路由守卫组件
import Layout from "@/Layout";

// 组件懒加载
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const User = lazy(() => import("@/pages/User"));
const Login = lazy(() => import("@/pages/Login"));
const Error404 = lazy(() => import("@/pages/Error404"));
const Error403 = lazy(() => import("@/pages/Error403"));

// 通用 Suspense 组件，用于路由懒加载时显示 loading 效果
const SuspenseView = (Component) => (
    <Suspense fallback={<Spin fullscreen size="default" tip="页面正在加载..." />}>
        <Component />
    </Suspense>
);

// 示例：动态路由（例如 dashboard 和 reports）
const dynamicRoutes = [
    {
        path: "dashboard",
        element: <div>Dashboard 页面（动态加载）</div>,
        requiredPermission: "view_dashboard",
    },
    {
        path: "reports",
        element: <div>Reports 页面（动态加载）</div>,
        requiredPermission: "admin",
    },
];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            // 默认重定向到 home 页面
            { index: true, element: <Navigate to="/home" replace /> },
            { path: "home", element: SuspenseView(Home) },
            { path: "about", element: SuspenseView(About) },
            {
                path: "system",
                children: [
                    {
                        path: "user",
                        element: (
                            <RequireAuth requiredPermission="view_user">
                                {SuspenseView(User)}
                            </RequireAuth>
                        ),
                    },
                ],
            },
            // 动态加载的路由示例
            ...dynamicRoutes.map((route) => ({
                path: route.path,
                element: (
                    <RequireAuth requiredPermission={route.requiredPermission}>
                        {route.element}
                    </RequireAuth>
                ),
            })),
        ],
    },
    { path: "/login", element: SuspenseView(Login) },
    { path: "/403", element: <Error403 /> },
    { path: "/404", element: <Error404 /> },
    { path: "*", element: <Navigate to="/404" replace /> },
]);
