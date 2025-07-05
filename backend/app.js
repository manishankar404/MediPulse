const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { checkAndCreateReorders } = require('./controllers/reorderController'); // ✅ keep this one

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const batchRoutes = require('./routes/batchRoutes');
app.use('/api/batches', batchRoutes);

const saleRoutes = require('./routes/saleRoutes');
app.use('/api/sales', saleRoutes);

const reorderRoutes = require('./routes/reorderRoutes');
app.use('/api/reorder', reorderRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/order', orderRoutes);     // existing
app.use('/api/reorder', orderRoutes);   // add this line ✅


// Root
app.get('/', (req, res) => {
  res.send('MediPulse API is running ✅');
});

// Connect DB and start server
const connectDB = require('./config/db');
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    checkAndCreateReorders(); // 🚨 this will now work correctly
  });
});
