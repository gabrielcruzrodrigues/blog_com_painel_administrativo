const express = require('express');
const routes = require('./routes/routes.js');
const database = require('./db/database.js');
const app = express();
const port = 3000;

database.authenticate()
.then(() => {
    console.log('connection made successfully');
})
.catch((error) => {
    console.log(error);
});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`The server is running in port: ${port}`);
});