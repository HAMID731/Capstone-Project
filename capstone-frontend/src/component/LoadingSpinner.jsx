import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/loadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <div className="loading-spinner-container">
            <motion.div
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            ></motion.div>
            <p className="loading-message">{message}</p>
        </div>
    );
};

export default LoadingSpinner;