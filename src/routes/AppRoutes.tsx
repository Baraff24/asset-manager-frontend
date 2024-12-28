import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Header, PrivateRoute, Footer} from "../components";
import {ToastContainer} from "react-toastify";


// Lazy load of the pages
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegistrationPage"));
const CheckYourEmailPage = lazy(() => import("../pages/CheckYourEmailPage"));
const RegistrationSuccess = lazy(() => import("../pages/RegistrationSuccessPage"));
const DepartmentsPage = lazy(() => import("../pages/DepartmentsPage"));
const UsersPage = lazy(() => import("../pages/UsersPage"));
const DevicesPage = lazy(() => import("../pages/DevicesPages"));
const SuppliersPage = lazy(() => import("../pages/SuppliersPage"));
const SoftwarePage = lazy(() => import("../pages/SoftwarePage"));
const MyProfilePage = lazy(() => import("../pages/MyProfilePage"));
const Maintenance = lazy(() => import ("../pages/MaintenancePage"));
const ContactUs = lazy(() => import ("../pages/ContactUs"));

const AppRoutes: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Router>
                    <Header/>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/check-your-email" element={<CheckYourEmailPage/>}/>
                            <Route path="/registration-success" element={<RegistrationSuccess/>}/>
                            <Route path="/contact" element={<ContactUs/>}/>

                            {/* Private routes */}
                            <Route element={<PrivateRoute/>}>
                                <Route path="/departments" element={<DepartmentsPage />} />
                                <Route path="/users" element={<UsersPage />} />
                                <Route path="/devices" element={<DevicesPage />} />
                                <Route path="/suppliers" element={<SuppliersPage />} />
                                <Route path="/software" element={<SoftwarePage />} />
                                <Route path="/my-profile" element={<MyProfilePage/>}/>
                                <Route path="/rapportiIntervento" element={<Maintenance/>}/>
                            </Route>
                            {/* Route 404 */}
                            <Route path="*" element={<div>Pagina non trovata</div>}/>
                        </Routes>
                    </Suspense>
                </Router>
            </main>

            <Footer/>

            <ToastContainer />
        </div>
    );
};

export default AppRoutes;