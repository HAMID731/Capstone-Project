import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addItemToInventory, getAllInventoryItems, updateInventoryStock, removeInventoryItem, updateInventoryItem } from '../api/inventory';
import Card from '../component/Card.jsx';
import LoadingSpinner from '../component/LoadingSpinner.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/dashboard.css';
import '../styles/forms.css';
import '../styles/inventory.css';

const InventoryPage = () => {
    const { user, logout, hasRole } = useAuth();
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [newUnitCost, setNewUnitCost] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [loadingItems, setLoadingItems] = useState(true);
    const [editingItem, setEditingItem] = useState(null);

    const canAddRemove = hasRole('BUSINESS_OWNER');
    const canUpdateStock = hasRole('BUSINESS_OWNER') || hasRole('INVENTORY_MANAGER'); // BO and IM can update stock

    
    useEffect(() => {
        fetchInventoryItems();
    }, []);

    const fetchInventoryItems = async () => {
        try {
            setLoadingItems(true);
            const data = await getAllInventoryItems();
            setItems(data);
        } catch (err) {
            setError("Failed to load inventory items.");
            console.error(err);
        } finally {
            setLoadingItems(false);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const itemData = {
                itemName: newItemName,
                quantity: parseInt(newQuantity),
                unitCost: parseFloat(newUnitCost)
            };
            const addedItem = await addItemToInventory(itemData);
            setMessage(`Item "${addedItem.itemName}" added successfully!`);
            fetchInventoryItems();
            setNewItemName('');
            setNewQuantity('');
            setNewUnitCost('');
            setShowAddItemForm(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to add item.');
            console.error(err);
        }
    };

    const handleUpdateStock = async (itemId, currentQuantity) => {
        const updatedQuantity = prompt(`Enter new quantity for item ID ${itemId} (Current: ${currentQuantity}):`, currentQuantity);
        if (updatedQuantity !== null && !isNaN(updatedQuantity) && parseInt(updatedQuantity) >= 0) {
            try {
                await updateInventoryStock(itemId, parseInt(updatedQuantity));
                setMessage(`Stock for item ${itemId} updated successfully.`);
                fetchInventoryItems();
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to update stock.');
                console.error(err);
            }
        } else if (updatedQuantity !== null) {
            alert("Invalid quantity. Please enter a non-negative number.");
        }
    };

    const handleEditItemDetails = (item) => {
        setEditingItem({ ...item });
        setShowAddItemForm(true); 

        setNewItemName(item.itemName);
        setNewQuantity(item.quantity);
        setNewUnitCost(item.unitCost);
    };

    const handleUpdateItem = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const updatedData = {
                itemName: newItemName,
                quantity: parseInt(newQuantity),
                unitCost: parseFloat(newUnitCost)
            };
            await updateInventoryItem(editingItem.itemId, updatedData);
            setMessage(`Item "${updatedData.itemName}" updated successfully!`);
            fetchInventoryItems();
            setEditingItem(null);
            setShowAddItemForm(false);
            setNewItemName('');
            setNewQuantity('');
            setNewUnitCost('');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to update item details.');
            console.error(err);
        }
    };

    const handleRemoveItem = async (itemId, itemName) => {
        if (window.confirm(`Are you sure you want to remove "${itemName}" from inventory? This action cannot be undone.`)) {
            try {
                await removeInventoryItem(itemId);
                setMessage(`Item "${itemName}" removed successfully.`);
                setItems(prev => prev.filter(item => item.itemId !== itemId));
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to remove item.');
                console.error(err);
            }
        }
    };

    return (
        <motion.div
            className="dashboard-page inventory-page"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
        >
            <header className="dashboard-header">
                <h1>Inventory Management</h1>
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
                {canAddRemove && (
                    <motion.button
                        className="primary-button"
                        onClick={() => {
                            setShowAddItemForm(!showAddItemForm);
                            setEditingItem(null);
                            setNewItemName('');
                            setNewQuantity('');
                            setNewUnitCost('');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showAddItemForm ? 'Hide Form' : 'Add New Item'}
                    </motion.button>
                )}
            </section>

            <AnimatePresence>
                {showAddItemForm && (
                    <motion.section
                        className="form-section add-item-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>{editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}</h2>
                        <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="app-form">
                            {message && <p className="success-message">{message}</p>}
                            {error && <p className="error-message">{error}</p>}
                            <div className="form-group">
                                <label htmlFor="itemName">Item Name</label>
                                <input type="text" id="itemName" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input type="number" id="quantity" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} required min="0" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="unitCost">Unit Cost</label>
                                <input type="number" id="unitCost" value={newUnitCost} onChange={(e) => setNewUnitCost(e.target.value)} required min="0.01" step="0.01" />
                            </div>
                            <motion.button
                                type="submit"
                                className="primary-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {editingItem ? 'Update Item' : 'Add Item'}
                            </motion.button>
                            {editingItem && (
                                <motion.button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => {
                                        setEditingItem(null);
                                        setShowAddItemForm(false);
                                        setNewItemName('');
                                        setNewQuantity('');
                                        setNewUnitCost('');
                                    }}
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

            <section className="data-list-section inventory-list-section">
                <h2>Current Inventory</h2>
                {loadingItems ? (
                    <div className="loading-spinner">Loading inventory...</div>
                ) : items.length === 0 ? (
                    <p className="no-data-message">No inventory items found. Add some new items!</p>
                ) : (
                    <div className="data-cards-container">
                        <AnimatePresence>
                            {items.map(item => (
                                <motion.div
                                    key={item.itemId}
                                    className="data-card inventory-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    layout
                                >
                                    <h3>{item.itemName}</h3>
                                    <p><strong>ID:</strong> {item.itemId}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Unit Cost:</strong> ${item.unitCost?.toFixed(2)}</p>
                                    <p><strong>Total Value:</strong> ${(item.quantity * item.unitCost)?.toFixed(2)}</p>
                                    <div className="card-actions">
                                        {canUpdateStock && (
                                            <motion.button
                                                onClick={() => handleUpdateStock(item.itemId, item.quantity)}
                                                className="action-button update-stock-button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Update Stock
                                            </motion.button>
                                        )}
                                        {canAddRemove && (
                                            <>
                                                <motion.button
                                                    onClick={() => handleEditItemDetails(item)}
                                                    className="action-button edit-item-button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Edit Details
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => handleRemoveItem(item.itemId, item.itemName)}
                                                    className="action-button remove-item-button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Remove
                                                </motion.button>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </section>
        </motion.div>
    );
};

export default InventoryPage;