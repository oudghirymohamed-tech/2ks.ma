import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AdminPage } from './pages/AdminPage';
import { B2BPage } from './pages/B2BPage';
import { DashboardPage } from './pages/DashboardPage';
import { DemoHubPage } from './pages/DemoHubPage';
import { EmergencyDemoPage } from './pages/EmergencyDemoPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ProfessionalDashboardPage } from './pages/ProfessionalDashboardPage';
import { ProfessionalLandingPage } from './pages/ProfessionalLandingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { RegistrationPage } from './pages/RegistrationPage';
export default function App() {
    return (_jsx(LanguageProvider, { children: _jsx(AuthProvider, { children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(CheckoutPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegistrationPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { allowedRoles: ['patient'], children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/u/:token", element: _jsx(EmergencyDemoPage, {}) }), _jsx(Route, { path: "/pro", element: _jsx(ProfessionalLandingPage, {}) }), _jsx(Route, { path: "/pro/dashboard", element: _jsx(ProtectedRoute, { allowedRoles: ['doctor', 'admin'], children: _jsx(ProfessionalDashboardPage, {}) }) }), _jsx(Route, { path: "/b2b", element: _jsx(B2BPage, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { allowedRoles: ['admin'], children: _jsx(AdminPage, {}) }) }), _jsx(Route, { path: "/demo", element: _jsx(DemoHubPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }) }) }));
}
