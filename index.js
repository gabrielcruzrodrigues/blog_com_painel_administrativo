const express = require('express');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const database = require('./db/database.js');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

database.authenticate()
    .then(() => {
        console.log('connection made successfully');
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(port, () => {
    console.log(`The server is running in port: ${port}`);
});