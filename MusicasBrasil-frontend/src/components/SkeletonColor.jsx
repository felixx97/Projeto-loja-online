// src/components/SkeletonColor.jsx
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const SkeletonColor = () => {
  return (
    <Box sx={{ bgcolor: '#ffff', p: 2, width: 210, height: 118 }}>
      <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={210} height={118} />
    </Box>
  );
};

export default SkeletonColor;
