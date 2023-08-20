'use strict';
const mysql = require('mysql2/promise');
//const connection = require('../includes/dbconfig'); // Ajusta la ruta según la ubicación real



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


  // Método para validar los datos antes de insertar
  /* validate() {
    if (!this.name || !this.email) {
      throw new Error('El nombre y el email son obligatorios.');
    }
    // Agregar más validaciones según tus necesidades
  }*/

  async save() {
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tienda_master'
    });

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
      return 'producto insertado con exito';
    } catch (error) {
      console.error('Error al insertar producto:', error);
      return 'ocurio un error revisa LOG API para mas informacion';
    } finally {
      connection.end();
    }
  }
}

module.exports = ProductModel;
