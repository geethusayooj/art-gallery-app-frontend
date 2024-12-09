import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';

interface Artwork {
  id: string;
  title: string;
  year: number;
  price: number;
  imageUrl: string;
}

interface Artist {
  id: string;
  name: string;
  bio: string;
  birthYear: number;
  artworks: Artwork[];
}

function ArtistListPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Artist[]>(`${import.meta.env.VITE_API_URL}/artists`)
      .then((response) => setArtists(response.data))
      .catch((error) => console.error('Error fetching artists:', error));
  }, []);

  const handleCreateArtworkClick = (artistId: string) => {
    navigate(`/create-artwork?artistId=${artistId}`);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 4 }}>
      {artists.map((artist) => (
        <Card key={artist.id} sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {artist.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bio: {artist.bio}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Born: {artist.birthYear}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={`/artist/${artist.id}/artworks`}>
              View Artworks
            </Button>
            <Button size="small" onClick={() => handleCreateArtworkClick(artist.id)}>
              Create Artwork
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default ArtistListPage;
