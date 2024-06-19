// models/cliente.js
const db = require('../db');

const Cliente = {
  async create(nome, email, telefone, endereco = 'sem endereço', senha) { // Recebe Parâmetros 
    const result = await db.query(
      'INSERT INTO clientes (nome, email, telefone, endereco, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *', // Executa uma query SQL para inserir um novo cliente na tabela clientes.
      [nome, email, telefone, endereco, senha]
    );
    return result.rows[0]; // Retorna a primeira linha do resultado, que é o cliente recém criado
  },
  async getAll() {
    const result = await db.query('SELECT * FROM clientes'); //Executa uma query SQL para selecionar todos os registros da tabela
    return result.rows; //Retorna todas as linhas do resultado
  },
  async getById(id) { // Recebe o id do cliente.
    const result = await db.query('SELECT * FROM clientes WHERE id = $1', [id]); // Executa uma query
    return result.rows[0]; //Retorna a primeria linha do resultado [0]
  },
  async update(id, nome, email, telefone, endereco = 'sem endereço', senha) { //Recebe Parâmetros 
    const result = await db.query(
      'UPDATE clientes SET nome = $1, email = $2, telefone = $3, endereco = $4, senha = $5 WHERE id = $6 RETURNING *', //Executa uma query SQL para atualizar o cliente com o ID fornecido.
      [nome, email, telefone, endereco, senha, id]
    );
    return result.rows[0]; // Retorna a primeira linha do resultado, que é o cliente atualizado 
  },
  async delete(id) { // Recebe o parâmetro `id` do cliente
    const result = await db.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]); // Executa a query SQL
    return result.rows[0]; //Retorn a primeira linha do resultado [0], que é o cliente deletado 
  }
};

module.exports = Cliente;
