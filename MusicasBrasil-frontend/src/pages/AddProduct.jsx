// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
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
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <Container>
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Preço"
          name="price"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descrição"
          name="description"
          value={product.description}
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
