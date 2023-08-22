'use strict';
const mysql = require('mysql2/promise');
//const connection = require('../includes/dbconfig');

const { connectDatabase } = require('../includes/db');



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
  
  }


  // Método para validar los datos antes de insertar
  /* validate() {
    if (!this.name || !this.email) {
      throw new Error('El nombre y el email son obligatorios.');
    }
    // Agregar más validaciones según tus necesidades
  }*/

  async save() {
    
    const connection = await connectDatabase();

    const query = `
      INSERT INTO productos (categoria_id, nombre, descripcion, precio, stock, oferta, fecha, image)
      VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?)
    `;

    const values = [
      this.categoria_id,
      this.nombre,
      this.descripcion,
      this.precio,
      this.stock,
      this.oferta,
      this.fecha,
      this.image
    ];

    try {
      const [result] = await connection.query(query, values);
      console.log('Producto insertado con ID:', result.insertId);
      return result.insertId;
    } catch (error) {
      console.error('Error al insertar producto:', error);
      return 'ocurio un error revisa LOG API para mas informacion';
    } 
  }

  async getProductos() {
   /* const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tienda_master'
    });*/

     const connection = await connectDatabase();

    try {
      const [rows] = await connection.query(`SELECT productos.*, categorias.nombre AS nombre_categoria
FROM productos
JOIN categorias ON productos.categoria_id = categorias.id;
`);
      return rows; // Devuelve los productos en lugar de usar res.json
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error; // Lanza el error para que el controlador lo maneje
    } 
  }

  async getProducto(id) {
    const connection = await connectDatabase();

    try {
      const [rows] = await connection.query(`SELECT * FROM productos WHERE id = ${id}`);
      return rows; // Devuelve los productos en lugar de usar res.json
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error; // Lanza el error para que el controlador lo maneje
    }
  }


  async updateProject(projectId, newData) {
    const connection = await connectDatabase();

    const query = `
      UPDATE productos
      SET categoria_id = ${newData.categoria_id}, nombre = '${newData.nombre}', descripcion = '${newData.descripcion}', precio = ${newData.precio}, stock = ${newData.stock},oferta = '${newData.oferta}',oferta = CURDATE()
      WHERE id = ${projectId}
    `;

//
    try {
      const [result] = await connection.query(query);
      console.log('Proyecto actualizado:', result.affectedRows);
      return projectId;
    } catch (error) {
      console.error('Error al actualizar proyecto:', error);
      return 'Ocurrió un error al actualizar el proyecto';
    } 
  }

  async deleteProject(projectId) {
    const connection = await connectDatabase();

    const query = `
      DELETE FROM productos
      WHERE id = ${projectId}
    `;

    try {
      const [result] = await connection.query(query, projectId);
      console.log('Proyecto eliminado:', result.affectedRows);
      return 'Proyecto eliminado con éxito';
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      return 'Ocurrió un error al eliminar el proyecto';
    } 
  }


  async updateImageInDatabase(projectId, fileName) {
    const connection = await connectDatabase();

    const query = 'UPDATE productos SET image = ? WHERE id = ?';
    const values = [fileName, projectId];

    try {
      await connection.query(query, values);
      console.log('Imagen actualizada en la base de datos');
    } catch (error) {
      console.error('Error al actualizar la imagen en la base de datos:', error);
    } 
  }


  


  async getProductoCategory(nombre) {
    const connection = await connectDatabase();

    try {
      const [rows] = await connection.query(`SELECT productos.*, categorias.nombre AS nombre_categoria
                                              FROM productos
                                            JOIN categorias ON productos.categoria_id = categorias.id
                                            WHERE categorias.nombre = '${nombre}'`);                 
      return rows; // Devuelve los productos en lugar de usar res.json
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error; // Lanza el error para que el controlador lo maneje
    }
  }



}

module.exports = ProductModel;
