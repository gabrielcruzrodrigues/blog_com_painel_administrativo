const Article = require('../model/ArticleModel');
const ArticlesModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');
const slugfy = require('slugify');

exports.home = (req, res) => {
    ArticlesModel.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
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
        include: [{ model: ArticlesModel }],
        order: [
            ['id', 'DESC']
        ]
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

exports.edit = (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.redirect('/admin/articles');
    };
    ArticlesModel.findByPk(id) 
        .then((article) => {
            CategoryModel.findAll().then((category) => {
                if(article != undefined) {
                    res.render('admin/articles/edit', {article: article, categories: category});
                } else {
                    res.redirect('/admin/articles');
                };
            })
        })
        .catch((error) => {
            res.redirect('/admin/categories');
        });
}

exports.update = (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    ArticlesModel.update(
        {title: title, body:body, categoryId: category, slug: slugfy(title)},
        {where: {id: id}}
    ).then(() => {
        res.redirect('/admin/articles');
    }).catch((error) => {
        console.log(error)
        res.redirect('/');
    });
};

//paginação
exports.page = (req, res) => {
    const page = req.params.num;
    let offsett = 0;
 
    if (isNaN(page) || page <= 1) {
        offsett = 0;
    } else {
        offsett = parseInt((page) * 4) - 4;
    }
    console.log(offsett);

    ArticlesModel.findAndCountAll({
        limit: 4, //define a quantidades de artigos
        offset: offsett  //define a partir de qual artigo ira começar a listagem
    }).then((articles) => {
        let next;
        if (offsett + 4 >= articles.count) {
            next = false;
        } else {
            next = true;
        };

        const result = {
            next: next,
            articles: articles
        }

        CategoryModel.findAll().then((categories) => {
            res.render('admin/articles/page', {categories: categories, results: result});
        });
    });
};