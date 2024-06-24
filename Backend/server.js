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
    port: 3000,
    host: 'localhost'
  });

  // Registrar uma extensão para adicionar cabeçalhos CORS
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (!response.isBoom) {  // Para respostas bem-sucedidas
      response.headers['Access-Control-Allow-Origin'] = '*';
      response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    } else {  // Para respostas de erro
      response.output.headers['Access-Control-Allow-Origin'] = '*';
      response.output.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    }
    return h.continue;
  });

  // Adicionar as rotas
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
