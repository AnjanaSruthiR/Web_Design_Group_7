// src/pages/EventDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  useTheme,
  Fade,
  Grow
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EventDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3002/api/events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch event');
        setEvent(await res.json());
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <Container sx={{ py: 8 }}>
        <Typography>Loading…</Typography>
      </Container>
    );
  if (error)
    return (
      <Container sx={{ py: 8 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  if (!event)
    return (
      <Container sx={{ py: 8 }}>
        <Typography>Event not found.</Typography>
      </Container>
    );

  // build Google Maps URL
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back Chip */}
      <Fade in timeout={500}>
        <Box sx={{ mb: 2 }}>
          <Chip
            component={Link}
            to="/events"
            icon={<ArrowBackIcon />}
            label="Back to Events"
            clickable
            sx={{
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.shadows[2],
              '&:hover': { boxShadow: theme.shadows[4] },
            }}
          />
        </Box>
      </Fade>

      {/* Hero Image */}
      {event.image && (
        <Grow in timeout={700}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              mb: 4,
              height: { xs: 200, sm: 280, md: 360 },
              boxShadow: theme.shadows[4],
            }}
          >
            <Box
              component="img"
              src={`http://localhost:3002${event.image}`}
              alt={event.title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
              }}
            />
            <Typography
              variant="h3"
              sx={{
                position: 'absolute',
                bottom: theme.spacing(3),
                left: theme.spacing(3),
                color: '#fff',
                fontWeight: 700,
              }}
            >
              {event.title}
            </Typography>
          </Box>
        </Grow>
      )}

      {/* Details Card */}
      <Grow in timeout={900}>
        <Card sx={{ boxShadow: theme.shadows[3], borderRadius: 2 }}>
          <CardContent>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              mb={2}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <EventIcon color="primary" />
                <Typography variant="subtitle1">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon color="secondary" />
                <Typography variant="subtitle1">
                  {event.location}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ lineHeight: 1.8 }}
            >
              {event.description}
            </Typography>

            {/* Address block and Map button */}
            <Box mt={4} textAlign="center">
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Venue Address
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {event.location}
              </Typography>
              <Button
                component="a"
                href={mapsUrl}
                target="_blank"
                rel="noopener"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: '8px',
                  '&:hover': { bgcolor: theme.palette.primary.dark }
                }}
              >
                View on Google Maps
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grow>
    </Container>
  );
};

export default EventDetails;
