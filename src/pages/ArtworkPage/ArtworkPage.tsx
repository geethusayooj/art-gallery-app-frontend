import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ArtworkPage.css";
import axios from "axios";

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

  const handleEditArtwork = (artworkId: string) => {
    navigate(`/api/artwork/edit/${artworkId}`);
  };

  const handleDeleteArtwork = (artworkId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );
    if (confirmDelete) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/artworks/${artworkId}`)
        .then(() => {
          if (artist) {
            setArtist({
              ...artist,
              artworks: artist.artworks.filter(
                (artwork) => artwork.id !== artworkId
              ),
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
      .get<Artist>(`${import.meta.env.VITE_API_URL}/api/artists/${artistId}`)
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
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="error-container">
        <h2>Failed to load artist details. Please try again.</h2>
      </div>
    );
  }

  return (
    <div className="artwork-page">
      <header className="artwork-header">
        <h1>Artworks by {artist.name}</h1>
        <p>{artist.bio}</p>
      </header>

      <section className="artwork-section">
        {artist.artworks.map((artwork) => (
          <div className="artwork-card" key={artwork.id}>
            <img src={artwork.imageUrl} alt={artwork.title} />
            <h2>{artwork.title}</h2>
            <p>Year: {artwork.year}</p>
            <p>Price: ${artwork.price}</p>
            <div className="button-group">
              <button onClick={() => handleEditArtwork(artwork.id)}>
                Edit
              </button>
              <button onClick={() => handleDeleteArtwork(artwork.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      <footer className="artwork-footer">
        <button onClick={() => navigate("/")}>Back</button>
      </footer>
    </div>
  );
}

export default ArtworkPage;
