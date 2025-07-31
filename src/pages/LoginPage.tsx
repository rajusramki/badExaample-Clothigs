import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Login form coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;