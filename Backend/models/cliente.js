const db = require('../db');

const Cliente = {
  async create(nome, email, telefone, endereco) {
    const result = await db.query(
      'INSERT INTO clientes (nome, email, telefone, endereco) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, telefone, endereco]
    );
    return result.rows[0];
  },
  async getAll() {
    const result = await db.query('SELECT * FROM clientes');
    return result.rows;
  },
  async getById(id) {
    const result = await db.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return result.rows[0];
  },
  async update(id, nome, email, telefone, endereco) {
    const result = await db.query(
      'UPDATE clientes SET nome = $1, email = $2, telefone = $3, endereco = $4 WHERE id = $5 RETURNING *',
      [nome, email, telefone, endereco, id]
    );
    return result.rows[0];
  },
  async delete(id) {
    const result = await db.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Cliente;
