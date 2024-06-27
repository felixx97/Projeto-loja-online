import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    titulo: '',
    artista: '',
    genero: '',
    tipo: 'CD',
    preco: '',
    estoque: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/produtos', product, {
      });
      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="titulo" value={product.titulo} onChange={handleChange} placeholder="Titulo" required />
      <input type="text" name="artista" value={product.artista} onChange={handleChange} placeholder="Artista" required />
      <input type="text" name="genero" value={product.genero} onChange={handleChange} placeholder="Genero" required />
      <select name="tipo" value={product.tipo} onChange={handleChange} required>
        <option value="CD">CD</option>
        <option value="Vinil">Vinil</option>
      </select>
      <input type="number" name="preco" value={product.preco} onChange={handleChange} placeholder="Preco" required />
      <input type="number" name="estoque" value={product.estoque} onChange={handleChange} placeholder="Estoque" required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
