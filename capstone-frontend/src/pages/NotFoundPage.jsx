import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/global.css';

const NotFoundPage = () => {
    return (
        <motion.div
            className="not-found-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginTop: '100px' }}
        >
            <motion.h1
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                Page Not Found
            </motion.h1>
            <p>The page you are looking for does not exist.</p>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Link to="/" className="primary-button">Go to Home</Link>
            </motion.div>
        </motion.div>
    );
};

export default NotFoundPage;