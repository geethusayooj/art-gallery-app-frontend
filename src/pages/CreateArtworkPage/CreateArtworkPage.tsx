import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

function CreateArtworkPage() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get("artistId"); // Get artistId from URL

  const handleCreateArtwork = (event: React.FormEvent) => {
    event.preventDefault();

    if (!artistId) {
      setMessage("Artist ID is missing. Please navigate from the artist list.");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/artworks`, {
        title,
        artistId, // Include artistId in the request
        year,
        price,
        imageUrl,
      })
      .then(() => {
        setMessage("Artwork created successfully!");
        setTimeout(() => navigate("/"), 2000); 
      })
      .catch((error) => {
        console.error("Error creating artwork:", error);
        setMessage("Failed to create artwork. Please try again.");
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ maxWidth: 500, p: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Create a New Artwork
          </Typography>
          {message && <Typography color="primary">{message}</Typography>}
          <form onSubmit={handleCreateArtwork}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Year"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              required
            />
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              margin="normal"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Artwork
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateArtworkPage;
