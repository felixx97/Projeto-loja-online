const db = require('../db');

const Produto = {
  async create(titulo, artista, genero, tipo, preco, estoque) {
    const result = await db.query(
      'INSERT INTO produtos (titulo, artista, genero, tipo, preco, estoque) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titulo, artista, genero, tipo, preco, estoque]
    );
    return result.rows[0];
  },
  async getAll() {
    const result = await db.query('SELECT * FROM produtos');
    return result.rows;
  },
  async getById(id) {
    const result = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);
    return result.rows[0];
  },
  async update(id, titulo, artista, genero, tipo, preco, estoque) {
    const result = await db.query(
      'UPDATE produtos SET titulo = $1, artista = $2, genero = $3, tipo = $4, preco = $5, estoque = $6 WHERE id = $7 RETURNING *',
      [titulo, artista, genero, tipo, preco, estoque, id]
    );
    return result.rows[0];
  },
  async delete(id) {
    const result = await db.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Produto;
