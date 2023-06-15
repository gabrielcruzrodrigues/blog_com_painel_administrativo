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

    if(title != undefined) {
        CategoryModel.create({
            title: title,
            slug: slugify(title)
        })
        .then(() => {
            res.redirect('/');
        })
    } else {
        res.redirect('admin/categories/new');
    }
};

exports.AdmCategories = (req, res) => {
    CategoryModel.findAll().then((categories) => {
        res.render('admin/categories/index', { categories:categories });
    })
    
};