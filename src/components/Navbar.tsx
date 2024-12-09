import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Logo from "../assets/360_F_359216202_AXS6T4d8rCETqVM9oH1dRfQpxWd3swws.jpg"; 
import "./Navbar.css";

interface NavbarProps {
  onSearch: (searchTerm: string) => void; 
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [selectedTab, setSelectedTab] = useState<string>("/");
  const [searchInput, setSearchInput] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedTab(location.pathname);
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
      {/* <div className="iconmenu">
        <img src={iconmenu} alt="menu icon" />
      </div> */}

      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => navigate(newValue)}
        sx={{ height: "100%" }}
        classes={{ indicator: "indicator" }}
      >
        <Tab value="/" label="Home" classes={{ root: "tab" }} />
        <Tab value="/about" label="About" classes={{ root: "tab" }} />
        <Tab value="/products/create" label="Create" classes={{ root: "tab" }} />
      </Tabs>

      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search artwork..."
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
