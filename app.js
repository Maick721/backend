'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var tienda_routes = require('./routes/tienda');

// todo lo que llega o se envia se convierte en JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//condiguracion de caberceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, X-Request-with, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use('/', tienda_routes);

module.exports = app;