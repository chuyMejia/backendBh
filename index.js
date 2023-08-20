'use strict'

const mysql = require('mysql2/promise'); 
var app = require('./app');
const port = 3700;

const connection = require('./includes/dbconfig'); 


// vars db
const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda_master'
};

connection
  .then(connection => {
    console.log('Conexión exitosa a la base de datos MySQL.');

    app.listen(port,()=>{
        console.log('SERVIDOR  CORECTAMENTE url localhost:3700');
    });

  }).catch(error => {
    console.error('Error:', error);
  });
