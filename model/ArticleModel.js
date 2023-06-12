const Sequelize = require('sequelize');
const connection = require('../db/database');
const Category = require('./CategoryModel');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT
    }
});

Article.belongsTo(Category);
Category.hasMany(Article);

module.exports = Article;