const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const debtRoutes = require('./routes/debtRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log("MongoDB connected for User data"))
.catch((err) => console.error("MongoDB connection error:", err));


app.use('/api/auth', userRoutes);
app.use('/api/debts', debtRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);

app.get('/', (req, res) => {
    res.send('SafeKeep Backend API is running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));