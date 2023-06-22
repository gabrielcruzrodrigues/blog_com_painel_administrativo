const ArticlesModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');

exports.articles = (req, res) => {
    res.send('articles');
}

exports.createArticle = (req, res) => {
    CategoryModel.findAll().then((categories) => {
        res.render('admin/articles/new', { categories: categories });
    })
}