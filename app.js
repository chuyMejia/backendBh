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



//configurar el cors 

//rutas
app.use('/api',productRoute,categoryRoute);




module.exports  = app;