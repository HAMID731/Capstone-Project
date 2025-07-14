// controllers/salesController.js
const Sales = require('../models/sales');

exports.createSale = async (req, res) => {
  try {
    const newSale = new Sales(req.body);
    const savedSale = await newSale.save();
    res.status(201).json({
      message:"Sale successfully created",
      data:savedSale
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
