import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from "../components";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/*<Route path="/" element={<Home />} />*/}
      </Routes>
        {/*<Footer />*/}
    </Router>
  );
};

export default AppRoutes;
