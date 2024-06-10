const db = require('../db');

const PedidoProduto = {
  async create(id_pedido, id_produto, quantidade, preco) {
    const result = await db.query(
      'INSERT INTO pedido_produtos (id_pedido, id_produto, quantidade, preco) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_pedido, id_produto, quantidade, preco]
    );
    return result.rows[0];
  },
  async getAll() {
    const result = await db.query('SELECT * FROM pedido_produtos');
    return result.rows;
  },
  async getById(id) {
    const result = await db.query('SELECT * FROM pedido_produtos WHERE id = $1', [id]);
    return result.rows[0];
  },
  async update(id, id_pedido, id_produto, quantidade, preco) {
    const result = await db.query(
      'UPDATE pedido_produtos SET id_pedido = $1, id_produto = $2, quantidade = $3, preco = $4 WHERE id = $5 RETURNING *',
      [id_pedido, id_produto, quantidade, preco, id]
    );
    return result.rows[0];
  },
  async delete(id) {
    const result = await db.query('DELETE FROM pedido_produtos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = PedidoProduto;
