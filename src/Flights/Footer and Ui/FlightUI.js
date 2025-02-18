import React from "react";
import "./FlightUI.css";

const FlightUI = () => {
  const columns = [
    {
      image: "/Flexibility.jpg", // Replace with your image URL
      heading: "Flexibility",
      text: "Book your flights with us and enjoy flexibility up to 1 year prior to your trip. Change your plans without worrying about hefty fees.",
    },
    {
      image: "/Booking.jpg", // Replace with your image URL
      heading: "Easy Booking Process",
      text: "Book your flights in just a few clicks! Our simple and secure booking process makes it easy for first-time bookers.",
    },
    {
      image: "/Transparency.jpg", // Replace with your image URL
      heading: "Price Transparency",
      text: "No hidden fees or surprises! Our prices include all taxes and fees, so you know exactly what you're paying.",
    },
  ];

  return (
    <div>
    <div className="container">
      {columns.map((column, index) => (
        <div key={index} className="column">
          <img src={column.image} alt={column.heading} className="ui-icon" />
          <h3>{column.heading}</h3>
          <p>{column.text}</p>
        </div>
      ))}
     </div>
    </div>
  );
};

export default FlightUI;
