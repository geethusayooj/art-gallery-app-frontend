import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";

const EditArtworkPage = () => {
  const { artworkId } = useParams<{ artworkId: string }>();
  const [artwork, setArtwork] = useState({
    title: "",
    year: 0,
    price: 0,
    imageUrl: "",
  });
  interface Artwork {
    title: string;
    year: number;
    price: number;
    imageUrl: string;
  }

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!artworkId) {
      console.error("No artworkId found in URL");
      return;
    }

    axios
      .get<Artwork>(`${import.meta.env.VITE_API_URL}/artworks/${artworkId}`)
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
      .put(`${import.meta.env.VITE_API_URL}/artworks/${artworkId}`, artwork)
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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        backgroundColor: "#333", // Dark background color
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "white" }}>
        Edit Artwork
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={artwork.title}
          onChange={(e) => setArtwork({ ...artwork, title: e.target.value })}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": { borderColor: "white", color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          }}
        />
        <TextField
          label="Year"
          type="number"
          fullWidth
          value={artwork.year}
          onChange={(e) => setArtwork({ ...artwork, year: Number(e.target.value) })}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": { borderColor: "white", color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          }}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          value={artwork.price}
          onChange={(e) => setArtwork({ ...artwork, price: Number(e.target.value) })}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": { borderColor: "white", color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          }}
        />
        <TextField
          label="Image URL"
          fullWidth
          value={artwork.imageUrl}
          onChange={(e) => setArtwork({ ...artwork, imageUrl: e.target.value })}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": { borderColor: "white", color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "#fff", // White button background
            color: "#333", // Dark text color
            "&:hover": { backgroundColor: "#ccc" },
          }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2, borderColor: "white", color: "white", "&:hover": { borderColor: "#ccc" } }}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default EditArtworkPage;
