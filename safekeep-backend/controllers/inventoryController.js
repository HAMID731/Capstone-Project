const fileStorage = require('../utils/fileStorage');
const inventorySchema = require('../models/Inventory'); // For reference

exports.createItem = async (req, res) => {
    try {
        const newItemData = {
            itemName: req.body.itemName,
            quantity: parseInt(req.body.quantity),
            unitCost: parseFloat(req.body.unitCost)
        };
        const savedItem = await fileStorage.create('inventory', newItemData);
        res.status(201).json({
            message: "Inventory item created successfully",
            data: savedItem
        });
    } catch (err) {
        console.error('Error creating inventory item:', err);
        res.status(500).json({ message: err.message || "Failed to create item" });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await fileStorage.getAll('inventory');
        res.json(items);
    } catch (err) {
        console.error('Error fetching inventory items:', err);
        res.status(500).json({ message: err.message || "Failed to retrieve items" });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updateData = {
            itemName: req.body.itemName,
            quantity: parseInt(req.body.quantity),
            unitCost: parseFloat(req.body.unitCost)
        };

        const updated = await fileStorage.update('inventory', itemId, updateData);
        if (!updated) return res.status(404).json({ message: "Item not found" });
        res.json(updated);
    } catch (err) {
        console.error('Error updating inventory item:', err);
        res.status(500).json({ message: err.message || "Failed to update item" });
    }
};

exports.updateItemStock = async (req, res) => {
    try {
        const itemId = req.params.id;
        const { quantity } = req.body; // Expecting { quantity: newQuantity }

        if (typeof quantity === 'undefined' || isNaN(parseInt(quantity))) {
            return res.status(400).json({ message: "New quantity is required and must be a number." });
        }

        const item = await fileStorage.getById('inventory', itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        const updatedItem = await fileStorage.update('inventory', itemId, { quantity: parseInt(quantity) });
        res.json(updatedItem);

    } catch (err) {
        console.error('Error updating item stock:', err);
        res.status(500).json({ message: err.message || "Failed to update stock" });
    }
};


exports.deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const deleted = await fileStorage.delete('inventory', itemId);
        if (!deleted) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Item deleted" });
    } catch (err) {
        console.error('Error deleting inventory item:', err);
        res.status(500).json({ message: err.message || "Failed to delete item" });
    }};