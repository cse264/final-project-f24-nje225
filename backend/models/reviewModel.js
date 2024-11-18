const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');  // Import the Sequelize instance
const User = require('./userModel');  // Import User model for the association
const Bathroom = require('./bathroomModel');  // Import Bathroom model for the association

// Define the Review model
const Review = sequelize.define('Review', {
    // Review ID (Primary key, auto-incremented)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    // Review content
    content: {
        type: DataTypes.STRING,
        allowNull: false,  // Content cannot be null
    },

    // Rating (1-5 stars)
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,  // Rating should be between 1 and 5
        },
    },

    // Date of the review (automatically managed by Sequelize)
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Default to the current timestamp
    },

}, {
    // Optional settings for timestamps (updatedAt, createdAt)
    timestamps: true,
    tableName: 'reviews',  // Set the table name in the database
});

module.exports = Review;
