import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AboutUsPage } from './pages/AboutUsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AdminPage } from './pages/AdminPage';
import { B2BPage } from './pages/B2BPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { DashboardPage } from './pages/DashboardPage';
import { DemoHubPage } from './pages/DemoHubPage';
import { EmergencyDemoPage } from './pages/EmergencyDemoPage';
import { FaqPage } from './pages/FaqPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { NfcCardDemoPage } from './pages/NfcCardDemoPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ProfessionalDashboardPage } from './pages/ProfessionalDashboardPage';
import { ProfessionalLandingPage } from './pages/ProfessionalLandingPage';
import { ProfessionalLoginPage } from './pages/ProfessionalLoginPage';
import { ProfessionalRegisterPage } from './pages/ProfessionalRegisterPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { ServicesPage } from './pages/ServicesPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/how-it-works" element={<HowItWorksPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactUsPage />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
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
                        <Route path="/card/:token" element={<NfcCardDemoPage />} />
                        <Route path="/u/:token" element={<EmergencyDemoPage />} />
                        <Route path="/pro" element={<ProfessionalLandingPage />} />
                        <Route path="/pro/register" element={<ProfessionalRegisterPage />} />
                        <Route path="/pro/login" element={<ProfessionalLoginPage />} />
                        <Route
                            path="/pro/dashboard"
                            element={
                                <ProtectedRoute allowedRoles={['doctor', 'pharmacist', 'admin']}>
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
