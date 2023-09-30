const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRoute = require('./routes/index.js');

app.get('/', indexRoute);

app.get('/about', indexRoute);

app.get('/services', indexRoute);

app.get('/projects', indexRoute);

app.get('/contact', indexRoute);

app.post("/contact", indexRoute)




app.listen(process.env.PORT || port, function() {
    console.log('Server has started sucessfully on port',port);
  });