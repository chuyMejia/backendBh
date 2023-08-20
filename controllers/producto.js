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
            saveProduct:async  function(req,res){//accion para agregar un producto
                
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
               


            },getProductos: async function getProductos(req, res) {//accion para obtener todos los productos
              try {
                const newProduct = new Product('');
                const productos = await newProduct.getProductos();
                return res.status(200).json({ productos });
              } catch (error) {
                console.error('Error al obtener productos:', error);
                return res.status(500).send('Error al obtener productos');
              }
            }


            }



module.exports = controller;