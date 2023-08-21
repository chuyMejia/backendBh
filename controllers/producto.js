'use strict'

var Product = require('../models/producto');
const connection = require('../includes/dbconfig');
var fs = require('fs');
var path = require('path');



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

            },getProducto:async function(req,res){

              let _id = req.params.id;

             // return res.status(200).send({message:'gola desde controller getProducto:'+_id});
                try {
                  const newProduct = new Product('');
                  const productos = await newProduct.getProducto(_id);
                  return res.status(200).json({ productos });
                } catch (error) {
                  console.error('Error al obtener productos:', error);
                  return res.status(500).send('Error al obtener productos');
                }

            },UpdateProduct: async function(req,res){//action para hacer update de un producto

              let _id = req.params.id;

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
              let  respuesta  = await newProduct.updateProject(_id,newProductData);

              return res.status(200).send({message:respuesta});

            },deleteProject: async function(req,res){//action para eliminar un producto

                  let _id = req.params.id;
                 

                  try {
                    const newProduct = new Product('');
                    const productos = await newProduct.deleteProject(_id);
                    return res.status(200).json({ productos });
                  } catch (error) {
                    console.error('Error al obtener productos:', error);
                    return res.status(500).send('Error al obtener productos');
                  }

                 // return res.status(200).send({message:'metodo delete'});

            },uploadImage:async function(req,res){//subo la imagen

              const projectId = req.params.id;
              let fileName = 'imagen no subida....';
              
              if (req.files) {
                const filePath = req.files.image.path;
                const filesplit = filePath.split('\\');
                fileName = filesplit[1];
                const extSplit = fileName.split('.');
                const fileExt = extSplit[1];
                
                if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif') {
                
                    //updateImageInDatabase
                    try {
                      const newProduct = new Product('');
                      const productos = await newProduct.updateImageInDatabase(projectId,fileName);
                      //return res.status(200).json({ productos });
                      return res.status(200).send({message:'Imagen guardada en servidor'});
                    } catch (error) {
                      console.error('Error al obtener productos:', error);
                      return res.status(500).send('Error al obtener productos');
                    }
            
                  // Mueve la imagen a la carpeta "image"
                  const newFilePath = `./image/${fileName}`;
                  fs.rename(filePath, newFilePath, err => {
                    if (err) {
                      console.error('Error al mover la imagen:', err);
                    }
                  });
            
                  return res.status(200).send({ message: 'Imagen subida y actualizada con éxito' });
                } else {
                  fs.unlink(filePath, err => {
                    return res.status(200).send({ message: 'Extensión no válida' });
                  });
                }
              } else {
                return res.status(200).send({ message: fileName });
              }
        
              
            },getImageFile:function(req,res){//obtengo la imagen para mostar
              var file = req.params.image;
              var path_file = './uploads/'+file;
              fs.exists(path_file,(exists)=>{
                  if(exists){
                    console.log('ruta es:'+path.resolve(path_file));
                    return res.sendFile(path.resolve(path_file));
                  }else{
                    return res.status(200).send({
                      message:'no existe el archivo de imagen..'
                    });
                  }
      
              });
      
          }


            }



module.exports = controller;