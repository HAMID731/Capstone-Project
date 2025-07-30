import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import '../styles/components/navbar.css';
import {Shield} from 'lucide-react';
import styled from 'styled-components';


const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const LogoIcon = styled(Shield)`
  height: 2rem;
  width: 2rem;
  color: #2563eb;
  margin-right: 0.5rem;
`;
const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
        >
            <div className="navbar-logo">
                <Link to="/" className="logo-link">
                    <LogoWrapper>
                        <LogoIcon />
                        <LogoText>SafeKeep</LogoText>
                    </LogoWrapper>
                </Link>
            </div>
            <ul className="navbar-links">
                {user?.role === 'BUSINESS_OWNER' && (
                    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/admin-dashboard">Admin Dashboard</Link>
                    </motion.li>
                )}
                {(user?.role === 'BUSINESS_OWNER' || user?.role === 'INVENTORY_MANAGER') && (
                    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/inventory">Inventory</Link>
                    </motion.li>
                )}
                {(user?.role === 'BUSINESS_OWNER' || user?.role === 'CASHIER') && (
                    <>
                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/sales">Sales</Link>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/debt">Debt</Link>
                        </motion.li>
                    </>
                )}
            </ul>
            <div className="navbar-user-info">
                <motion.button
                    onClick={logout}
                    className="navbar-logout-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Logout
                </motion.button>
            </div>
        </motion.nav>
    );
};

export default Navbar;