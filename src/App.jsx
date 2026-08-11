import './App.css'
import InteractiveMap from './modules/3-map/components/InteractiveMap'

function App() {
  return <InteractiveMap />
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ResponsiveWrapper from './modules/7-responsive/ResponsiveWrapper';
import AuthProvider from './modules/6-user/AuthContext';
import OrdersProvider from './context/OrdersContext';
import FeedbackProvider from './context/FeedbackContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './modules/1-home/HomePage';
import ListingPage from './modules/2-listing/ListingPage';
import VendorDetailsPage from './modules/4-vendor/VendorDetailsPage';
import InteractiveMap from './modules/3-map/components/InteractiveMap';
import LoginPage from './modules/6-user/LoginPage';
import RegisterPage from './modules/6-user/RegisterPage';
import OrdersPage from './pages/OrdersPage';

import './App.css';
import './styles/responsive.css';

export default function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <FeedbackProvider>
          <ResponsiveWrapper>
            <BrowserRouter>
              <Navbar />

              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/listing" element={<ListingPage />} />
                <Route
                  path="/vendor/:vendorId"
                  element={
                    <ProtectedRoute>
                      <VendorDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/map" element={<InteractiveMap />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>

              <Footer />
            </BrowserRouter>
          </ResponsiveWrapper>
        </FeedbackProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}
