const ArticlesModel = require('../model/ArticleModel');

exports.articles = (req, res) => {
    res.send('articles');
}

exports.createArticle = (req, res) => {
    res.render('admin/articles/new');
}