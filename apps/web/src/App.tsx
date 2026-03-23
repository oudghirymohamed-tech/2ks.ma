import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AdminPage } from './pages/AdminPage';
import { B2BPage } from './pages/B2BPage';
import { DashboardPage } from './pages/DashboardPage';
import { DemoHubPage } from './pages/DemoHubPage';
import { EmergencyDemoPage } from './pages/EmergencyDemoPage';
import { LandingPage } from './pages/LandingPage';
import { ProfessionalDashboardPage } from './pages/ProfessionalDashboardPage';
import { ProfessionalLandingPage } from './pages/ProfessionalLandingPage';
import { RegistrationPage } from './pages/RegistrationPage';

export default function App() {
    return (
        <LanguageProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/u/:token" element={<EmergencyDemoPage />} />
                    <Route path="/pro" element={<ProfessionalLandingPage />} />
                    <Route path="/pro/dashboard" element={<ProfessionalDashboardPage />} />
                    <Route path="/b2b" element={<B2BPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/demo" element={<DemoHubPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </LanguageProvider>
    );
}
