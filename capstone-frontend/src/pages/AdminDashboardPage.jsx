import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { registerCashier, registerInventoryManager } from '../api/auth';
import { motion } from 'framer-motion';
import '../styles/dashboard.css';
import '../styles/forms.css';

const AdminDashboardPage = () => {
    const { user, logout } = useAuth();
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newUserRole, setNewUserRole] = useState('CASHIER');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleRegisterNewUser = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const userData = {
                username: newUsername,
                password: newPassword,
                email: newEmail,
                role: newUserRole
            };

            let response;
            if (newUserRole === 'CASHIER') {
                response = await registerCashier(userData);
            } else if (newUserRole === 'INVENTORY_MANAGER') {
                response = await registerInventoryManager(userData);
            } else {
                setError('Invalid user role selected.');
                return;
            }
            setMessage(`User "${newUsername}" (${newUserRole}) registered successfully!`);
            setNewUsername('');
            setNewPassword('');
            setNewEmail('');
            setShowRegisterForm(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message || `Failed to register ${newUserRole}.`);
            console.error(err);
        }
    };

    return (
        <motion.div
            className="dashboard-page admin-dashboard-page"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
        >
            <header className="dashboard-header">
                <h1>Business Owner Dashboard</h1>
                <p>Welcome, <span className="user-name">{user?.username}</span> ({user?.role})</p>
                <motion.button
                    onClick={logout}
                    className="secondary-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Logout
                </motion.button>
            </header>

            <section className="dashboard-content">
                <div className="dashboard-cards-container">
                    <motion.div
                        className="dashboard-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>User Management</h3>
                        <p>Register and manage system users (Cashiers, Inventory Managers).</p>
                        <motion.button
                            onClick={() => setShowRegisterForm(!showRegisterForm)}
                            className="primary-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {showRegisterForm ? 'Hide Registration Form' : 'Register New User'}
                        </motion.button>
                        {/* You'd add more buttons for 'Update User Information', 'Deactivate/Delete User' here */}
                        <a href="/users/manage" className="link-button">View All Users</a> {/* Placeholder link */}
                    </motion.div>

                    <motion.div
                        className="dashboard-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3>System Overview</h3>
                        <p>Access inventory, sales, and debt records for full oversight.</p>
                        <a href="/inventory" className="link-button">View Inventory</a>
                        <a href="/sales" className="link-button">View Sales</a>
                        <a href="/debt" className="link-button">View Debts</a>
                    </motion.div>
                </div>

                {showRegisterForm && (
                    <motion.section
                        className="register-user-section form-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>Register New System User</h2>
                        <form onSubmit={handleRegisterNewUser} className="app-form">
                            {message && <p className="success-message">{message}</p>}
                            {error && <p className="error-message">{error}</p>}
                            <div className="form-group">
                                <label htmlFor="newUsername">Username</label>
                                <input type="text" id="newUsername" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">Password</label>
                                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newEmail">Email</label>
                                <input type="email" id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newUserRole">Role</label>
                                <select id="newUserRole" value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
                                    <option value="CASHIER">Cashier</option>
                                    <option value="INVENTORY_MANAGER">Inventory Manager</option>
                                </select>
                            </div>
                            <motion.button
                                type="submit"
                                className="primary-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Register User
                            </motion.button>
                        </form>
                    </motion.section>
                )}
            </section>
        </motion.div>
    );
};

export default AdminDashboardPage;