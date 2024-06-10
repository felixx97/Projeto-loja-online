const produtoController = require('../controllers/produtoController');

module.exports = [
  {
    method: 'POST',
    path: '/produtos',
    handler: produtoController.createProduto,
  },
  {
    method: 'GET',
    path: '/produtos',
    handler: produtoController.getAllProdutos,
  },
  {
    method: 'GET',
    path: '/produtos/{id}',
    handler: produtoController.getProdutoById,
  },
  {
    method: 'PUT',
    path: '/produtos/{id}',
    handler: produtoController.updateProduto,
  },
  {
    method: 'DELETE',
    path: '/produtos/{id}',
    handler: produtoController.deleteProduto,
  },
];
