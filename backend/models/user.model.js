const { DataTypes } = require('sequelize');
const { seq } = require('../database');

const User = seq.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, { timestamps: false });

module.exports = User;
