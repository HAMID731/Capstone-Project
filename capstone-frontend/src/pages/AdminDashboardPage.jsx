import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { registerCashier, registerInventoryManager, getAllUsers, deleteUser } from '../api/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/forms.css';

const AdminDashboardPage = () => {
    const { user} = useAuth();
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newUserRole, setNewUserRole] = useState('CASHIER');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [systemUsers, setSystemUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [showUserList, setShowUserList] = useState(false);

    useEffect(() => {
        if (user?.role === 'BUSINESS_OWNER') {
            fetchSystemUsers();
        }
    }, [user]);

    const fetchSystemUsers = async () => {
        setLoadingUsers(true);
        try {
            const users = await getAllUsers();
            setSystemUsers(users);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to load system users.');
            console.error(err);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleRegisterNewUser = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const userData = {
                username: newUsername,
                password: newPassword,
                email: newEmail,
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
            fetchSystemUsers();
        } catch (err) {
            setError(err.response?.data?.message || err.message || `Failed to register ${newUserRole}.`);
            console.error(err);
        }
    };

    const handleDeleteUser = async (userId, usernameToDelete) => {
        if (window.confirm(`Are you sure you want to delete user "${usernameToDelete}"? This action cannot be undone.`)) {
            try {
                await deleteUser(userId);
                setMessage(`User "${usernameToDelete}" deleted successfully.`);
                fetchSystemUsers();
            } catch (err) {
                setError(err.response?.data?.message || err.message || `Failed to delete user "${usernameToDelete}".`);
                console.error(err);
            }
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
                        <motion.button
                            onClick={() => setShowUserList(!showUserList)}
                            className="link-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ marginLeft: '10px' }}
                        >
                            {showUserList ? 'Hide All Users' : 'View All Users'}
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="dashboard-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3>System Overview</h3>
                        <p>Access inventory, sales, and debt records for full oversight.</p>
                        <Link to="/inventory" className="link-button">View Inventory</Link>
                        <Link to="/sales" className="link-button">View Sales</Link>
                        <Link to="/debt" className="link-button">View Debts</Link>
                    </motion.div>
                </div>

                <AnimatePresence>
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
                </AnimatePresence>

                <AnimatePresence>
                    {showUserList && (
                        <motion.section
                            className="user-list-section data-list-section"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2>System Users</h2>
                            {loadingUsers ? (
                                <div className="loading-spinner">Loading users...</div>
                            ) : systemUsers.length === 0 ? (
                                <p className="no-data-message">No system users found (besides yourself).</p>
                            ) : (
                                <div className="data-cards-container">
                                    {systemUsers.map(sysUser => (
                                        <motion.div
                                            key={sysUser.id}
                                            className="data-card user-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.3 }}
                                            layout
                                        >
                                            <h3>{sysUser.username}</h3>
                                            <p><strong>Role:</strong> {sysUser.role}</p>
                                            <p><strong>Email:</strong> {sysUser.email}</p>
                                            {sysUser.id !== user.id && (
                                                <motion.button
                                                    onClick={() => handleDeleteUser(sysUser.id, sysUser.username)}
                                                    className="action-button delete-button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Delete User
                                                </motion.button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.section>
                    )}
                </AnimatePresence>
            </section>
        </motion.div>
    );
};

export default AdminDashboardPage;
