import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Slider.css";
import Blogs from "../LandingPage/Blogs/Blogs";
import Dashboard from "../LandingPage/Budget/Dashboard";
import Home from "../LandingPage/Home";

const Destinations = () => {
  const [data, setData] = useState({
    topPlaces: [],
    topDestinationsInIndia: [],
    topTemples: []
  });

  const [currentIndex, setCurrentIndex] = useState({
    topPlaces: 0,
    topDestinationsInIndia: 0,
    topTemples: 0
  });

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Small screen threshold
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7030/api/Destination");
        setData({
          topPlaces: response.data.topPlaces,
          topDestinationsInIndia: response.data.topDestinationsInIndia,
          topTemples: response.data.topTemples
        });
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchData();
  }, []);

  const slide = (section, direction) => {
    const total = data[section].length - (isSmallScreen ? 2 : 4); // Adjust based on screen size
    setCurrentIndex((prevState) => ({
      ...prevState,
      [section]:
        direction === "prev"
          ? (prevState[section] - 1 + total) % total
          : (prevState[section] + 1) % total
    }));
  };

  const renderSlider = (title, section) => (
    <div className="slider-container">
      <h1 className="slider-title">{title}</h1>
      <div className="slider-wrapper">
        <div
          className="slider"
          style={{
            transform: `translateX(-${currentIndex[section] * (isSmallScreen ? 61 : 21.3)}%)`,
            transition: "transform 0.5s ease-in-out"
          }}
        >
          {data[section].map((item, index) => (
            <div className="slide" key={index}>
              <img src={item.photo} alt={item.name} className="slide-image" />
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <button className="arrow prev" onClick={() => slide(section, "prev")}>
        &#10094;
      </button>
      <button className="arrow next" onClick={() => slide(section, "next")}>
        &#10095;
      </button>
    </div>
  );

  return (
    <div>
      <Home/>
      <Blogs/>
      <Dashboard/>
      {renderSlider("Top Places to Visit", "topPlaces")}
      {renderSlider("India's Most Stunning Beaches and Mountains", "topDestinationsInIndia")}
      {renderSlider("Top Temples in India", "topTemples")}
    </div>
  );
};

export default Destinations;
