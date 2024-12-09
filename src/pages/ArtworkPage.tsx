import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";

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

function ArtworkPage() {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Define edit and delete handlers at the component level
  const handleEditArtwork = (artworkId: string) => {
    navigate(`/artwork/edit/${artworkId}`);
  };

  const handleDeleteArtwork = (artworkId: string) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/artworks/${artworkId}`)
        .then(() => {
          if (artist) {
            setArtist({
              ...artist,
              artworks: artist.artworks.filter((artwork) => artwork.id !== artworkId),
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting artwork:", error);
          alert("Failed to delete artwork. Please try again.");
        });
    }
  };

  useEffect(() => {
    if (!artistId) {
      console.error("No artistId found in URL");
      return;
    }

    axios
      .get<Artist>(`${import.meta.env.VITE_API_URL}/artists/${artistId}`)
      .then((response) => {
        setArtist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching artist and artworks:", error);
        setLoading(false);
      });
  }, [artistId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!artist) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Failed to load artist details. Please try again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Artist Details */}
      <Typography variant="h4" align="center" gutterBottom>
        Artworks by {artist.name}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {artist.bio}
      </Typography>

      {/* Artworks Grid */}
      <Grid container spacing={3}>
        {artist.artworks.map((artwork) => (
          <Grid item xs={12} sm={6} md={4} key={artwork.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={artwork.imageUrl}
                alt={artwork.title}
              />
              <CardContent>
                <Typography variant="h6">{artwork.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {artwork.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${artwork.price}
                </Typography>
                {/* Edit and Delete Buttons */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditArtwork(artwork.id)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteArtwork(artwork.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
    </Box>
  );
}

export default ArtworkPage;
