const Sequelize = require('sequelize');
const connection = require('../db/database');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Category.sync({force: false}); // rodar toda vez que for usar um novo banco de dados

module.exports = Category;