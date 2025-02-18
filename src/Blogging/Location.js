import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./LocationSearch.css";

const LocationSearch = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    if (!query || hasSelected) {
      setLocations([]);
      return;
    }

    const fetchLocations = async () => {
      setError("");

      try {
        const response = await axios.get("https://localhost:7030/api/InstagramScraper/search", {
          params: { search_query: query },
        });

        if (response.data?.data?.items?.length) {
          setLocations(response.data.data.items);
        } else {
          setLocations([]);
        }
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("Failed to fetch locations.");
      }
    };

    const debounce = setTimeout(fetchLocations, 500);
    return () => clearTimeout(debounce);
  }, [query, hasSelected]);

  const handleSelectLocation = (location) => {
    setQuery(location);
    setLocations([]);
    setHasSelected(true);
    onLocationSelect(location);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setHasSelected(false);
  };

  return (
    <div className="location-search-container">
      <div className="search-input-wrapper">
        <FaMapMarkerAlt className="search-icon" />
        <input
          type="text"
          placeholder="Search for a location..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      {locations.length > 0 && (
        <ul className="location-results">
          {locations.map((location, index) => (
            <li
              key={index}
              onClick={() => handleSelectLocation(location.name)}
              className="location-item"
            >
              <FaMapMarkerAlt className="location-icon" />
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
