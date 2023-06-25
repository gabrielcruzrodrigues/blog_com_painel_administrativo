const ArticlesModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');
const slugfy = require('slugify');


exports.articles = (req, res) => {
    ArticlesModel.findAll().then((articles) => {
        res.render('admin/articles/index', {articles: articles});
    });
    
};

exports.createArticle = (req, res) => {
    CategoryModel.findAll().then((categories) => {
        res.render('admin/articles/new', { categories: categories });
    });
};

exports.create = (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    ArticlesModel.create({
        title: title,
        slug: slugfy(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles');
    })
};