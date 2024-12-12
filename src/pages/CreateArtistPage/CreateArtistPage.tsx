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

  const handleCreateArtist = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/artists`, {
        name,
        bio,
        birthYear,
      });
      setMessage('Artist created successfully!');
      setTimeout(() => navigate('/'), 2000); 
    } catch (error) {
      console.error('Error creating artist:', error);
      setMessage('Failed to create artist. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
      <Card sx={{ maxWidth: 600, p: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Create a New Artist
          </Typography>
          {message && (
            <Typography color={message.includes('successfully') ? 'success.main' : 'error.main'} align="center">
              {message}
            </Typography>
          )}
          <form onSubmit={handleCreateArtist} style={{ marginTop: '16px' }}>
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Create Artist
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateArtistPage;
