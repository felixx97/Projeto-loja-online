const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const hapiCorsHeaders = require('hapi-cors-headers');

dotenv.config();

const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pedidoProdutoRoutes = require('./routes/pedidoProdutoRoutes');
const notaPedidoRoutes = require('./routes/notaPedidoRoutes');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // Adicionando suporte a CORS
  server.ext('onPreResponse', hapiCorsHeaders);

  server.route(clienteRoutes);
  server.route(produtoRoutes);
  server.route(pedidoRoutes);
  server.route(pedidoProdutoRoutes);
  server.route(notaPedidoRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
