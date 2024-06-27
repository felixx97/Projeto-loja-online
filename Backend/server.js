// Importar módulos
const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pedidoProdutoRoutes = require('./routes/pedidoProdutoRoutes');
const notaPedidoRoutes = require('./routes/notaPedidoRoutes');

// Configurar a conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false
});

const init = async () => {
  // Inicializar o servidor Hapi
  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // Permite apenas essa origem
        credentials: true // Permite o uso de cookies
      }
    }
  });

  // Verificar a conexão com o banco de dados
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }

  // Registrar rotas
  server.route(clienteRoutes);
  server.route(produtoRoutes);
  server.route(pedidoRoutes);
  server.route(pedidoProdutoRoutes);
  server.route(notaPedidoRoutes);

  // Iniciar o servidor
  await server.start();
  console.log('Servidor rodando em:', server.info.uri);
};

// Tratar erros não capturados
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err);
  process.exit(1);
});

// Iniciar a aplicação
init();
