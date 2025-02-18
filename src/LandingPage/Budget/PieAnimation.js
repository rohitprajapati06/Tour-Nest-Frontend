import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import "./Budget.css";

export default function PieAnimation() {
  const [itemNb, setItemNb] = useState(1);
  const [radius, setRadius] = useState(50); // State to handle radius size

  const colors = [
    "#66CDAA", // MediumAquaMarine
    "#00CED1", // DarkTurquoise
    "#48D1CC", // MediumTurquoise
    "#20B2AA", // LightSeaGreen
    "#008080", // Teal
  ];

  const dataWithColors = mobileAndDesktopOS.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
  }));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(40); // Adjust radius for smaller screens
      } else {
        setRadius(50); // Default radius for larger screens
      }
    };

    // Set radius on initial load and resize
    handleResize();
    window.addEventListener("resize", handleResize);

    const startAnimation = () => {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setItemNb(step);
        if (step >= mobileAndDesktopOS.length) {
          clearInterval(interval);
        }
      }, 500);

      // Restart the animation after 5 seconds
      const timeout = setTimeout(() => {
        setItemNb(1); // Reset the chart
        startAnimation(); // Restart animation
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    };

    startAnimation();

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup resize event listener
      setItemNb(1);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#1e1e2f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", // Ensure the heading is above the chart
        gap: 5, // Reduced gap between heading and pie chart
        maxWidth:"800px",
      }}
    >
      {/* Heading for Pie Chart */}
      <h2
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: "100",
          marginTop: "25px",
        }}
      >
        "Get Started with Paris"
      </h2>

      <PieChart
        className="custom-pie-chart"
        height={300}
        series={[
          {
            data: dataWithColors.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: (params) => params.label, // Arc label visible on the pie chart
            arcLabelMinAngle: 20, // Show arc label only if the angle is large enough
            tooltip: (params) => `${params.label}: ${String(params.value)}%`,
          },
        ]}
        skipAnimation={false}
      />
    </Box>
  );
}

export const mobileAndDesktopOS = [
  { value: 250000, label: "Flights" },
  { value: 200000, label: "Hotels" },
  { value: 150000, label: "Food" },
  { value: 70000, label: "Places" },
  { value: 100000, label: "Others" },
];
