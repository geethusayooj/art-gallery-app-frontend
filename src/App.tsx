import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'; 
import ArtistListPage from "./pages/ArtistListPage/ArtistsListPage";
import ArtworkPage from "./pages/ArtworkPage/ArtworkPage";
import CreateArtworkPage from './pages/CreateArtworkPage/CreateArtworkPage';
import EditArtworkPage from './pages/EditArtworkPage/EditArtworkPage';
import Navbar from './components/Navbar';
import AboutPage from "./pages/AboutPage/AboutPage";
import CreateArtistPage from "./pages/CreateArtistPage/CreateArtistPage";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const handleSearch = (query: string) => {
    setSearchQuery(query); 
  };
  return (
    <Router>
      <Navbar onSearch={handleSearch} /> 
      <Routes>
        <Route path="/" element={<ArtistListPage searchQuery={searchQuery} />} />
        <Route path="/artist/:artistId/artworks" element={<ArtworkPage />} />
        <Route path="/create-artwork" element={<CreateArtworkPage />} />
        <Route path="/artwork/edit/:artworkId" element={<EditArtworkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/artists" element={<CreateArtistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
