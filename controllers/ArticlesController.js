const ArticlesModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');
const slugfy = require('slugify');

exports.home = (req, res) => {
    ArticlesModel.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then((articles) => {
        CategoryModel.findAll().then((categories) => {
            res.render('index', { articles: articles, categories: categories });
        })
    });
};

exports.articles = (req, res) => {
    ArticlesModel.findAll({
        include: [{ model: CategoryModel }]
    }).then((articles) => {
        res.render('admin/articles/index', { articles: articles });
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
            CategoryModel.findAll().then((categories) => {
                res.render('article', { articles: article, categories: categories });
            });
        } else {
            res.redirect('/');
        }
    }).catch((error) => {
        res.redirect('/');
    });
};

// exports.searchCategory = (req, res) => {
//     const slug = req.params.slug;
//     CategoryModel.findOne({
//         where: {
//             slug: slug
//         },
//         include: [{model: ArticlesModel}]
//     }).then((category) => {
//         if (category != undefined) {
//             CategoryModel.findAll().then((categories) => {
//                 console.log(category.articles);
//                 res.render('index', { articles: category.articles, categories: categories })
//             })
//         } else {
//             res.redirect('/')
//         };
//     }).catch((error) => {
//         res.redirect('/');
//     })
// }

exports.searchCategory = (req, res) => {
    const slug = req.params.slug;
    CategoryModel.findOne({
        where: {
            slug: slug
        },
        include: [{ model: ArticlesModel }]
    }).then((category) => {
        if (category != undefined) {
            CategoryModel.findAll().then((categories) => {
                res.render('category', { articles: category.articles, categories: categories, category: category });
            });
        } else {
            res.redirect('/')
        };
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