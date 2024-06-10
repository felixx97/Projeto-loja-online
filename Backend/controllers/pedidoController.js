const Pedido = require('../models/pedido');

const createPedido = async (request, h) => {
  const { id_cliente, data_pedido, status, total } = request.payload;
  try {
    const pedido = await Pedido.create(id_cliente, data_pedido, status, total);
    return h.response(pedido).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao criar pedido' }).code(500);
  }
};

const getAllPedidos = async (request, h) => {
  try {
    const pedidos = await Pedido.getAll();
    return h.response(pedidos).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar pedidos' }).code(500);
  }
};

const getPedidoById = async (request, h) => {
  const id = request.params.id;
  try {
    const pedido = await Pedido.getById(id);
    if (!pedido) {
      return h.response({ error: 'Pedido não encontrado' }).code(404);
    }
    return h.response(pedido).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar pedido' }).code(500);
  }
};

const updatePedido = async (request, h) => {
  const id = request.params.id;
  const { id_cliente, data_pedido, status, total } = request.payload;
  try {
    const pedido = await Pedido.update(id, id_cliente, data_pedido, status, total);
    if (!pedido) {
      return h.response({ error: 'Pedido não encontrado' }).code(404);
    }
    return h.response(pedido).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao atualizar pedido' }).code(500);
  }
};

const deletePedido = async (request, h) => {
  const id = request.params.id;
  try {
    const pedido = await Pedido.delete(id);
    if (!pedido) {
      return h.response({ error: 'Pedido não encontrado' }).code(404);
    }
    return h.response({ message: 'Pedido deletado com sucesso' }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao deletar pedido' }).code(500);
  }
};

module.exports = {
  createPedido,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
};
