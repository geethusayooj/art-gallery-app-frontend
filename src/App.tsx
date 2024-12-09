import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArtistListPage from "./pages/ArtistsListPage";
import ArtworkPage from "./pages/ArtworkPage";
import CreateArtworkPage from './pages/CreateArtworkPage';
import EditArtworkPage from './pages/EditArtworkPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArtistListPage />} />
        <Route path="/artist/:artistId/artworks" element={<ArtworkPage />} />
        <Route path="/create-artwork" element={<CreateArtworkPage />} />
        <Route path="/artwork/edit/:artworkId" element={<EditArtworkPage />} />

      </Routes>
    </Router>
  );
}

export default App;

