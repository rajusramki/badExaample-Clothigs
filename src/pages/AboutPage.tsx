import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>About Us</Typography>
        <Typography variant="body1" color="text.secondary">About page coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;