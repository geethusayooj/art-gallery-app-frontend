import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArtistListPage from "./pages/ArtistListPage/ArtistsListPage";
import ArtworkPage from "./pages/ArtworkPage/ArtworkPage";
import CreateArtworkPage from './pages/CreateArtworkPage';
import EditArtworkPage from './pages/EditArtworkPage';
import Navbar from './components/Navbar';
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  return (
    <Router>
      <Navbar onSearch={() => {}} /> {/* Navbar for search and navigation */}
      <Routes>
        <Route path="/" element={<ArtistListPage />} />
        <Route path="/artist/:artistId/artworks" element={<ArtworkPage />} />
        <Route path="/create-artwork" element={<CreateArtworkPage />} />
        <Route path="/artwork/edit/:artworkId" element={<EditArtworkPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
