import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Header, PrivateRoute} from "../components";
import Footer from "../components/Footer";


// Lazy load of the pages
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegistrationPage"));
const RegistrationSuccess = lazy(() => import("../pages/RegistrationSuccessPage"));
const Maintenance = lazy(() => import ("../pages/MaintenancePage"))
// const Home = lazy(() => import("../pages/Home"));

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/registration-success" element={<RegistrationSuccess />} />

                    {/* Private routes */}
                    <Route element={<PrivateRoute />}>
                        {/*<Route path="/" element={<Home />} />*/}
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