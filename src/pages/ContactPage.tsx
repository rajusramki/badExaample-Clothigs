import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ContactPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>Contact Us</Typography>
        <Typography variant="body1" color="text.secondary">Contact form coming soon...</Typography>
      </Box>
    </Container>
  );
};

export default ContactPage;