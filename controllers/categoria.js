'use strict'

var CategoriaModel  = require('../models/categoria');
const connection = require('../includes/dbconfig');
var fs = require('fs');
var path = require('path');



var controller = {
            home:function(req,res){//action de prueba de controlador GET

                return res.status(200).send({message:'soy la home desde controlador'});

            },
            test:function(req,res){//action de prueba de controlador POST
                
                return res.status(200).send({message:'soy la test desde controlador'});
            },getCategoria:async function(req,res){//action del controlador encargado de obtener una categoria

              let _id = req.params.id;


             // return res.status(200).send({message:'soy la acction getCategoria del controlador:'+_id});

           
                try {
                  const newCategory = new CategoriaModel('');
                  const categoria = await newCategory.getCategory(_id);
                  return res.status(200).json({ categoria });
                } catch (error) {
                  console.error('Error al obtener categoria:', error);
                  return res.status(500).send('Error al obtener categoria');
                }

            },getCategorias:async function(req,res){//action del controlador encargado de obtener todas las categorias

          

           
                try {
                  const c = new CategoriaModel('');
                  const categoria = await newCategory.getCategorys();
                  return res.status(200).json({ categoria });
                } catch (error) {
                  console.error('Error al obtener categoria:', error);
                  return res.status(500).send('Error al obtener categoria');
                }

            },
            saveCategory:async  function(req,res){//accion para agregar una catgoria nva
                
                    const newCategoryData = {
                      //id: req.body.categoria_id,
                      nombre: req.body.nombre                
                    };             
                    const newCategory = new CategoriaModel(newCategoryData);
                    let  respuesta  = await newCategory.save();
                    return res.status(200).send({message:respuesta});
               


            },deleteCategory: async function(req,res){//action para eliminar una categoria

              let _id = req.params.id;
             

              try {
                const newCategory = new CategoriaModel('');
                const respuesta = await newCategory.deleteCategory(_id);
                return res.status(200).json({ respuesta });
              } catch (error) {
                console.error('Error al obtener categoria:', error);
                return res.status(500).send('Error al obtener cattegoria');
              }

             // return res.status(200).send({message:'metodo delete'});

        },UpdateCategory: async function(req,res){//action para hacer update de una categoria

          let _id = req.params.id;

          const newCategoryData = {
            //id: req.body.categoria_id,
            nombre: req.body.nombre                
          }; 
    
          const newCategory = new CategoriaModel(newCategoryData);
          let  respuesta  = await newCategory.updateCategory(_id,newCategoryData);

          return res.status(200).send({message:respuesta});

        }

            }



module.exports = controller;