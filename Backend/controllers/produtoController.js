const Produto = require('../models/produto');

const createProduto = async (request, h) => {
  const { titulo, artista, genero, tipo, preco, estoque } = request.payload;
  try {
    const produto = await Produto.create(titulo, artista, genero, tipo, preco, estoque);
    return h.response(produto).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao criar produto' }).code(500);
  }
};

const getAllProdutos = async (request, h) => {
  try {
    const produtos = await Produto.getAll();
    return h.response(produtos).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar produtos' }).code(500);
  }
};

const getProdutoById = async (request, h) => {
  const id = request.params.id;
  try {
    const produto = await Produto.getById(id);
    if (!produto) {
      return h.response({ error: 'Produto não encontrado' }).code(404);
    }
    return h.response(produto).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar produto' }).code(500);
  }
};

const updateProduto = async (request, h) => {
  const id = request.params.id;
  const { titulo, artista, genero, tipo, preco, estoque } = request.payload;
  try {
    const produto = await Produto.update(id, titulo, artista, genero, tipo, preco, estoque);
    if (!produto) {
      return h.response({ error: 'Produto não encontrado' }).code(404);
    }
    return h.response(produto).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao atualizar produto' }).code(500);
  }
};

const deleteProduto = async (request, h) => {
  const id = request.params.id;
  try {
    const produto = await Produto.delete(id);
    if (!produto) {
      return h.response({ error: 'Produto não encontrado' }).code(404);
    }
    return h.response({ message: 'Produto deletado com sucesso' }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao deletar produto' }).code(500);
  }
};

module.exports = {
  createProduto,
  getAllProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto,
};