const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');

dotenv.config();

const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pedidoProdutoRoutes = require('./routes/pedidoProdutoRoutes');
const notaPedidoRoutes = require('./routes/notaPedidoRoutes');

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://localhost:5173'],
        headers: ['Accept', 'Content-Type'],
        additionalHeaders: ['X-Requested-With']
      }
    }
  });

  server.route(clienteRoutes);
  server.route(produtoRoutes);
  server.route(pedidoRoutes);
  server.route(pedidoProdutoRoutes);
  server.route(notaPedidoRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err);
  process.exit(1);
});

init();
