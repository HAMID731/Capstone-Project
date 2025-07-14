import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerBusinessOwner } from '../api/auth';
import { motion } from 'framer-motion';
import '../styles/forms.css';
import '../styles/login.css';

const RegisterBusinessOwnerPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const userData = { username, password, email, role: 'BUSINESS_OWNER' };
            await registerBusinessOwner(userData);
            setMessage('Business Owner registered successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="login-page"> {}
            <motion.div
                className="login-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h2>Register as Business Owner</h2>
                <form onSubmit={handleSubmit} className="app-form">
                    {message && <motion.p className="success-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{message}</motion.p>}
                    {error && <motion.p className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <motion.button
                        type="submit"
                        className="primary-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Register
                    </motion.button>
                </form>
                <motion.p
                    className="login-link"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Already have an account? <a href="/login">Log In</a>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default RegisterBusinessOwnerPage;