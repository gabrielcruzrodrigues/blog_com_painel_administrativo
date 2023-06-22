const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const ArticlesController = require('../controllers/ArticlesController');
const ArticleModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

//categories
router.get('/categories', CategoriesController.categories);
router.post('/categories/save', CategoriesController.save)
router.post('/categories/delete', CategoriesController.delete);

//categories Admin
router.get('/admin/categories/new', CategoriesController.createCategory);
router.get('/admin/categories', CategoriesController.AdmCategories);
router.get('/admin/categories/edit/:id', CategoriesController.edit);
router.post('/categories/update', CategoriesController.update);

//articles
router.get('/articles', ArticlesController.articles);

//articles Admin
router.get('/articles/admin/new', ArticlesController.createArticle);
module.exports = router;