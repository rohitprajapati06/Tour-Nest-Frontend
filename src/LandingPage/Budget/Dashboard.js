import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import PieAnimation from "./PieAnimation";
import TravelExpensesChart from "./TravelExpenseChart";

const Dashboard = () => {
  const [showHeading, setShowHeading] = useState(false);

  // Trigger the heading animation after 2 seconds
  useEffect(() => {
    const headingTimer = setTimeout(() => {
      setShowHeading(true); // Set showHeading to true after 2 seconds
    }, 1500);

    return () => {
      clearTimeout(headingTimer); // Clean up heading timer
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Adjust to take full height but better for normal screens
        backgroundColor: "#1e1e1e", // Background color for the entire container
        minHeight: "100vh", // Ensures at least full viewport height on smaller screens
      }}
    >
      {/* Heading with animation */}
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "40px",
          marginTop: "20px",
          opacity: showHeading ? 1 : 0, // Controls visibility based on the state
          transition: "opacity 1s ease-in", // Smooth transition for the opacity
        }}
      >
        "Create a Travel Budget That Works for You"
      </div>

      <div
        style={{
          display: "flex",
          flex: 1, // Takes the remaining screen space
          padding: "20px",
          flexWrap: "wrap", // Allow wrapping on smaller screens
          justifyContent: "space-around", // Space between charts
        }}
      >
        {/* Left Side: Pie Chart */}
        <div
          style={{
            flex: "1 1 45%", // Ensures the chart takes up a max of 45% of width, and shrinks if necessary
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            color: "white",
            minHeight: "300px", // Ensures the chart has a reasonable size even in smaller screens
          }}
        >
          <PieAnimation />
        </div>

        {/* Right Side: Line Chart */}
        <div
          style={{
            flex: "1 1 45%", // Same as above for the other chart
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            minHeight: "300px", // Same minimum height as the left side
          }}
        >
          <TravelExpensesChart />
        </div>
      </div>

      {/* Button after charts */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Link to="/Expense" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "mediumaquamarine", // Green color
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create My Travel Budget
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
