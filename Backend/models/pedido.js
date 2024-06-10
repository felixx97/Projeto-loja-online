const db = require('../db');

const Pedido = {
  async create(id_cliente, data_pedido, status, total) {
    const result = await db.query(
      'INSERT INTO pedidos (id_cliente, data_pedido, status, total) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_cliente, data_pedido, status, total]
    );
    return result.rows[0];
  },
  async getAll() {
    const result = await db.query('SELECT * FROM pedidos');
    return result.rows;
  },
  async getById(id) {
    const result = await db.query('SELECT * FROM pedidos WHERE id = $1', [id]);
    return result.rows[0];
  },
  async update(id, id_cliente, data_pedido, status, total) {
    const result = await db.query(
      'UPDATE pedidos SET id_cliente = $1, data_pedido = $2, status = $3, total = $4 WHERE id = $5 RETURNING *',
      [id_cliente, data_pedido, status, total, id]
    );
    return result.rows[0];
  },
  async delete(id) {
    const result = await db.query('DELETE FROM pedidos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Pedido;
