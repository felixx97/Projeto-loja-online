import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    titulo: '',
    artista: '',
    genero: '',
    tipo: '',
    preco: '',
    estoque: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/products', product);
      console.log('Produto adicionado:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erro na resposta:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro:', error.message);
      }
    }
  };

  return (
    <Container>
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          name="titulo"
          value={product.titulo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Artista"
          name="artista"
          value={product.artista}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Gênero"
          name="genero"
          value={product.genero}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo</InputLabel>
          <Select
            label="Tipo"
            name="tipo"
            value={product.tipo}
            onChange={handleChange}
          >
            <MenuItem value="Vinil">Vinil</MenuItem>
            <MenuItem value="CD">CD</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Preço"
          name="preco"
          type="number"
          value={product.preco}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Estoque"
          name="estoque"
          type="number"
          value={product.estoque}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
