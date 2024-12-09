import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ArtistListPage.css";

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
      .catch((error) => console.error("Error fetching artists:", error));
  }, []);

  const handleCreateArtworkClick = (artistId: string) => {
    navigate(`/create-artwork?artistId=${artistId}`);
  };

  return (
    <div className="artist-list-page">
    <header className="artist-header">
        <h1>Artist List</h1>
        <p>Browse through our collection of talented artists and their works.</p>
    </header>
    <section className="artist-section">
        {artists.map((artist) => (
            <div key={artist.id} className="artist-card">
                <h2>{artist.name}</h2>
                <p>{artist.bio}</p>
                <p>Born: {artist.birthYear}</p>
                <div className="button-group">
                    <button onClick={() => navigate(`/artist/${artist.id}/artworks`)}>View Artworks</button>
                    <button onClick={() => handleCreateArtworkClick(artist.id)}>Create Artwork</button>
                </div>
            </div>
        ))}
    </section>
</div>
  )
    
}

export default ArtistListPage;
