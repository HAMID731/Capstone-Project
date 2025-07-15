const fileStorage = require('../utils/fileStorage');
const debtSchema = require('../models/debts');

exports.createDebt = async (req, res) => {
    try {
        const newDebtData = {
            customerName: req.body.customerName,
            amount: parseFloat(req.body.amount),
            dueDate: new Date(req.body.dueDate),
            paid: req.body.paid || false
        };

        const savedDebt = await fileStorage.create('debts', newDebtData);
        res.status(201).json({
            message: "Debt created successfully",
            data: savedDebt
        });
    } catch (err) {
        console.error('Error creating debt:', err);
        res.status(500).json({ message: err.message || "Failed to create debt" });
    }
};

exports.getDebts = async (req, res) => {
    try {
        const debts = await fileStorage.getAll('debts');
        res.json(debts);
    } catch (err) {
        console.error('Error fetching debts:', err);
        res.status(500).json({ message: err.message || "Failed to retrieve debts" });
    }
};

exports.updateDebt = async (req, res) => {
    try {
        const debtId = req.params.id;
        const updateData = {
            customerName: req.body.customerName,
            amount: parseFloat(req.body.amount),
            dueDate: new Date(req.body.dueDate),
            paid: req.body.paid
        };

        const updated = await fileStorage.update('debts', debtId, updateData);
        if (!updated) return res.status(404).json({ message: "Debt not found" });
        res.json(updated);
    } catch (err) {
        console.error('Error updating debt:', err);
        res.status(500).json({ message: err.message || "Failed to update debt" });
    }
};

exports.deleteDebt = async (req, res) => {
    try {
        const debtId = req.params.id;
        const deleted = await fileStorage.delete('debts', debtId);
        if (!deleted) return res.status(404).json({ message: "Debt not found" });
        res.json({ message: "Debt deleted" });
    } catch (err) {
        console.error('Error deleting debt:', err);
        res.status(500).json({ message: err.message || "Failed to delete debt" });
    }
};
