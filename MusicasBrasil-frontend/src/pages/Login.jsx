// src/pages/Login.jsx
import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography, IconButton } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Adicione a lógica de autenticação aqui
    console.log({ email, password, rememberMe });
    // Redirecionar para a página inicial após o login
    navigate('/');
  };

  const handleRegister = () => {
    // Redirecionar para a página de registro
    navigate('/register');
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
          Login
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value={rememberMe} color="primary" />}
            label="Stay connected"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mt: 1 }}
            onClick={handleRegister}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
