// src/components/Menu.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Minha Loja
        </Typography>
        <Button color="inherit" component={Link} to="/adicionar-produto">
          Adicionar Produto
        </Button>
        <Button color="inherit" component={Link} to="/outro-menu">
          Outro Menu
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
