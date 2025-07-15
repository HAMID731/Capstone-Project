const express = require('express');
const { createSale, getSales, updateSale, deleteSale } = require('../controllers/salesController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();


router.use(protect);
router.use(authorizeRoles('BUSINESS_OWNER', 'CASHIER'));

router.post('/', createSale);
router.get('/', getSales);
router.put('/:id', updateSale);
router.delete('/:id', deleteSale);

module.exports = router;