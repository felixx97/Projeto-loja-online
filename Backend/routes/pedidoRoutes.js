const pedidoController = require('../controllers/pedidoController');

module.exports = [
  {
    method: 'POST',
    path: '/pedidos',
    handler: pedidoController.createPedido,
  },
  {
    method: 'GET',
    path: '/pedidos',
    handler: pedidoController.getAllPedidos,
  },
  {
    method: 'GET',
    path: '/pedidos/{id}',
    handler: pedidoController.getPedidoById,
  },
  {
    method: 'PUT',
    path: '/pedidos/{id}',
    handler: pedidoController.updatePedido,
  },
  {
    method: 'DELETE',
    path: '/pedidos/{id}',
    handler: pedidoController.deletePedido,
  },
];
