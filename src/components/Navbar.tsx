import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Logo from "../assets/art-palette-and-brush-tools-for-artist-vector-37387686.jpg"; 
import "./Navbar.css";

interface NavbarProps {
  onSearch: (searchTerm: string) => void; 
}

function Navbar({ onSearch }: NavbarProps) {
  const [selectedTab, setSelectedTab] = useState<string>("/");
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/artist")) {
      setSelectedTab("/artists");
    } else if (path.startsWith("/create-artwork")) {
      setSelectedTab("/create-artwork");
    } else if (path === "/about") {
      setSelectedTab("/about");
    } else {
      setSelectedTab("/"); 
    }
  }, [location.pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value); 
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput); 
  };

  return (
    <nav className="Navbar">
      <img className="logoimage" src={Logo} alt="Gallery Logo" />

      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => navigate(newValue)}
        sx={{ height: "100%" }}
        classes={{ indicator: "indicator" }}
      >
        <Tab value="/" label="Home" classes={{ root: "tab" }} />
        <Tab value="/about" label="About" classes={{ root: "tab" }} />
        <Tab value="/artists" label="Create" classes={{ root: "tab" }} />
        
      </Tabs>

      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search here..."
          value={searchInput}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
