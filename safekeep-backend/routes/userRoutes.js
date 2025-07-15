const express = require('express');
const {
    registerBusinessOwner,
    registerCashier,
    registerInventoryManager,
    loginUser,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser
} = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/register/businessowner', registerBusinessOwner);
router.post('/login', loginUser);
router.use(protect);
router.post('/register/cashier', authorizeRoles('BUSINESS_OWNER'), registerCashier);
router.post('/register/inventorymanager', authorizeRoles('BUSINESS_OWNER'), registerInventoryManager);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/', authorizeRoles('BUSINESS_OWNER'), getAllUsers); // Get all users
router.delete('/:id', authorizeRoles('BUSINESS_OWNER'), deleteUser); // Delete a user

module.exports = router;