const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const ArticlesController = require('../controllers/ArticlesController');
const UserController = require("../controllers/UserController");
const router = express.Router();
const adminAuth = require('../middlewars/adminAuth'); 

router.get('/', ArticlesController.home);

//categories
router.get('/categories', CategoriesController.categories);
router.post('/categories/save', adminAuth, CategoriesController.save)
router.post('/categories/delete', adminAuth, CategoriesController.delete);

//articles
router.post('/articles/save', adminAuth, ArticlesController.create);
router.post('/articles/delete', adminAuth, ArticlesController.delete);
router.get('/:slug', ArticlesController.article);
router.get('/category/:slug', ArticlesController.searchCategory)
router.get('/articles/page/:num', ArticlesController.page); //paginação

//categories Admin
router.get('/admin/categories/new', adminAuth, CategoriesController.createCategory);
router.get('/admin/categories', adminAuth, CategoriesController.AdmCategories);
router.get('/admin/categories/edit/:id', adminAuth, CategoriesController.edit);
router.post('/categories/update', adminAuth, CategoriesController.update);

//articles Admin
router.get('/admin/articles', adminAuth, ArticlesController.articles);
router.get('/articles/admin/new', adminAuth, ArticlesController.createArticle);
router.get('/admin/articles/edit/:id', adminAuth, ArticlesController.edit);
router.post('/articles/update', adminAuth, ArticlesController.update);

//User
router.get("/admin/users", adminAuth, UserController.findAll);
router.get("/admin/users/create", adminAuth, UserController.pageCreate);
router.post("/users/create", adminAuth, UserController.create);
router.get("/admin/users/edit/:id", adminAuth, UserController.edit);
router.post("/users/update", adminAuth, UserController.update);
router.post("/users/delete", adminAuth, UserController.delete);
router.get("/user/login", UserController.login);
router.post("/login/authenticate", UserController.authenticate);
router.get("/user/logout", UserController.logout);

module.exports = router;