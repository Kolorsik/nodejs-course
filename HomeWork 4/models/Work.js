const sequelize = require('../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('Works', {
    id: {
        field: 'Id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        field: 'Name',
        type: Sequelize.STRING,
        allowNull: false
    },
    salary: {
        field: 'Salary',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hoursPerDay: {
        field: 'HoursPerDay',
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});