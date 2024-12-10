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

interface ArtistListPageProps {
  searchQuery: string; // Accept searchQuery as a prop
}

const ArtistListPage: React.FC<ArtistListPageProps> = ({ searchQuery }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Artist[]>(`${import.meta.env.VITE_API_URL}/artists`)
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateArtworkClick = (artistId: string) => {
    navigate(`/create-artwork?artistId=${artistId}`);
  };

  return (
    <div className="artist-list-page">
      <section className="artist-section">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <h2>{artist.name}</h2>
              <p>{artist.bio}</p>
              <p>Born: {artist.birthYear}</p>
              <div className="button-group">
                <button
                  onClick={() => navigate(`/artist/${artist.id}/artworks`)}
                >
                  View Artworks
                </button>
                <button onClick={() => handleCreateArtworkClick(artist.id)}>
                  Create Artwork
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No artists found matching your search.</p>
        )}
      </section>
    </div>
  );
};

export default ArtistListPage;
