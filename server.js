require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const protect = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// this is our Protected test route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, you are authenticated.` });
});

// here Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));