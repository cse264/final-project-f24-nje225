// buildings have an id, name, latitude, longitude. They have many bathrooms.

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');  // Import the Sequelize instance
const Bathroom = require('./bathroomModel');  // Import Bathroom model for association

// Define the Building model
const Building = sequelize.define('Building', {
    // Building ID (Primary key, auto-incremented)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    // Building name (e.g., "Main Campus Building")
    name: {
        type: DataTypes.STRING,
        allowNull: false,  // Name cannot be null
    },

    // Latitude of the building location
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,  // Latitude cannot be null
    },

    // Longitude of the building location
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,  // Longitude cannot be null
    },

    // Description of the building (e.g., "Located next to the library")
    description: {
        type: DataTypes.STRING,
        allowNull: true,  // Description is optional
    },

    // Date of building addition (automatically managed by Sequelize)
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Default to the current timestamp
    },

}, {
    // Optional settings for timestamps (updatedAt, createdAt)
    timestamps: true,
    tableName: 'buildings',  // Set the table name in the database
});

module.exports = Building;