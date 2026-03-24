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
    return (
        <LanguageProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/register" element={<RegistrationPage />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['patient']}>
                                    <DashboardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/u/:token" element={<EmergencyDemoPage />} />
                        <Route path="/pro" element={<ProfessionalLandingPage />} />
                        <Route
                            path="/pro/dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['doctor', 'admin']}>
                                    <ProfessionalDashboardPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/b2b" element={<B2BPage />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/demo" element={<DemoHubPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </LanguageProvider>
    );
}
