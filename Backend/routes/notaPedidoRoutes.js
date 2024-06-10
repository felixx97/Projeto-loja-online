const notaPedidoController = require('../controllers/notaPedidoController');

module.exports = [
  {
    method: 'POST',
    path: '/nota_pedidos',
    handler: notaPedidoController.createNotaPedido,
  },
  {
    method: 'GET',
    path: '/nota_pedidos',
    handler: notaPedidoController.getAllNotaPedidos,
  },
  {
    method: 'GET',
    path: '/nota_pedidos/{id}',
    handler: notaPedidoController.getNotaPedidoById,
  },
  {
    method: 'PUT',
    path: '/nota_pedidos/{id}',
    handler: notaPedidoController.updateNotaPedido,
  },
  {
    method: 'DELETE',
    path: '/nota_pedidos/{id}',
    handler: notaPedidoController.deleteNotaPedido,
  },
];
