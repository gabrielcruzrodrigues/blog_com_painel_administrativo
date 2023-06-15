const CategoryModel = require('../model/CategoryModel');
const slugify = require('slugify');

exports.categories = (req, res) => {
    res.send('rotas de categorias');
};

exports.createCategory = (req, res) => {
    res.render('admin/categories/new');
};

exports.save = (req, res) => {
    const title = req.body.title;

    if (title != undefined) {
        CategoryModel.create({
            title: title,
            slug: slugify(title)
        })
            .then(() => {
                res.redirect('/');
            })
    } else {
        res.redirect('/admin/categories/new');
    }
};

exports.delete = (req, res) => {
    const id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            CategoryModel.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories');    
            })
        } else {
            res.redirect('/admin/categories');
        };
    } else {
        res.redirect('/admin/categories');
    };
};

exports.AdmCategories = (req, res) => {
    CategoryModel.findAll().then((categories) => {
        res.render('admin/categories/index', { categories: categories });
    })

};