import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components/card.css';

const Card = ({ children, className = '', ...props }) => {
    return (
        <motion.div
            className={`generic-card ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            layout
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;