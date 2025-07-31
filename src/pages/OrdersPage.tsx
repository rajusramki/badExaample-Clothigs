import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const OrdersPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>Orders</Typography>
        <Typography variant="body1" color="text.secondary">Order history coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default OrdersPage;