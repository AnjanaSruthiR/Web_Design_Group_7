// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

//auth routes under /api/auth
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//event routes
const eventRoutes = require('./routes/event');
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
