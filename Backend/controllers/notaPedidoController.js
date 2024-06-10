const NotaPedido = require('../models/notaPedido');

const createNotaPedido = async (request, h) => {
  const { id_pedido, nota, comentario } = request.payload;
  try {
    const notaPedido = await NotaPedido.create(id_pedido, nota, comentario);
    return h.response(notaPedido).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao criar nota do pedido' }).code(500);
  }
};

const getAllNotaPedidos = async (request, h) => {
  try {
    const notaPedidos = await NotaPedido.getAll();
    return h.response(notaPedidos).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar notas dos pedidos' }).code(500);
  }
};

const getNotaPedidoById = async (request, h) => {
  const id = request.params.id;
  try {
    const notaPedido = await NotaPedido.getById(id);
    if (!notaPedido) {
      return h.response({ error: 'Nota do pedido não encontrada' }).code(404);
    }
    return h.response(notaPedido).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar nota do pedido' }).code(500);
  }
};

const updateNotaPedido = async (request, h) => {
  const id = request.params.id;
  const { id_pedido, nota, comentario } = request.payload;
  try {
    const notaPedido = await NotaPedido.update(id, id_pedido, nota, comentario);
    if (!notaPedido) {
      return h.response({ error: 'Nota do pedido não encontrada' }).code(404);
    }
    return h.response(notaPedido).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao atualizar nota do pedido' }).code(500);
  }
};

const deleteNotaPedido = async (request, h) => {
  const id = request.params.id;
  try {
    const notaPedido = await NotaPedido.delete(id);
    if (!notaPedido) {
      return h.response({ error: 'Nota do pedido não encontrada' }).code(404);
    }
    return h.response({ message: 'Nota do pedido deletada com sucesso' }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao deletar nota do pedido' }).code(500);
  }
};

module.exports = {
  createNotaPedido,
  getAllNotaPedidos,
  getNotaPedidoById,
  updateNotaPedido,
  deleteNotaPedido,
};
