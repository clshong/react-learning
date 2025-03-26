import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = (children: any, requiredPermission: string) => {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token');
    // 模拟获取当前用户权限，实际场景下可从 context、redux 或 API 中获取
    const userPermissions = ['view_home', 'view_system', 'view_user', 'admin'];

    if (!isAuthenticated) {
        // 没有 token，重定向到登录页
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredPermission && !userPermissions.includes(requiredPermission)) {
        // 有 token 但权限不足，重定向到 403 页面
        return <Navigate to="/403" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
