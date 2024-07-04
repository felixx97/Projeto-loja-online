// src/pages/Register.jsx
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, IconButton, Alert } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/clientes', { 
        nome: name, 
        email, 
        telefone: contact, 
        endereco: address, 
        senha: password 
      });
      setSuccessMessage('Cadastro realizado com sucesso, agora você pode fazer seu login.');
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redireciona após 3 segundos
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar. Tente novamente.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          p: 3,
        }}
      >
        <IconButton color="primary">
          <MusicNoteIcon sx={{ fontSize: 50 }} />
        </IconButton>
        <Typography component="h1" variant="h5">
          Registrar
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="contact"
            label="Número de Contato"
            name="contact"
            autoComplete="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Endereço"
            name="address"
            autoComplete="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleBackToLogin}
            sx={{ mb: 2 }}
          >
            Voltar para Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
