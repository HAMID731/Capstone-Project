const fileStorage = require('../utils/fileStorage');

exports.createSale = async (req, res) => {
    try {
        const { itemName, amount } = req.body;

        if (!itemName || typeof itemName !== 'string' || itemName.trim() === '') {
            return res.status(400).json({ message: 'Item Name is required and must be a non-empty string.' });
        }
        if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number.' });
        }

        const newSaleData = {
            itemName: itemName.trim(),
            amount: parseFloat(amount),
            date: new Date().toISOString()
        };

        const savedSale = await fileStorage.create('sales', newSaleData);
        res.status(201).json({
            message: "Sale successfully created",
            data: savedSale
        });
    } catch (err) {
        console.error('Error creating sale:', err);
        res.status(500).json({ message: err.message || "Failed to create sale" });
    }
};

exports.getSales = async (req, res) => {
    try {
        const sales = await fileStorage.getAll('sales');
        res.json(sales);
    } catch (err) {
        console.error('Error fetching sales:', err);
        res.status(500).json({ message: err.message || "Failed to retrieve sales" });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const saleId = req.params.id;
        const { itemName, amount } = req.body;

        if (!itemName || typeof itemName !== 'string' || itemName.trim() === '') {
            return res.status(400).json({ message: 'Item Name is required for update.' });
        }
        if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number for update.' });
        }

        const updateData = {
            itemName: itemName.trim(), 
            amount: parseFloat(amount),
        };

        const updated = await fileStorage.update('sales', saleId, updateData);
        if (!updated) return res.status(404).json({ message: "Sale not found" });
        res.json(updated);
    } catch (err) {
        console.error('Error updating sale:', err);
        res.status(500).json({ message: err.message || "Failed to update sale" });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        const saleId = req.params.id;
        const deleted = await fileStorage.delete('sales', saleId);
        if (!deleted) return res.status(404).json({ message: "Sale not found" });
        res.json({ message: "Sale deleted" });
    } catch (err) {
        console.error('Error deleting sale:', err);
        res.status(500).json({ message: err.message || "Failed to delete sale" });
    }
};