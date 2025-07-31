import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CheckoutPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>Checkout</Typography>
        <Typography variant="body1" color="text.secondary">Checkout process coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default CheckoutPage;