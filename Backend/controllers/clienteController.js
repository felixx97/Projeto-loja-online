const Cliente = require('../models/cliente');

const createCliente = async (request, h) => {
  const { nome, email, telefone, endereco } = request.payload;
  try {
    const cliente = await Cliente.create(nome, email, telefone, endereco);
    return h.response(cliente).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao criar cliente' }).code(500);
  }
};

const getAllClientes = async (request, h) => {
  try {
    const clientes = await Cliente.getAll();
    return h.response(clientes).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar clientes' }).code(500);
  }
};

const getClienteById = async (request, h) => {
  const id = request.params.id;
  try {
    const cliente = await Cliente.getById(id);
    if (!cliente) {
      return h.response({ error: 'Cliente não encontrado' }).code(404);
    }
    return h.response(cliente).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar cliente' }).code(500);
  }
};

const updateCliente = async (request, h) => {
  const id = request.params.id;
  const { nome, email, telefone, endereco } = request.payload;
  try {
    const cliente = await Cliente.update(id, nome, email, telefone, endereco);
    if (!cliente) {
      return h.response({ error: 'Cliente não encontrado' }).code(404);
    }
    return h.response(cliente).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao atualizar cliente' }).code(500);
  }
};

const deleteCliente = async (request, h) => {
  const id = request.params.id;
  try {
    const cliente = await Cliente.delete(id);
    if (!cliente) {
      return h.response({ error: 'Cliente não encontrado' }).code(404);
    }
    return h.response({ message: 'Cliente deletado com sucesso' }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao deletar cliente' }).code(500);
  }
};

module.exports = {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
};
