const Joi = require('joi');
const Produto = require('../models/produto');

const produtoSchema = Joi.object({
  titulo: Joi.string().required(),
  artista: Joi.string().required(),
  genero: Joi.string().required(),
  tipo: Joi.string().valid('Vinil', 'CD').required(),
  preco: Joi.number().positive().required(),
  estoque: Joi.number().integer().min(0).required(),
  capa: Joi.string().uri().optional(),
  teaser: Joi.string().uri().optional()
});

const createProduto = async (request, h) => {
  console.log("Recebido no backend:", request.payload); // Log da requisição recebida

  const { error, value } = produtoSchema.validate(request.payload);
  if (error) {
    console.log("Erro de validação:", error.details[0].message); // Log de erro de validação
    return h.response({ error: error.details[0].message }).code(400);
  }

  const { titulo, artista, genero, tipo, preco, estoque, capa, teaser } = value;
  try {
    const produto = await Produto.create(titulo, artista, genero, tipo, preco, estoque, capa, teaser);
    console.log("Produto criado:", produto); // Log do produto criado
    return h.response(produto).code(201);
  } catch (err) {
    console.error("Erro ao criar produto:", err); // Log de erro ao criar produto
    return h.response({ error: 'Erro ao criar produto' }).code(500);
  }
};

const getAllProdutos = async (request, h) => {
  try {
    const produtos = await Produto.getAll();
    console.log("Produtos encontrados:", produtos); // Log dos produtos encontrados
    return h.response(produtos).code(200);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err); // Log de erro ao buscar produtos
    return h.response({ error: 'Erro ao buscar produtos' }).code(500);
  }
};

const getProdutoById = async (request, h) => {
  const id = request.params.id;
  try {
    const produto = await Produto.getById(id);
    if (!produto) {
      console.log("Produto não encontrado:", id); // Log de produto não encontrado
      return h.response({ error: 'Produto não encontrado' }).code(404);
    }
    console.log("Produto encontrado:", produto); // Log do produto encontrado
    return h.response(produto).code(200);
  } catch (err) {
    console.error("Erro ao buscar produto:", err); // Log de erro ao buscar produto
    return h.response({ error: 'Erro ao buscar produto' }).code(500);
  }
};

const updateProduto = async (request, h) => {
  const id = request.params.id;
  const { error, value } = produtoSchema.validate(request.payload);
  if (error) {
    console.log("Erro de validação:", error.details[0].message); // Log de erro de validação
    return h.response({ error: error.details[0].message }).code(400);
  }

  const { titulo, artista, genero, tipo, preco, estoque, capa, teaser } = value;
  try {
    const produto = await Produto.update(id, titulo, artista, genero, tipo, preco, estoque, capa, teaser);
    if (!produto) {
      console.log("Produto não encontrado para atualização:", id); // Log de produto não encontrado para atualização
      return h.response({ error: 'Produto não encontrado' }).code(404);
    }
    console.log("Produto atualizado:", produto); // Log do produto atualizado
    return h.response(produto).code(200);
  } catch (err) {
    console.error("Erro ao atualizar produto:", err); // Log de erro ao atualizar produto
    return h.response({ error: 'Erro ao atualizar produto' }).code(500);
  }
};

const deleteProduto = async (request, h) => {
  const id = request.params.id;
  try {
    const produto = await Produto.delete(id);
    if (!produto) {
      console.log("Produto não encontrado para deletar:", id); // Log de produto não encontrado para deletar
      return h.response({ error: 'Produto não encontrado' }).code(404);
    }
    console.log("Produto deletado:", id); // Log do produto deletado
    return h.response({ message: 'Produto deletado com sucesso' }).code(200);
  } catch (err) {
    console.error("Erro ao deletar produto:", err); // Log de erro ao deletar produto
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
