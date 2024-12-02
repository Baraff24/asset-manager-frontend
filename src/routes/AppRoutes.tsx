import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Header, PrivateRoute, Footer} from "../components";


// Lazy load of the pages
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegistrationPage"));
const CheckYourEmailPage = lazy(() => import("../pages/CheckYourEmailPage"));
const RegistrationSuccess = lazy(() => import("../pages/RegistrationSuccessPage"));
const MyProfilePage = lazy(() => import("../pages/MyProfilePage"));
const Maintenance = lazy(() => import ("../pages/MaintenancePage"))

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/check-your-email" element={<CheckYourEmailPage />} />
                    <Route path="/registration-success" element={<RegistrationSuccess />} />

                    {/* Private routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/my-profile" element={<MyProfilePage />} />
                        <Route path="/rapportiIntervento" element={<Maintenance/>} />
                    </Route>

                    {/* Route 404 */}
                    <Route path="*" element={<div>Pagina non trovata</div>} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );
};

export default AppRoutes;