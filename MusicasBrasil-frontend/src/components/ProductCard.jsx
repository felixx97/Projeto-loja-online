// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula o tempo de carregamento dos dados
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 210, margin: '0 auto' }}>
        <CardMedia component="img" height="210" image={product.capa} alt={product.titulo} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.artista}, {product.tipo}, {product.preco}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button size="small" startIcon={<SearchIcon />} onClick={handleOpen}>
              Ver
            </Button>
            <Button size="small" startIcon={<ShoppingCartIcon />}>
              Carrinho
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{product.titulo}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {loading ? (
              <Skeleton variant="rectangular" width={600} height={340} />
            ) : (
              <Box 
                component="iframe" 
                width="600" 
                height="340" 
                src={`https://www.youtube.com/embed/${product.teaser.split('v=')[1]}`} 
                frameBorder="0" 
                allow="autoplay; encrypted-media" 
                allowFullScreen 
              />
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {product.artista}, {product.tipo}, {product.preco}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {product.descricao}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button size="small" startIcon={<PlayCircleOutlineIcon />}>
                Ouvir no Spotify
              </Button>
              <Button size="small" startIcon={<ShoppingCartIcon />}>
                Adicionar ao Carrinho
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
