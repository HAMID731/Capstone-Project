import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addSale, getAllSalesRecords } from '../api/sales';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/dashboard.css';
import '../styles/forms.css';
import '../styles/sales.css';

const CashierDashboardPage = () => {
    const { user, logout } = useAuth();
    const [amount, setAmount] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [salesRecords, setSalesRecords] = useState([]);
    const [showAddSaleForm, setShowAddSaleForm] = useState(false);
    const [loadingSales, setLoadingSales] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const data = await getAllSalesRecords();
                setSalesRecords(data);
            } catch (err) {
                setError("Failed to load sales records.");
                console.error(err);
            } finally {
                setLoadingSales(false);
            }
        };
        fetchSales();
    }, []);

    const handleAddSale = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const saleData = {
                amount: parseFloat(amount),
                customerName: customerName || null,
                date: new Date().toISOString()
            };
            const newRecord = await addSale(saleData);
            setMessage(`Sale added successfully! ID: ${newRecord.recordId}`);
            setSalesRecords(prev => [...prev, newRecord]);
            setAmount('');
            setCustomerName('');
            setShowAddSaleForm(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to add sale.');
            console.error(err);
        }
    };

    return (
        <motion.div
            className="dashboard-page cashier-dashboard-page"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
        >
            <header className="dashboard-header">
                <h1>Cashier Dashboard</h1>
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
                        <h3>Sales Operations</h3>
                        <p>Record new sales and view recent transactions.</p>
                        <motion.button
                            className="primary-button"
                            onClick={() => setShowAddSaleForm(!showAddSaleForm)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {showAddSaleForm ? 'Hide Add Sale Form' : 'Add New Sale'}
                        </motion.button>
                        <Link to="/sales" className="link-button">View All Sales</Link>
                    </motion.div>

                    <motion.div
                        className="dashboard-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3>Debt Management</h3>
                        <p>Manage customer debts and payment tracking.</p>
                        <Link to="/debt" className="primary-button">Manage Debts</Link>
                    </motion.div>
                </div>

                {showAddSaleForm && (
                    <motion.section
                        className="add-sale-section form-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>Record New Sale</h2>
                        <form onSubmit={handleAddSale} className="app-form">
                            {message && <p className="success-message">{message}</p>}
                            {error && <p className="error-message">{error}</p>}
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0.01" step="0.01" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerName">Customer Name (Optional)</label>
                                <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                            </div>
                            <motion.button
                                type="submit"
                                className="primary-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Record Sale
                            </motion.button>
                        </form>
                    </motion.section>
                )}

                <section className="sales-list-section data-list-section">
                    <h2>Recent Sales Records</h2>
                    {loadingSales ? (
                        <div className="loading-spinner">Loading sales...</div>
                    ) : salesRecords.length === 0 ? (
                        <p className="no-data-message">No sales records found.</p>
                    ) : (
                        <div className="data-cards-container">
                            {salesRecords.slice(-5).reverse().map(sale => (
                                <motion.div
                                    key={sale.recordId}
                                    className="data-card sales-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3>Sale ID: {sale.recordId}</h3>
                                    <p><strong>Amount:</strong> ${sale.amount?.toFixed(2)}</p>
                                    <p><strong>Customer:</strong> {sale.customerName || 'N/A'}</p>
                                    <p><strong>Date:</strong> {new Date(sale.date).toLocaleString()}</p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            </section>
        </motion.div>
    );
};

export default CashierDashboardPage;