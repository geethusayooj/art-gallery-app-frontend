import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';

function CreateArtistPage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [birthYear, setBirthYear] = useState(new Date().getFullYear());
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateArtist = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/artists`, {
        name,
        bio,
        birthYear,
      })
      .then(() => {
        setMessage('Artist created successfully!');
        setTimeout(() => navigate('/'), 2000); // Navigate back after success
      })
      .catch((error) => {
        console.error('Error creating artist:', error);
        setMessage('Failed to create artist. Please try again.');
      });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 500, p: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Create a New Artist
          </Typography>
          {message && <Typography color="primary">{message}</Typography>}
          <form onSubmit={handleCreateArtist}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
            <TextField
              label="Birth Year"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Artist
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateArtistPage;
