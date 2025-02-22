import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import "./Budget.css";

export default function PieAnimation() {
  const [itemNb, setItemNb] = useState(1);
  const [radius, setRadius] = useState(50);
  const [chartSize, setChartSize] = useState(300); // Default chart height

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
        setRadius(30); // Reduce inner radius for small screens
        setChartSize(200); // Smaller chart for mobile
      } else {
        setRadius(50); // Default radius for larger screens
        setChartSize(300); // Default chart size
      }
    };

    // Set initial size
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

      // Restart animation after 5 seconds
      const timeout = setTimeout(() => {
        setItemNb(1);
        startAnimation();
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    };

    startAnimation();

    return () => {
      window.removeEventListener("resize", handleResize);
      setItemNb(1);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#1e1e1e",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
        maxWidth: "800px",
        padding: "10px",
      }}
    >
      {/* Responsive Heading */}
      <h2
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: "100",
          fontSize: window.innerWidth < 768 ? "18px" : "24px",
          marginTop: "30px",
        }}
      >
        "Get Started with Paris"
      </h2>

      <PieChart
        className="custom-pie-chart"
        height={chartSize}
        series={[
          {
            data: dataWithColors.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: (params) => params.label,
            arcLabelMinAngle: 20,
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
