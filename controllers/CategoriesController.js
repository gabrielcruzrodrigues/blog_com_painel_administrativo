exports.categories = (req, res) => {
    res.send('rotas de categorias');
};

exports.createCategory = (req, res) => {
    res.render('admin/categories/new');  
}