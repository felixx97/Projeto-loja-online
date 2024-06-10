const db = require('../db');

const NotaPedido = {
  async create(id_pedido, nota, comentario) {
    const result = await db.query(
      'INSERT INTO nota_pedidos (id_pedido, nota, comentario) VALUES ($1, $2, $3) RETURNING *',
      [id_pedido, nota, comentario]
    );
    return result.rows[0];
  },
  async getAll() {
    const result = await db.query('SELECT * FROM nota_pedidos');
    return result.rows;
  },
  async getById(id) {
    const result = await db.query('SELECT * FROM nota_pedidos WHERE id = $1', [id]);
    return result.rows[0];
  },
  async update(id, id_pedido, nota, comentario) {
    const result = await db.query(
      'UPDATE nota_pedidos SET id_pedido = $1, nota = $2, comentario = $3 WHERE id = $4 RETURNING *',
      [id_pedido, nota, comentario, id]
    );
    return result.rows[0];
  },
  async delete(id) {
    const result = await db.query('DELETE FROM nota_pedidos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = NotaPedido;
