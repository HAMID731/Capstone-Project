const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  customerName: String,
  amount: Number,
  dueDate: Date,
  settled: {
    type: Boolean,
    default: false
  },
  syncedFrom: String
});

module.exports = mongoose.model('Debt', debtSchema);