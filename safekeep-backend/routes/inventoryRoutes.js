const express = require('express');
const { createItem, getItems,  updateItem, deleteItem } = require('../controllers/inventoryController');

const router = express.Router();

router.post('/', createItem);
router.get('/', getItems);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);


module.exports = router;