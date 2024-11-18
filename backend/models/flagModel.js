const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');  // Import the Sequelize instance
const Review = require('./reviewModel');  // Import Review model to associate flags with reviews
const User = require('./userModel');  // Import User model to associate flags with users

// Define the Flag model
const Flag = sequelize.define('Flag', {
    // Flag ID (Primary key, auto-incremented)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    // Reason for flagging (e.g., inappropriate content, spam)
    reason: {
        type: DataTypes.STRING,
        allowNull: true, 
    },

    // Date of flag creation (automatically managed by Sequelize)
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Default to the current timestamp
    },

}, {
    // Optional settings for timestamps (updatedAt, createdAt)
    timestamps: true,
    tableName: 'flags',  // Set the table name in the database
});

module.exports = Flag;
