const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');  // Import the Sequelize instance
const Review = require('./reviewModel');  // Import Review model for association

// Define the Bathroom model
const Bathroom = sequelize.define('Bathroom', {
    // Bathroom ID (Primary key, auto-incremented)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    // Bathroom name (e.g., "Main Campus Bathroom")
    name: {
        type: DataTypes.STRING,
        allowNull: false,  // Name cannot be null
    },

    // Description of the bathroom (e.g., "Located next to the library")
    description: {
        type: DataTypes.STRING,
        allowNull: true,  // Description is optional
    },

    // Date of bathroom addition (automatically managed by Sequelize)
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Default to the current timestamp
    },

}, {
    // Optional settings for timestamps (updatedAt, createdAt)
    timestamps: true,
    tableName: 'bathrooms',  // Set the table name in the database
});

module.exports = Bathroom;
