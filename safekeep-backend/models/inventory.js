const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  unitCost: Number,
  syncedFrom: String
});

module.exports = mongoose.model('Inventory', inventorySchema);