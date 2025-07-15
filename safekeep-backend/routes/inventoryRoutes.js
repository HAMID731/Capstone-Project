const express = require('express');
const { createItem, getItems, updateItem, updateItemStock, deleteItem } = require('../controllers/inventoryController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', authorizeRoles('BUSINESS_OWNER'), createItem);
router.delete('/:id', authorizeRoles('BUSINESS_OWNER'), deleteItem);
router.get('/', authorizeRoles('BUSINESS_OWNER', 'INVENTORY_MANAGER'), getItems);
router.put('/:id', authorizeRoles('BUSINESS_OWNER'), updateItem);
router.patch('/:id/stock', authorizeRoles('BUSINESS_OWNER', 'INVENTORY_MANAGER'), updateItemStock);


module.exports = router;