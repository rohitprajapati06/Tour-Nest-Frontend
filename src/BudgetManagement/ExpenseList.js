import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./ExpenseList.css";
import { FaTrashAlt } from "react-icons/fa";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ExpenseList = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineChartData, setLineChartData] = useState(null);
  const [outerRadius, setOuterRadius] = useState(100); // Default radius for small screens

  const updateOuterRadius = useCallback(() => {
    if (window.innerWidth > 768) {
      setOuterRadius(140); // Big screen
    } else {
      setOuterRadius(80); // Small screen
    }
  }, []);

  useEffect(() => {
    updateOuterRadius();
    window.addEventListener("resize", updateOuterRadius);
    return () => {
      window.removeEventListener("resize", updateOuterRadius);
    };
  }, [updateOuterRadius]);

  const fetchBudgets = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("JWT token not found. Please log in again.");

      const response = await axios.get("https://localhost:7030/api/Budget", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) throw new Error("Failed to fetch budgets. Please try again later.");

      setBudgets(response.data);

      const groupedData = response.data.reduce((acc, budget) => {
        const category = budget.category || "Uncategorized";
        acc[category] = (acc[category] || 0) + budget.cost;
        return acc;
      }, {});

      const pieChartData = Object.entries(groupedData).map(([label, value]) => ({ label, value }));
      setPieData(pieChartData);

      const sortedBudgets = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      const labels = sortedBudgets.map((budget) => new Date(budget.date).toLocaleDateString());
      const data = sortedBudgets.map((budget) => budget.cost);

      setLineChartData({
        labels,
        datasets: [
          {
            label: "Expenses Over Time",
            data,
            fill: false,
            borderColor: "#40E0D0",
            tension: 0.1,
            pointBackgroundColor: "#1e1e1e",
          },
        ],
      });
    } catch (err) {
      setError( "Create your first Expenses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const handleDelete = async (expenseId) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("JWT token not found. Please log in again.");

      const response = await axios.delete(`https://localhost:7030/api/Budget/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) throw new Error(response.data.message || "Failed to delete expense.");

      setBudgets(budgets.filter((budget) => budget.expenseId !== expenseId));
      alert("Expense deleted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "An error occurred.");
    }
  };

  const totalCost = budgets.reduce((acc, budget) => acc + budget.cost, 0);
  const totalExpenses = budgets.length;
  const latestExpense = budgets.length > 0 ? budgets[budgets.length - 1].cost : null;

  if (loading) return <div className="budget-list__loading">Loading...</div>;
  if (error) return <div className="budget-list__error">{error}</div>;

  return (
    
    <div className="expense-body">
      <div className="budget-summary-box">
        <div className="summary-card">
          <span className="summary-icon" style={{ color: "red" }}>&#128181;</span>
          <div className="summary-text">
            <p>Total Cost</p>
            <h3>Rs. {totalCost.toFixed(0)}</h3>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon" style={{ color: "blue" }}>&#128197;</span>
          <div className="summary-text">
            <p>Latest Expense</p>
            <h3>Rs. {latestExpense || "N/A"}</h3>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon" style={{ color: "green" }}>&#128202;</span>
          <div className="summary-text">
            <p>Total Expenses</p>
            <h3>{totalExpenses}</h3>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <Box
          sx={{
            width: "100%",
            height: "400px",
            backgroundColor: "#1e1e1e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 5,
            borderRadius: "8px",
            maxWidth: "800px",
            
          }}
        >
          <h2 style={{ color: "white", marginBottom: "0" }}>Expense Distribution by Category</h2>
          <PieChart
            className="custom-pie-chart"
            height={300}
            series={[
              {
                data: pieData,
                innerRadius: 50,
                outerRadius,
                tooltip: (params) => `${params.label}: Rs. ${params.value.toFixed(0)}`,
              },
            ]}
            skipAnimation={false}
          />
        </Box>

        <Box
          sx={{
            width: "45%",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#1e1e1e",
            margin: "20px",
            borderRadius: "8px",
            

          }}
        >
          <h2 style={{ color: "white", marginBottom: "20px" }}>Expense Trends Over Time</h2>
          {lineChartData && (
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: { color: "#fff" },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#fff",
                    callback: function (value, index, values) {
                      // Get the label and format it as "4-Jan"
                      const dateLabel = this.getLabelForValue(value);
                      const formattedDate = new Intl.DateTimeFormat("en-US", {
                        day: "numeric",
                        month: "short",
                      }).format(new Date(dateLabel));
                      return formattedDate;
                    },
                  },
                },
                y: {
                  ticks: {
                    color: "#fff",
                  },
                },
              },
            }}
          />
        )}


        </Box>
      </div>

   <div className="budget-list-userspecific">
  <h1 className="budget-list__title">Budget List</h1>
  {budgets.length > 0 ? (
    <div className="budget-list__table-container">
      <table className="budget-list__table">
        <thead className="budget-list__thead">
          <tr className="budget-list__tr">
            <th className="budget-list__th">Trip Name</th>
            <th className="budget-list__th">Cost</th>
            <th className="budget-list__th">Date</th>
            <th className="budget-list__th">Category</th>
            <th className="budget-list__th">Notes</th>
            <th className="budget-list__th"></th>
          </tr>
        </thead>
        <tbody className="budget-list__tbody">
          {budgets.map((budget) => (
            <tr key={budget.expenseId} className="budget-list__tr">
              <td className="budget-list__td">{budget.tripName}</td> 
              <td className="budget-list__td">Rs. {budget.cost.toFixed(0)}</td>
              <td className="budget-list__td">{new Date(budget.date).toLocaleDateString()}</td>
              <td className="budget-list__td">{budget.category}</td>
              <td className="budget-list__td">{budget.notes || "N/A"}</td>
              <td className="budget-list__td">
                <button
                  className="budget-list__delete-btn"
                  onClick={() => handleDelete(budget.expenseId)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="budget-list__no-budgets">No budgets found.</p>
  )}
</div>
    </div>
  );
};

export default ExpenseList;
