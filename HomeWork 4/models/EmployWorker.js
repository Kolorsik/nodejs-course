const sequelize = require('../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define("EmployWorker", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    }
});