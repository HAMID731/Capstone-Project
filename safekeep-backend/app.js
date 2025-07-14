// app.js
const debtRoutes = require('./routes/debtRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const salesRoutes = require('./routes/salesRoutes');

dotenv.config();
const app = express();

app.use('/api/debts', debtRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use(cors());
app.use(express.json());

app.use('/api/sales', salesRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
