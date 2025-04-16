import React, { useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      textAlign="center"
    >
      <CheckCircleOutline sx={{ fontSize: 80, color: 'green', mb: 2 }} />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Thank you for your purchase. Your order has been placed successfully.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
