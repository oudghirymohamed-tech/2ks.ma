import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export function ProtectedRoute({ children, allowedRoles }) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return _jsx("div", { className: "px-6 py-16 text-navy", children: "Loading..." });
    }
    if (!isAuthenticated || !user) {
        return _jsx(Navigate, { to: "/login", replace: true, state: { from: location.pathname } });
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
