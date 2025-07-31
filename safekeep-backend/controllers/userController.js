const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

exports.registerBusinessOwner = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User with that username or email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
            role: 'BUSINESS_OWNER'
        });

        await user.save();

        const token = generateToken(user);

        res.status(201).json({
            message: 'Business Owner registered successfully!',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Error registering business owner:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

exports.registerCashier = async (req, res) => {
    try {
        if (req.user.role !== 'BUSINESS_OWNER') {
            return res.status(403).json({ message: 'Forbidden: Only Business Owners can register cashiers.' });
        }

        const { username, email, password } = req.body;

        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User with that username or email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
            role: 'CASHIER'
        });

        await user.save();

        res.status(201).json({
            message: 'Cashier registered successfully!',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error registering cashier:', error);
        res.status(500).json({ message: 'Server error during cashier registration.' });
    }
};

exports.registerInventoryManager = async (req, res) => {
    try {
        if (req.user.role !== 'BUSINESS_OWNER') {
            return res.status(403).json({ message: 'Forbidden: Only Business Owners can register inventory managers.' });
        }

        const { username, email, password } = req.body;

        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User with that username or email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
            role: 'INVENTORY_MANAGER'
        });

        await user.save();

        res.status(201).json({
            message: 'Inventory Manager registered successfully!',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error registering inventory manager:', error);
        res.status(500).json({ message: 'Server error during inventory manager registration.' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await User.findOne({ 
            username: { $regex: new RegExp(`^${username}$`, 'i') } 
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: 'Logged in successfully!',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'BUSINESS_OWNER') {
            return res.status(403).json({ message: 'Forbidden: Only Business Owners can view all users.' });
        }
        const users = await User.find().select('-password');
        res.status(200).json(users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        })));
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Server error fetching users.' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error fetching profile.' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (email) {
            user.email = email;
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully!', user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error updating profile.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'BUSINESS_OWNER') {
            return res.status(403).json({ message: 'Forbidden: Only Business Owners can delete users.' });
        }

        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error deleting user.' });
    }
};