import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CartPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>Shopping Cart</Typography>
        <Typography variant="body1" color="text.secondary">Cart functionality coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default CartPage;