import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './customer/views/pages/HomePage';
import AboutUsPage from './customer/views/pages/AboutUsPage';
import ServicesPage from './customer/views/pages/ServicesPage';
import OurPodPage from './customer/views/pages/OurPodPage';
import ContactUsPage from './customer/views/pages/ContactUsPage';
import FAQPage from './customer/views/pages/FAQPage';
import CafePage from './customer/views/pages/CafePage';
import CafeRoutes from './cafe/CafeRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/our-pod" element={<OurPodPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/cafe" element={<CafePage />} />
        <Route path="/cafe-portal/*" element={<CafeRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;