const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');  // Import your DB connection from utils/db.js
const bcrypt = require('bcryptjs');

// Define the User model
const User = sequelize.define('User', {

    // Username
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,  // Set as primary key
        unique: true,  // Ensures each username is unique
    },

    // Email
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Ensures each email is unique
        validate: {
            isEmail: true,  // Ensures the value is a valid email format
        },
    },

    // Hashed password
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    // User role (default to 'user', can be changed for admin)
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },

}, {
    // Optional settings for timestamps (createdAt, updatedAt)
    timestamps: true,
    tableName: 'users',  // Set the table name in the database
});

module.exports = User;
