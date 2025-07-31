import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>Register</Typography>
        <Typography variant="body1" color="text.secondary">Registration form coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;