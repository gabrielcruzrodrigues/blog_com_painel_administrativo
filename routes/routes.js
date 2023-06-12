const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const ArticlesController = require('../controllers/ArticlesController');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

//categories
router.get('/categories', CategoriesController.categories);

//articles
router.get('/articles', ArticlesController.articles);
module.exports = router;