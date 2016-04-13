'use strict';

const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const port = process.env.port || 3000;

let app = express();

/* server configuration*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

/* import custom middlewares */
require('./middlewares')(app);

/* import routes */
require('./routes')(app);

app.listen(port, () => {
  console.log('Run server on port: ' + port);
});