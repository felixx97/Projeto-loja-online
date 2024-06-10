const clienteController = require('../controllers/clienteController');

module.exports = [
  {
    method: 'POST',
    path: '/clientes',
    handler: clienteController.createCliente,
  },
  {
    method: 'GET',
    path: '/clientes',
    handler: clienteController.getAllClientes,
  },
  {
    method: 'GET',
    path: '/clientes/{id}',
    handler: clienteController.getClienteById,
  },
  {
    method: 'PUT',
    path: '/clientes/{id}',
    handler: clienteController.updateCliente,
  },
  {
    method: 'DELETE',
    path: '/clientes/{id}',
    handler: clienteController.deleteCliente,
  },
];
