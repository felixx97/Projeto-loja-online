// controllers/clienteController.js
const Cliente = require('../models/cliente');

const validateEmail = (email) => { //A função validateEmail usa uma expressão regular (regex) 
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const createCliente = async (request, h) => {
  const { nome, email, telefone, endereco, senha } = request.payload; //A função desestrutura os valores nome, email, telefone, endereco, e senha da requisição (request.payload).

  if (!nome || !email || !telefone) { //Validação dos Campos Obrigatórios:
    return h.response({ error: 'Nome, email e telefone são obrigatórios' }).code(400);
  }

  if (!validateEmail(email)) { //Usa a função validateEmail para verificar a validade do email. 
    return h.response({ error: 'Email inválido' }).code(400);
  }

  try {
    const cliente = await Cliente.create(nome, email, telefone, endereco || 'sem endereço', senha || 'senhaPadrao');
    return h.response(cliente).code(201);
  } catch (err) {
    console.error(err); //Se ocorrer um erro durante a criação, captura o erro, loga no console e retorna um erro 500.
    return h.response({ error: 'Erro ao criar cliente' }).code(500);
  }
};

const getAllClientes = async (request, h) => {
  try {
    const clientes = await Cliente.getAll(); //Usa o método getAll do modelo Cliente para buscar todos os clientes.
    return h.response(clientes).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar clientes' }).code(500);
  }
};

const getClienteById = async (request, h) => {  //Busca Cliente por ID
  const id = request.params.id; //Extrai o id dos parâmetros da requisição (request.params.id).
  try {
    const cliente = await Cliente.getById(id); //Usa o método getById do modelo Cliente para buscar o cliente pelo ID.
    if (!cliente) {
      return h.response({ error: 'Cliente não encontrado' }).code(404);
    }
    return h.response(cliente).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao buscar cliente' }).code(500);
  }
};

const updateCliente = async (request, h) => {
  const id = request.params.id; //Extrai o id dos parâmetros e os valores
  const { nome, email, telefone, endereco, senha } = request.payload;

  if (!nome || !email || !telefone) { //Validação dos Campos Obrigatórios
    return h.response({ error: 'Nome, email e telefone são obrigatórios' }).code(400);
  }

  if (!validateEmail(email)) { //Validação de email
    return h.response({ error: 'Email inválido' }).code(400);
  }

  try {
    const cliente = await Cliente.update(id, nome, email, telefone, endereco || 'sem endereço', senha); //Usa o método update do modelo Cliente para atualizar o cliente.
    if (!cliente) {
      return h.response({ error: 'Cliente não encontrado' }).code(404); //Se o cliente não for encontrado, retorna um erro 404.
    }
    return h.response(cliente).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao atualizar cliente' }).code(500); //Se ocorrer um erro, captura o erro, loga no console e retorna um erro 500
  }
};

const deleteCliente = async (request, h) => {
  const id = request.params.id; //Extrai o id dos parâmetros da requisição (request.params.id)
  try {
    const cliente = await Cliente.delete(id); //Método delete do modelo Cliente para deletar o cliente pelo ID.
    if (!cliente) {
      return h.response({ error: 'Cliente não encontrado' }).code(404); //Se o cliente não for encontrado, retorna um erro 404.
    }
    return h.response({ message: 'Cliente deletado com sucesso' }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'Erro ao deletar cliente' }).code(500);
  }
};

module.exports = { //Todos os métodos são exportados para serem usados em outros lugares da aplicação
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
};
