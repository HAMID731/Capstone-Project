import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addDebt, getAllDebtRecords, updateDebt, deleteDebt } from '../api/debt';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/dashboard.css';
import '../styles/forms.css';
import '../styles/debt.css';

const DebtPage = () => {
    const { user, logout, hasRole } = useAuth();
    const [debtRecords, setDebtRecords] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [paid, setPaid] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingDebt, setEditingDebt] = useState(null);
    const [loadingDebts, setLoadingDebts] = useState(true);

    const canManageDebts = hasRole('BUSINESS_OWNER') || hasRole('CASHIER');

    useEffect(() => {
        fetchDebtRecords();
    }, []);

    const fetchDebtRecords = async () => {
        try {
            setLoadingDebts(true);
            const data = await getAllDebtRecords();
            setDebtRecords(data);
        } catch (err) {
            setError("Failed to load debt records.");
            console.error(err);
        } finally {
            setLoadingDebts(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const debtData = {
                customerName,
                amount: parseFloat(amount),
                dueDate: dueDate,
                paid: paid
            };

            if (editingDebt) {
                await updateDebt(editingDebt.debtId, debtData);
                setMessage(`Debt record ${editingDebt.debtId} updated successfully!`);
            } else {
                await addDebt(debtData);
                setMessage(`Debt record added successfully!`);
            }
            fetchDebtRecords();
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || err.message || `Failed to ${editingDebt ? 'update' : 'add'} debt.`);
            console.error(err);
        }
    };

    const handleEdit = (debt) => {
        setEditingDebt({ ...debt });
        setCustomerName(debt.customerName);
        setAmount(debt.amount);
        setDueDate(debt.dueDate.split('T')[0]);
        setPaid(debt.paid);
        setShowForm(true);
    };

    const handleDelete = async (debtId, customerName) => {
        if (window.confirm(`Are you sure you want to delete debt for ${customerName}?`)) {
            try {
                await deleteDebt(debtId);
                setMessage(`Debt record for ${customerName} deleted successfully.`);
                setDebtRecords(prev => prev.filter(debt => debt.debtId !== debtId));
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to delete debt.');
                console.error(err);
            }
        }
    };

    const resetForm = () => {
        setEditingDebt(null);
        setCustomerName('');
        setAmount('');
        setDueDate('');
        setPaid(false);
        setShowForm(false);
    };

    return (
        <motion.div
            className="dashboard-page debt-page"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
        >
            <header className="dashboard-header">
                <h1>Debt Management</h1>
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
                {canManageDebts && (
                    <motion.button
                        className="primary-button"
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingDebt(null);
                            setCustomerName('');
                            setAmount('');
                            setDueDate('');
                            setPaid(false);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showForm ? 'Hide Form' : 'Add New Debt'}
                    </motion.button>
                )}
            </section>

            <AnimatePresence>
                {showForm && (
                    <motion.section
                        className="form-section add-debt-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>{editingDebt ? 'Edit Debt Record' : 'Add New Debt Record'}</h2>
                        <form onSubmit={handleFormSubmit} className="app-form">
                            {message && <p className="success-message">{message}</p>}
                            {error && <p className="error-message">{error}</p>}
                            <div className="form-group">
                                <label htmlFor="customerName">Customer Name</label>
                                <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0.01" step="0.01" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dueDate">Due Date</label>
                                <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                            </div>
                            <div className="form-group checkbox-group">
                                <input type="checkbox" id="paid" checked={paid} onChange={(e) => setPaid(e.target.checked)} />
                                <label htmlFor="paid">Paid</label>
                            </div>
                            <motion.button
                                type="submit"
                                className="primary-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {editingDebt ? 'Update Debt' : 'Add Debt'}
                            </motion.button>
                            {editingDebt && (
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

            <section className="data-list-section debt-records-list-section">
                <h2>All Debt Records</h2>
                {loadingDebts ? (
                    <div className="loading-spinner">Loading debt records...</div>
                ) : debtRecords.length === 0 ? (
                    <p className="no-data-message">No debt records found.</p>
                ) : (
                    <div className="data-cards-container">
                        <AnimatePresence>
                            {debtRecords.map(debt => (
                                <motion.div
                                    key={debt.debtId}
                                    className={`data-card debt-card ${debt.paid ? 'debt-paid' : 'debt-unpaid'}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    layout
                                >
                                    <h3>{debt.customerName}</h3>
                                    <p><strong>ID:</strong> {debt.debtId}</p>
                                    <p><strong>Amount:</strong> ${debt.amount?.toFixed(2)}</p>
                                    <p><strong>Due Date:</strong> {new Date(debt.dueDate).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {debt.paid ? 'Paid' : 'Unpaid'}</p>
                                    {canManageDebts && (
                                        <div className="card-actions">
                                            <motion.button
                                                onClick={() => handleEdit(debt)}
                                                className="action-button edit-button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Edit
                                            </motion.button>
                                            <motion.button
                                                onClick={() => handleDelete(debt.debtId, debt.customerName)}
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
                )}
            </section>
        </motion.div>
    );
};

export default DebtPage;