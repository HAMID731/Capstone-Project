import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/login.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated, user, loading } = useAuth();
    const navigate = useNavigate();


    React.useEffect(() => {
        if (!loading && isAuthenticated) {
            switch (user?.role) {
                case 'BUSINESS_OWNER':
                    navigate('/admin-dashboard');
                    break;
                case 'INVENTORY_MANAGER':
                    navigate('/inventory-manager-dashboard');
                    break;
                case 'CASHIER':
                    navigate('/cashier-dashboard');
                    break;
                default:
                    navigate('/dashboard');
            }
        }
    }, [isAuthenticated, loading, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Login failed. Please check credentials.');
        }
    };

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <div className="login-page">
            <motion.div
                className="login-container"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.h2
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    Welcome Back!
                </motion.h2>
                <p className="login-subtitle">Sign in to continue to your account.</p>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <motion.p className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="primary-button login-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Log In
                    </motion.button>
                </form>
                <motion.p
                    className="register-link"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Don't have an account? <a href="/register">Register Business Owner</a>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default LoginPage;