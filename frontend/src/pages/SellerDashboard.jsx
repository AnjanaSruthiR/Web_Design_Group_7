import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Grid, Typography, Card, CardMedia, CardContent, CardActions,
  Button, Container, Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SellerDashboard = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSellerArtworks = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3002/api/artworks/seller', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch artworks');
      const data = await response.json();
      setArtworks(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerArtworks();
  }, []);

  const totalRevenue = artworks.reduce((sum, art) => sum + parseFloat(art.price), 0);

  const handleDelete = async (artworkId) => {
    const token = localStorage.getItem('token');
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const response = await fetch(`http://localhost:3002/api/artworks/${artworkId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete artwork');
      setArtworks((prev) => prev.filter((art) => art._id !== artworkId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={5}>
        <Typography variant="h4" gutterBottom>My Artworks</Typography>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Total Artworks</Typography>
              <Typography variant="h4">{artworks.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">${totalRevenue.toFixed(2)}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : artworks.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <Typography>You haven't listed any artworks yet.</Typography>
            <Button variant="contained" onClick={() => navigate('/uploadArtwork')} startIcon={<AddIcon />}>
              Upload Artwork
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {artworks.map((art) => (
              <Grid item xs={12} sm={6} md={4} key={art._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:3002${art.image}`}
                    alt={art.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{art.title}</Typography>
                    <Typography color="text.secondary">${art.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate(`/artwork/${art._id}`)}>View</Button>
                    <Button size="small" onClick={() => navigate(`/edit/${art._id}`)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(art._id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box position="fixed" bottom={16} right={16}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/uploadArtwork')}
          startIcon={<AddIcon />}
        >
          Add Artwork
        </Button>
      </Box>
    </Container>
  );
};

export default SellerDashboard;
