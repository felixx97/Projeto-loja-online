const PedidoProduto = require('../models/pedidoProduto');

const createPedidoProduto = async (request, h) => {
  const { id_pedido, id_produto, quantidade, preco } = request.payload;
  try {
    const pedidoProduto = await PedidoProduto.create(id_pedido, id_produto, quantidade, preco);
    return h.response(pedidoProduto).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao criar item do pedido' }).code(500);
  }
};

const getAllPedidoProdutos = async (request, h) => {
  try {
    const pedidoProdutos = await PedidoProduto.getAll();
    return h.response(pedidoProdutos).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar itens do pedido' }).code(500);
  }
};

const getPedidoProdutoById = async (request, h) => {
  const id = request.params.id;
  try {
    const pedidoProduto = await PedidoProduto.getById(id);
    if (!pedidoProduto) {
      return h.response({ error: 'Item do pedido não encontrado' }).code(404);
    }
    return h.response(pedidoProduto).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar item do pedido' }).code(500);
  }
};

const updatePedidoProduto = async (request, h) => {
  const id = request.params.id;
  const { id_pedido, id_produto, quantidade, preco } = request.payload;
  try {
    const pedidoProduto = await PedidoProduto.update(id, id_pedido, id_produto, quantidade, preco);
    if (!pedidoProduto) {
      return h.response({ error: 'Item do pedido não encontrado' }).code(404);
    }
    return h.response(pedidoProduto).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao atualizar item do pedido' }).code(500);
  }
};

const deletePedidoProduto = async (request, h) => {
  const id = request.params.id;
  try {
    const pedidoProduto = await PedidoProduto.delete(id);
    if (!pedidoProduto) {
      return h.response({ error: 'Item do pedido não encontrado' }).code(404);
    }
    return h.response({ message: 'Item do pedido deletado com sucesso' }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao deletar item do pedido' }).code(500);
  }
};

module.exports = {
  createPedidoProduto,
  getAllPedidoProdutos,
  getPedidoProdutoById,
  updatePedidoProduto,
  deletePedidoProduto,
};
