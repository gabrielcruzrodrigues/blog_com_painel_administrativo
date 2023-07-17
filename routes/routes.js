const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const ArticlesController = require('../controllers/ArticlesController');
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get('/', ArticlesController.home);

//categories
router.get('/categories', CategoriesController.categories);
router.post('/categories/save', CategoriesController.save)
router.post('/categories/delete', CategoriesController.delete);

//articles
router.post('/articles/save', ArticlesController.create);
router.post('/articles/delete', ArticlesController.delete);
router.get('/:slug', ArticlesController.article);
router.get('/category/:slug', ArticlesController.searchCategory)
router.get('/articles/page/:num', ArticlesController.page); //paginação

//categories Admin
router.get('/admin/categories/new', CategoriesController.createCategory);
router.get('/admin/categories', CategoriesController.AdmCategories);
router.get('/admin/categories/edit/:id', CategoriesController.edit);
router.post('/categories/update', CategoriesController.update);

//articles Admin
router.get('/admin/articles', ArticlesController.articles);
router.get('/articles/admin/new', ArticlesController.createArticle);
router.get('/admin/articles/edit/:id', ArticlesController.edit);
router.post('/articles/update', ArticlesController.update);

//User
router.get("/admin/users", UserController.findAll);
router.get("/admin/users/create", UserController.pageCreate);
router.post("/users/create", UserController.create);
router.get("/admin/users/edit/:id", UserController.edit);
router.post("/users/update", UserController.update);
router.post("/users/delete", UserController.delete);
router.get("/user/login", UserController.login);
router.post("/login/authenticate", UserController.authenticate);

module.exports = router;