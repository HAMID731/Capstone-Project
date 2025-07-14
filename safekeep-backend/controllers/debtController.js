const Debt = require('../models/debts');

exports.createDebt = async (req, res) => {
  try {
    const newDebt = new Debt(req.body);
    const savedDebt = await newDebt.save();
    res.status(201).json({
      message:"Dabt created successfully",
      data:savedDebt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDebts = async (req, res) => {
  try {
    const debts = await Debt.find();
    res.json(debts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDebt = async (req, res) => {
  try {
    const updated = await Debt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Debt not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteDebt = async (req, res) => {
  try {
    const deleted = await Debt.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Debt not found" });
    res.json({ message: "Debt deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

