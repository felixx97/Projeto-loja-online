// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, Skeleton, Typography, Button } from '@mui/material';
import ProductCard from '../components/ProductCard';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import axios from 'axios';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/produtos');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();

    // Set a delay to start the video after 5 seconds
    const timer = setTimeout(() => {
      const iframe = document.getElementById('video-banner');
      iframe.src += "?autoplay=1";
    }, 5000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5 }}>
        {/* Banner principal */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            mb: 5,
            p: 3,
            bgcolor: 'background.paper', // Estilizando o fundo do banner
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                  Destaque da Semana
                </Typography>
                <Typography variant="body1" paragraph>
                  Confira o vídeo destaque da semana com as novidades mais quentes do mercado musical!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Itens
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {videoLoading && <Skeleton variant="rectangular" width="100%" height={315} />}
              <iframe
                id="video-banner"
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/XDTrVws4qko"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setVideoLoading(false)}
                style={{ display: videoLoading ? 'none' : 'block' }}
              ></iframe>
            </Grid>
          </Grid>
        </Box>
        {/* Seção de produtos */}
        <Box id="product-section" sx={{ width: '100%', maxWidth: '1200px' }}>
          {loading ? (
            <Grid container spacing={2}>
              {Array.from(new Array(10)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Skeleton variant="rectangular" width={210} height={210} />
                  <Skeleton width="60%" />
                  <Skeleton width="80%" />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={5}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
