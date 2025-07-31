import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { addSale, getAllSalesRecords, updateSale, deleteSale } from '../api/sales';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/dashboard.css';
import '../styles/forms.css';
import '../styles/sales.css';

const SalesPage = () => {
    const { user, logout, hasRole } = useAuth();
    const [salesRecords, setSalesRecords] = useState([]);
    const [itemName, setItemName] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingSale, setEditingSale] = useState(null);
    const [loadingSales, setLoadingSales] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [saleToDelete, setSaleToDelete] = useState(null);

    const canManageSales = hasRole('BUSINESS_OWNER') || hasRole('CASHIER');
    const totalSales = useMemo(() => {
        return salesRecords.reduce((sum, record) => sum + (record.amount || 0), 0);
    }, [salesRecords]);

    useEffect(() => {
        fetchSalesRecords();
    }, []);

    const fetchSalesRecords = async () => {
        try {
            setLoadingSales(true);
            const data = await getAllSalesRecords();
            setSalesRecords(data);
        } catch (err) {
            setError("Failed to load sales records.");
            console.error(err);
        } finally {
            setLoadingSales(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError(''); 

        if (!itemName.trim()) {
            setError("Item Name is required.");
            return;
        }
        if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            setError("Amount must be a positive number.");
            return;
        }

        try {
            const saleData = {
                itemName: itemName.trim(),
                amount: parseFloat(amount),
                date: new Date().toISOString()
            };

            if (editingSale) {
                await updateSale(editingSale.id, saleData);
                setMessage(`Sale record ${editingSale.id} updated successfully!`);
            } else {
                await addSale(saleData);
                setMessage(`Sale recorded successfully!`);
            }
            fetchSalesRecords();
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || err.message || `Failed to ${editingSale ? 'update' : 'add'} sale.`);
            console.error(err);
        }
    };

    const handleEdit = (sale) => {
        setEditingSale({ ...sale });
        setItemName(sale.itemName || '');
        setAmount(sale.amount || '');
        setItemName(sale.itemName);
        setAmount(sale.amount);
        setShowForm(true);
    };

    const confirmDelete = (recordId, amount) => {
        setSaleToDelete({ recordId, amount });
        setShowConfirmModal(true);
    };

    const executeDelete = async () => {
        if (!saleToDelete) return;

        try {
            await deleteSale(saleToDelete.recordId);
            setMessage(`Sale record ${saleToDelete.recordId} deleted successfully.`);
            setSalesRecords(prev => prev.filter(sale => sale.id !== saleToDelete.recordId));
            setShowConfirmModal(false);
            setSaleToDelete(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to delete sale.');
            console.error(err);
        }
    };

    const resetForm = () => {
        setEditingSale(null);
        setItemName('');
        setAmount('');
        setShowForm(false);
    };

    return (
        <motion.div
            className="dashboard-page sales-page"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
        >
            <header className="dashboard-header">
                <h1>Sales Management</h1>
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

            <section className="dashboard-actions">
                {canManageSales && (
                    <motion.button
                        className="primary-button"
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingSale(null);
                            setItemName('');
                            setAmount('');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showForm ? 'Hide Form' : 'Record New Sale'}
                    </motion.button>
                )}
            </section>

            <AnimatePresence>
                {showForm && (
                    <motion.section
                        className="form-section add-sale-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>{editingSale ? 'Edit Sale Record' : 'Record New Sale'}</h2>
                        <form onSubmit={handleFormSubmit} className="app-form">
                            {message && <p className="success-message">{message}</p>}
                            {error && <p className="error-message">{error}</p>}
                            <div className="form-group">
                                <label htmlFor="itemName">Item Name</label>
                                <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0.01" step="0.01" />
                            </div>
                            <motion.button
                                type="submit"
                                className="primary-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {editingSale ? 'Update Sale' : 'Record Sale'}
                            </motion.button>
                            {editingSale && (
                                <motion.button
                                    type="button"
                                    className="secondary-button"
                                    onClick={resetForm}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel Edit
                                </motion.button>
                            )}
                        </form>
                    </motion.section>
                )}
            </AnimatePresence>

            <section className="data-list-section sales-records-list-section">
                <h2>All Sales Records</h2>
                {loadingSales ? (
                    <div className="loading-spinner">Loading sales records...</div>
                ) : salesRecords.length === 0 ? (
                    <p className="no-data-message">No sales records found.</p>
                ) : (
                    <>
                        <div className="total-sales-summary">
                            <h3>Total Sales: ₦{totalSales.toFixed(2)}</h3>
                        </div>
                        <div className="data-cards-container">
                            <AnimatePresence>
                                {salesRecords.map(sale => (
                                    <motion.div
                                        key={sale.id}
                                        className="data-card sales-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        layout
                                    >         
                                        <h3><strong>Item Name:</strong> {sale.itemName || 'N/A'}</h3>                                        
                                        <p><strong>Sale ID: </strong> {sale.id}</p>
                                        <p><strong>Date: </strong> {new Date(sale.date).toLocaleString()}</p>
                                        <p><strong>Amount: ₦</strong>{sale.amount}</p>
                                        <h3>Sale ID: {sale.id}</h3>
                                        <p><strong>Item Name:</strong> {sale.itemName}</p>
                                        <p><strong>Amount:</strong> ₦{sale.amount?.toFixed(2)}</p>
                                        <p><strong>Date:</strong> {new Date(sale.date).toLocaleString()}</p>
                                        {canManageSales && (
                                            <div className="card-actions">
                                                <motion.button
                                                    onClick={() => handleEdit(sale)}
                                                    className="action-button edit-button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Edit
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => confirmDelete(sale.id, sale.amount)}
                                                    className="action-button delete-button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Delete
                                                </motion.button>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </section>

            <AnimatePresence>
                {showConfirmModal && (
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowConfirmModal(false)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3>Confirm Deletion</h3>
                            <p>Are you sure you want to delete this sale record (Amount: ₦{saleToDelete?.amount})?</p>
                            <div className="modal-actions">
                                <motion.button
                                    onClick={executeDelete}
                                    className="primary-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Yes, Delete
                                </motion.button>
                                <motion.button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="secondary-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SalesPage;