'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// RUTAS
var tienda_routes = require('./routes/tienda');
var authRoutes = require('./routes/auth');  

// todo lo que llega o se envia se convierte en JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configuración de cabeceras (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, X-Request-with, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/', tienda_routes);          
app.use('/api/auth', authRoutes);     

module.exports = app;
