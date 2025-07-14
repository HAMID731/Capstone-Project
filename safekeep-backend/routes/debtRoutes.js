const express = require('express');
const { createDebt, getDebts,updateDebt,deleteDebt } = require('../controllers/debtController');

const router = express.Router();
router.post('/', createDebt);
router.get('/', getDebts);
router.put('/:id', updateDebt);
router.delete('/:id', deleteDebt);


module.exports = router;
