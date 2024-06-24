import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const AddProduct = () => {
  const [product, setProduct] = useState({
    titulo: '',
    artista: '',
    genero: '',
    tipo: '',
    preco: '',
    estoque: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/products', {
        ...product,
        preco: parseFloat(product.preco),
        estoque: parseInt(product.estoque, 10)
      });
      console.log('Produto adicionado:', response.data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Adicionar Produto
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            name="titulo"
            value={product.titulo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Artista"
            name="artista"
            value={product.artista}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Gênero"
            name="genero"
            value={product.genero}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Tipo"
            name="tipo"
            value={product.tipo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Preço"
            name="preco"
            type="number"
            value={product.preco}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Estoque"
            name="estoque"
            type="number"
            value={product.estoque}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Adicionar Produto
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddProduct;
