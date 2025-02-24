import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlane } from "react-icons/fa";

const Airport = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(""); // Track selected location

  useEffect(() => {
    if (!query || query === selectedLocation) return; // Prevent search after selection

    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`https://localhost:7030/api/FlightLocation/search`, {
          params: { query },
        });
        setResults(response.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query, selectedLocation]);

  const handleLocationSelect = (location) => {
    const displayValue = `${location.code} - ${location.name}`;
    setQuery(displayValue);
    setSelectedLocation(displayValue); // Store selected value to prevent re-search
    onSelect(location.id);
    setResults([]); // Hide dropdown
  };

  return (
    <div style={{ position: "relative", width: "200px", height: "60px" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "107%",
          height: "100.5%",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginTop:"0%",
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results.length > 0 && query !== selectedLocation && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            position: "absolute",
            zIndex: 1000,
            width: "100%",
          }}
        >
          {results.map((location) => (
            <div
              key={location.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              onClick={() => handleLocationSelect(location)}
            >
              <p style={{ margin: 0 }}>
                <FaPlane style={{ marginRight: "5px" }} />
                <b>{location.code}</b> - {location.name}
              </p>
              <p style={{ color: "#555", margin: "5px 0 0", fontSize: "14px" }}>
                {location.cityName}, {location.countryName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Airport;
