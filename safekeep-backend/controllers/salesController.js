const fileStorage = require('../utils/fileStorage');
const salesSchema = require('../models/sales');

exports.createSale = async (req, res) => {
    try {
        const newSaleData = {
            amount: parseFloat(req.body.amount),
            customerName: req.body.customerName || null,
            date: new Date(req.body.date || Date.now())
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
        const updateData = {
            amount: parseFloat(req.body.amount),
            customerName: req.body.customerName || null,
            date: new Date(req.body.date || Date.now())
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