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

  async getProductos() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tienda_master'
    });

    try {
      const [rows] = await connection.query('SELECT * FROM productos');
      return rows; // Devuelve los productos en lugar de usar res.json
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error; // Lanza el error para que el controlador lo maneje
    } finally {
      connection.end(); // Cierra la conexión cuando hayas terminado
    }
  }

  async getProducto(id) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tienda_master'
    });

    try {
      const [rows] = await connection.query(`SELECT * FROM productos WHERE id = ${id}`);
      return rows; // Devuelve los productos en lugar de usar res.json
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error; // Lanza el error para que el controlador lo maneje
    } finally {
      connection.end(); // Cierra la conexión cuando hayas terminado
    }
  }


  async updateProject(projectId, newData) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tienda_master'
    });

    const query = `
      UPDATE productos
      SET categoria_id = ${newData.categoria_id}, nombre = '${newData.nombre}', descripcion = '${newData.descripcion}', precio = ${newData.precio}, stock = ${newData.stock},oferta = '${newData.oferta}',oferta = CURDATE()
      WHERE id = ${projectId}
    `;


    try {
      const [result] = await connection.query(query);
      console.log('Proyecto actualizado:', result.affectedRows);
      return 'Proyecto actualizado con éxito';
    } catch (error) {
      console.error('Error al actualizar proyecto:', error);
      return 'Ocurrió un error al actualizar el proyecto';
    } finally {
      connection.end();
    }
  }

  async deleteProject(projectId) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tienda_master'
    });

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
    } finally {
      connection.end();
    }
  }


  async updateImageInDatabase(projectId, fileName) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tienda_master'
    });

    const query = 'UPDATE productos SET image = ? WHERE id = ?';
    const values = [fileName, projectId];

    try {
      await connection.query(query, values);
      console.log('Imagen actualizada en la base de datos');
    } catch (error) {
      console.error('Error al actualizar la imagen en la base de datos:', error);
    } finally {
      connection.end();
    }
  }

}

module.exports = ProductModel;
