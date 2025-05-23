import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import UploadExcel from './pages/UploadExcel';
import ChartHistory from './pages/ChartHistory';
import ChartPage from './pages/ChartPage'; // ✅ NEW: Import ChartPage
import SalesInsights from './pages/SalesInsights';
import UploadHistory from './pages/UploadHistory';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        <Route path="/upload-excel" element={<PrivateRoute><UploadExcel /></PrivateRoute>} />
        <Route path="/chart-history" element={<PrivateRoute><ChartHistory /></PrivateRoute>} />
        <Route path="/chart-history" element={<PrivateRoute><ChartPage /></PrivateRoute>} />    {/* ✅ NEW Route */}
        <Route path="/sales-insights" element={<PrivateRoute><SalesInsights /></PrivateRoute>} />
        <Route path="/upload-history" element={<PrivateRoute><UploadHistory /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
