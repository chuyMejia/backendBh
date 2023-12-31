'use strict';
const mysql = require('mysql2/promise');
//const connection = require('../includes/dbconfig');
const { connectDatabase } = require('../includes/db');


class CategoriaModel {
  constructor(categoriaData) {
    this.id = categoriaData.id;
    this.categoria_id = categoriaData.categoria_id;
    this.nombre = categoriaData.nombre;
  }
    
//


  async getCategory(id) {
   const connection = await connectDatabase();

    try {
      const [rows] = await connection.query(`SELECT * FROM CATEGORIAS WHERE id = ${id}`);
      return rows; // Devuelve los CATEGORIAS en lugar de usar res.json
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error; 
    } 
  }




  
  async getCategorys() {
   const connection = await connectDatabase();

    try {
      const [rows] = await connection.query(`SELECT * FROM CATEGORIAS`);
      return rows; // Devuelve los CATEGORIAS en lugar de usar res.json
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error; 
    } 
  }



  
  async save() {
    
 const connection = await connectDatabase();

    const query = `
      INSERT INTO categorias ( nombre)
      VALUES (?)
    `;

    const values = [
    
      this.nombre
    
    ];

    try {
      const [result] = await connection.query(query, values);
      console.log('Producto insertado con ID:', result.insertId);
      return 'producto insertado con exito';
    } catch (error) {
      console.error('Error al insertar producto:', error);
      return 'ocurio un error revisa LOG API para mas informacion';
    } 
  }
  //deleteCategory


  
  async deleteCategory(cat_id) {
   const connection = await connectDatabase();

    const query = `
      DELETE FROM categorias
      WHERE id = ${cat_id}
    `;

    try {
      const [result] = await connection.query(query, cat_id);
      console.log('categoria eliminado:', result.affectedRows);
      return 'categoria eliminado con éxito';
    } catch (error) {
      console.error('Error al eliminar categoria:', error);
      return 'Ocurrió un error al eliminar el categoria';
    } 
  }

  //updateCategory
  async updateCategory(categoryId, newData) {
  const connection = await connectDatabase();

    const query = `
      UPDATE categorias
      SET nombre = '${newData.nombre}'
      WHERE id = ${categoryId}
    `;


    try {
      const [result] = await connection.query(query);
      console.log('categoria actualizado:', result.affectedRows);
      return 'categoria actualizado con éxito';
    } catch (error) {
      console.error('Error al actualizar categoria:', error);
      return 'Ocurrió un error al actualizar el categoria';
    } 
  }

}  


module.exports = CategoriaModel;