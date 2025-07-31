import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const WishlistPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>Wishlist</Typography>
        <Typography variant="body1" color="text.secondary">Wishlist coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default WishlistPage;