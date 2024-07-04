// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const AddProduct = () => {
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [genero, setGenero] = useState('');
  const [tipo, setTipo] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [capa, setCapa] = useState('');
  const [teaser, setTeaser] = useState('');
  const [produtos, setProdutos] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/produtos', {
        titulo,
        artista,
        genero,
        tipo,
        preco: parseFloat(preco),
        estoque,
        capa,
        teaser,
      });
      console.log('Produto adicionado:', response.data);
      setTitulo('');
      setArtista('');
      setGenero('');
      setTipo('');
      setPreco('');
      setEstoque('');
      setCapa('');
      setTeaser('');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Adicionar Produto
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <TextField
              fullWidth
              label="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Artista"
              value={artista}
              onChange={(e) => setArtista(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Gênero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Preço"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              margin="normal"
              required
              type="text"
              inputMode="decimal"
            />
            <TextField
              fullWidth
              label="Estoque"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              margin="normal"
              required
              type="number"
              inputMode="numeric"
            />
            <TextField
              fullWidth
              label="Capa"
              value={capa}
              onChange={(e) => setCapa(e.target.value)}
              margin="normal"
              required
              type="url"
            />
            <TextField
              fullWidth
              label="Teaser"
              value={teaser}
              onChange={(e) => setTeaser(e.target.value)}
              margin="normal"
              required
              type="url"
            />
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Adicionar Produto
              </Button>
              <Button onClick={fetchProducts} variant="contained" color="secondary" sx={{ ml: 2 }}>
                Buscar Produtos
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {produtos.length > 0 && (
          <Paper>
            <Typography variant="h6" gutterBottom>
              Produtos
            </Typography>
            <Box sx={{ padding: 2 }}>
              {produtos.map((produto) => (
                <Box key={produto.id} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    <strong>Título:</strong> {produto.titulo}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Artista:</strong> {produto.artista}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Gênero:</strong> {produto.genero}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Tipo:</strong> {produto.tipo}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Preço:</strong> {produto.preco}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Estoque:</strong> {produto.estoque}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Capa:</strong> <a href={produto.capa} target="_blank" rel="noopener noreferrer">Ver Capa</a>
                  </Typography>
                  <Typography variant="body1">
                    <strong>Teaser:</strong> <a href={produto.teaser} target="_blank" rel="noopener noreferrer">Ver Teaser</a>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        )}
      </Container>
    </>
  );
};

export default AddProduct;
