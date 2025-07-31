import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';

import HomePage from './pages/HomePage';
import Navbar from './component/Navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterBusinessOwnerPage from './pages/RegisterBusinessOwnerPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import InventoryManagerDashboardPage from './pages/InventoryManagerDashboardPage.jsx';
import CashierDashboardPage from './pages/CashierDashboardPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import SalesPage from './pages/SalesPage.jsx';
import DebtPage from './pages/DebtPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import './styles/components/navbar.css';
import './styles/global.css';
import './styles/forms.css';
import './styles/dashboard.css';
import './styles/login.css';
import './styles/inventory.css';
import './styles/sales.css';
import './styles/debt.css';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, hasRole, loading } = useAuth();

    if (loading) return <div className="loading-container">Loading authentication...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.some(role => hasRole(role))) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const HomeRedirect = () => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) return <div className="loading-container">Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    switch (user?.role) {
        case 'BUSINESS_OWNER':
            return <Navigate to="/admin-dashboard" replace />;
        case 'INVENTORY_MANAGER':
            return <Navigate to="/inventory-manager-dashboard" replace />;
        case 'CASHIER':
            return <Navigate to="/cashier-dashboard" replace />;
        default:
            return <Navigate to="/login" replace />;
    }
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<RegisterBusinessOwnerPage />} />
                            <Route path="/navbar" element={<Navbar />} />
                            <Route path="/admin-dashboard" element={
                                <PrivateRoute allowedRoles={['BUSINESS_OWNER']}>
                                    <AdminDashboardPage />
                                </PrivateRoute>
                            } />
                            <Route path="/inventory-manager-dashboard" element={
                                <PrivateRoute allowedRoles={['INVENTORY_MANAGER']}>
                                    <InventoryManagerDashboardPage />
                                </PrivateRoute>
                            } />
                            <Route path="/cashier-dashboard" element={
                                <PrivateRoute allowedRoles={['CASHIER']}>
                                    <CashierDashboardPage />
                                </PrivateRoute>
                            } />
                            <Route path="/inventory" element={
                                <PrivateRoute allowedRoles={['BUSINESS_OWNER', 'INVENTORY_MANAGER']}>
                                    <InventoryPage />
                                </PrivateRoute>
                            } />
                            <Route path="/sales" element={
                                <PrivateRoute allowedRoles={['BUSINESS_OWNER', 'CASHIER']}>
                                    <SalesPage />
                                </PrivateRoute>
                            } />
                            <Route path="/debt" element={
                                <PrivateRoute allowedRoles={['BUSINESS_OWNER', 'CASHIER']}>
                                    <DebtPage />
                                </PrivateRoute>
                            } />
                            <Route path="/" element={<HomeRedirect />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </AnimatePresence>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
