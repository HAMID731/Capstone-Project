// models/Sales.js
const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  amount: Number,
  customerName: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  syncedFrom: String // device ID or user ID
});

module.exports = mongoose.model('Sales', salesSchema);
