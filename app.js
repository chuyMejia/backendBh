'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//archivos de rutas

var productRoute = require('./rutes/product');



//midleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//configurar el cors 

//rutas
app.use('/api',productRoute);




module.exports  = app;