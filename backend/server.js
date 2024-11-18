// Import necessary libraries
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./utils/db');  // Sequelize connection
const authRoutes = require('./routes/authRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('./models/associations');  // Import associations between models

// Load environment variables from .env
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(morgan('dev'));  // Log requests for development
app.use(express.json());  // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes (login, signup, etc.)
app.use('/api/buildings', buildingRoutes);  // Bathroom-related routes
// Admin routes, protected by authentication and authorization (admin only)
app.use('/api/admin', adminRoutes);  // Admin routes like manage reviews, bathrooms

// Basic root route
app.get('/', (req, res) => {
    res.send('Welcome to the Bathroom Review App!');
});

// Error handling middleware (for 404s and other errors)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Global error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message || 'Something went wrong!',
    });
});

// Sync the database and start the server
sequelize.sync().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
});
