'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//archivos de rutas

var productRoute = require('./rutes/product');
var categoryRoute = require('./rutes/categoria');



//midleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//configurar el cors// 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/api',productRoute,categoryRoute);




module.exports  = app;