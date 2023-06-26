const ArticlesModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');
const slugfy = require('slugify');

exports.home = (req, res) => {
    ArticlesModel.findAll().then((articles) => {
        res.render('index', {articles: articles});
    });
};

exports.articles = (req, res) => {
    ArticlesModel.findAll({
        include: [{model: CategoryModel}]
    }).then((articles) => {
        res.render('admin/articles/index', {articles: articles});
    });
};

exports.article = (req, res) => {
    const slug = req.params.slug;
    ArticlesModel.findOne({
        where: {
            slug: slug
        }
    }).then((article) => {
        if (article != undefined) {
            res.render('article', {article: article});
        } else {
            res.redirect('/');
        }
    }).catch((error) => {
        res.redirect('/');  
    })
}

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

exports.delete = (req, res) => {
    const id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            ArticlesModel.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles');    
            });
        } else {
            res.redirect('/admin/articles');
        };
    } else {
        res.redirect('/admin/articles');
    }
};