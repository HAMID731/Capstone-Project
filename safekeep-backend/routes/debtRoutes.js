const express = require('express');
const { createDebt, getDebts, updateDebt, deleteDebt } = require('../controllers/debtController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('BUSINESS_OWNER', 'CASHIER'));

router.post('/', createDebt);
router.get('/', getDebts);
router.put('/:id', updateDebt);
router.delete('/:id', deleteDebt);

module.exports = router;