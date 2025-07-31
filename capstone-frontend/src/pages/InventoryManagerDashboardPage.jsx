import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/dashboard.css';

const InventoryManagerDashboardPage = () => {
    const { user, logout } = useAuth();
    return (
        <motion.div
            className="dashboard-page inventory-manager-dashboard-page"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
        >
            <header className="dashboard-header">
                <h1>Inventory Manager Dashboard</h1>
                <p>Welcome, <span className="user-name">{user?.username}</span> ({user?.role})</p>
            </header>
            <section className="dashboard-content">
                <div className="dashboard-cards-container">
                    <motion.div
                        className="dashboard-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>Inventory Operations</h3>
                        <p>Manage existing stock, add new items, or remove old ones.</p>
                        <Link to="/inventory" className="primary-button">Go to Inventory Management</Link>
                    </motion.div>
                    {}
                </div>
            </section>
        </motion.div>
    );
};

export default InventoryManagerDashboardPage;