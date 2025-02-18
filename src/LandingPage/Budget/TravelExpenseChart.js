import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip,Legend,} from "chart.js";
import "./TravelExpensesChart.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TravelExpensesChart = () => {
  const [chartKey, setChartKey] = useState(0); // Key to force re-render
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setChartKey((prevKey) => prevKey + 1); // Increment key to force re-render on resize
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener
    };
  }, []);

  // Reset animation every 3 seconds
  useEffect(() => {
    const animationTimer = setInterval(() => {
      setChartKey((prevKey) => prevKey + 1); // Increment key to reset animation
    }, 4000);

    return () => {
      clearInterval(animationTimer); // Cleanup interval
    };
  }, []);

  const data = {
    labels: ["Transportation", "Accommodation", "Food", "Attractions", "Miscellaneous"], // Expense categories
    datasets: [
      {
        label: "Paris",
        data: [250000, 200000, 150000, 70000, 100000],
        borderColor: "#FFC300",
        backgroundColor: "rgba(255, 195, 0, 0.2)",
        pointBackgroundColor: "#FFC300",
        tension: 0.1,
      },
      {
        label: "London",
        data: [350000, 250000, 150000, 90000, 150000],
        borderColor: "#00CFFF",
        backgroundColor: "rgba(0, 207, 255, 0.2)",
        pointBackgroundColor: "#00CFFF",
        tension: 0.1,
      },
      {
        label: "New York",
        data: [300000, 200000, 100000, 60000, 100000],
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        pointBackgroundColor: "#FF5733",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#fff",
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Rs. ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#fff", font: { size: 12 } },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          color: "#fff",
          beginAtZero: true,
          callback: function (value) {
            return `Rs. ${value}`;
          },
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-heading">"Plan Your Dream Vacation"</h2>
      <div className="chart-wrapper">
        <Line key={chartKey} ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default TravelExpensesChart;
