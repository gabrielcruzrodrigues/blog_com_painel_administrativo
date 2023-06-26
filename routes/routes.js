const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const ArticlesController = require('../controllers/ArticlesController');
const ArticleModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');
const router = express.Router();

router.get('/', ArticlesController.home);

//categories
router.get('/categories', CategoriesController.categories);
router.post('/categories/save', CategoriesController.save)
router.post('/categories/delete', CategoriesController.delete);

//articles
router.get('/admin/articles', ArticlesController.articles);
router.post('/articles/save', ArticlesController.create);
router.post('/articles/delete', ArticlesController.delete);
router.get('/:slug', ArticlesController.article);

//categories Admin
router.get('/admin/categories/new', CategoriesController.createCategory);
router.get('/admin/categories', CategoriesController.AdmCategories);
router.get('/admin/categories/edit/:id', CategoriesController.edit);
router.post('/categories/update', CategoriesController.update);


//articles Admin
router.get('/articles/admin/new', ArticlesController.createArticle);
module.exports = router;