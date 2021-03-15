const sequelize = require('../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('Workers', {
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
    }
}, {
    timestamps: false
});