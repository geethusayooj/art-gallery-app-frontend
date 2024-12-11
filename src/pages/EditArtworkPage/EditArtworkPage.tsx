import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, CircularProgress, Card, CardContent } from "@mui/material";

const EditArtworkPage = () => {
  const { artworkId } = useParams<{ artworkId: string }>();
  const [artwork, setArtwork] = useState({
    title: "",
    year: 0,
    price: 0,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!artworkId) {
      console.error("No artworkId found in URL");
      return;
    }

    axios
      .get<{ title: string; year: number; price: number; imageUrl: string }>(
        `${import.meta.env.VITE_API_URL}/api/artworks/${artworkId}`
      )
      .then((response) => {
        setArtwork(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching artwork:", error);
        alert("Failed to fetch artwork details. Please try again later.");
        setLoading(false);
      });
  }, [artworkId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!artwork.title || artwork.year <= 0 || artwork.price <= 0 || !artwork.imageUrl) {
      alert("Please fill out all fields with valid values.");
      return;
    }

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/artworks/${artworkId}`, artwork)
      .then(() => {
        alert("Artwork updated successfully!");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error updating artwork:", error);
        alert("Failed to update artwork. Please try again.");
      });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ maxWidth: 500, p: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Edit Artwork
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={artwork.title}
              onChange={(e) => setArtwork({ ...artwork, title: e.target.value })}
              required
            />
            <TextField
              label="Year"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={artwork.year}
              onChange={(e) => setArtwork({ ...artwork, year: Number(e.target.value) })}
              required
            />
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={artwork.price}
              onChange={(e) => setArtwork({ ...artwork, price: Number(e.target.value) })}
              required
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={artwork.imageUrl}
              onChange={(e) => setArtwork({ ...artwork, imageUrl: e.target.value })}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditArtworkPage;
