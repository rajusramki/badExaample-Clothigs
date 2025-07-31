import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center">
        <Typography variant="h1" gutterBottom>404</Typography>
        <Typography variant="h4" gutterBottom>Page Not Found</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for doesn't exist.
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;