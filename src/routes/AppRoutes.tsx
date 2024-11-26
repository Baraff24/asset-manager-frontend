import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, PrivateRoute } from "../components";
import Footer from "../components/Footer";

// Lazy load of the pages
const Login = lazy(() => import("../pages/Login"));
// const Home = lazy(() => import("../pages/Home"));

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />

                    {/* Private routes */}
                    <Route element={<PrivateRoute />}>
                        {/*<Route path="/" element={<Home />} />*/}
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