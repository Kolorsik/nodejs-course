const {Sequelize} = require('sequelize');

module.exports = new Sequelize('<DB Name>', '<DB Username>', '<DB Password>', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});