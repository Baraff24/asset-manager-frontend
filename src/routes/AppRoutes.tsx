import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Header, PrivateRoute} from "../components";
import Footer from "../components/Footer";
// import PrivateRoute from "../components/PrivateRoute";

// Lazy load delle pagine
// const Home = lazy(() => import("../pages/Home"));
// const Login = lazy(() => import("../pages/Login"));

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public route */}
          {/*<Route path="/login" element={<Login />} />*/}

          {/* Protected route */}
          <Route element={<PrivateRoute />}>
            {/*<Route path="/" element={<Home />} />*/}
          </Route>
        </Routes>
      </Suspense>
      <Footer/>
    </Router>
  );
};

export default AppRoutes;
