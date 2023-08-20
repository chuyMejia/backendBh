'use strict'

var Product = require('../models/producto');
const connection = require('../includes/dbconfig');

var controller = {
            home:function(req,res){

                return res.status(200).send({message:'soy la home desde controlador'});

            },
            test:function(req,res){
                
                return res.status(200).send({message:'soy la test desde controlador'});
            },
            saveProduct:async  function(req,res){
                
                    const newProductData = {
                      categoria_id: req.body.categoria_id,
                      nombre: req.body.nombre,
                      descripcion: req.body.descripcion,
                      precio: req.body.precio,
                      stock: req.body.stock,
                      oferta: req.body.oferta,
                     // fecha: '2023/',
                      image: req.body.image
                    };
              
                    const newProduct = new Product(newProductData);
                let  respuesta  = await newProduct.save();



                    return res.status(200).send({message:respuesta});
               
/*
class ProductModel {
  constructor(productData) {
    this.id = productData.id;
    this.categoria_id = productData.categoria_id;
    this.nombre = productData.nombre;
    this.descripcion = productData.descripcion;
    this.precio = productData.precio;
    this.stock = productData.stock;
    this.oferta = productData.oferta;
    this.fecha = productData.fecha;
    this.image = productData.image;
    // Puedes agregar más propiedades según tus necesidades
  }

*/

            }

}

module.exports = controller;