const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');  // Import your DB connection from utils/db.js
const bcrypt = require('bcryptjs');

// Define the User model
const User = sequelize.define('User', {
    // User's ID (primary key, auto-increment)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    // Username
    username: {
        type: DataTypes.STRING,
        allowNull: false,
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

// Hash password before saving the user to the database
User.beforeCreate(async (user) => {
    // Hash password if it's not already hashed
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10); // Hash with 10 salt rounds
    }
});

// Method to compare password during login
User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);  // Compare input password with stored hashed password
};

module.exports = User;
