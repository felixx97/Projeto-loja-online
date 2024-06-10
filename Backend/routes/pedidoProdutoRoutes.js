const pedidoProdutoController = require('../controllers/pedidoProdutoController');

module.exports = [
  {
    method: 'POST',
    path: '/pedido_produtos',
    handler: pedidoProdutoController.createPedidoProduto,
  },
  {
    method: 'GET',
    path: '/pedido_produtos',
    handler: pedidoProdutoController.getAllPedidoProdutos,
  },
  {
    method: 'GET',
    path: '/pedido_produtos/{id}',
    handler: pedidoProdutoController.getPedidoProdutoById,
  },
  {
    method: 'PUT',
    path: '/pedido_produtos/{id}',
    handler: pedidoProdutoController.updatePedidoProduto,
  },
  {
    method: 'DELETE',
    path: '/pedido_produtos/{id}',
    handler: pedidoProdutoController.deletePedidoProduto,
  },
];
