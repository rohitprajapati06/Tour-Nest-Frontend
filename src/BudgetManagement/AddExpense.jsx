import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddExpense.css';

const AddExpense = () => {
  const [tripName, setTripName] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You need to log in to add an expense.");
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
      return;
    }

    const expenseData = {
      tripName,
      cost: parseFloat(cost),
      date,
      category,
      notes,
    };

    try {
      const response = await fetch("https://localhost:7030/api/Budget/CreateExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        setMessage("Expense added successfully!");
        setTripName("");
        setCost("");
        setDate("");
        setCategory("");
        setNotes("");
      } else if (response.status === 401) {
        setMessage("Unauthorized. Please log in again.");
        localStorage.removeItem("accessToken");
        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add expense.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', backgroundColor: 'black'}}>
    <div className="unique-add-expense-container">
      <h2 className="unique-add-expense-heading">Add Expense</h2>
      <form onSubmit={handleAddExpense}>
        <table className="unique-expense-table">
          <thead>
            <tr>
              <th>Trip</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Category</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="unique-text-input"
                  placeholder="Enter trip name"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  className="unique-text-input"
                  placeholder="Enter cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="date"
                  className="unique-text-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </td>
              <td>
                <select
                  className="unique-text-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Food and Dining">Food and Dining &#127857; </option>
                  <option value="Travel">Travel &#128508;</option>
                  <option value="Transportation">Transportation &#128648;</option>
                  <option value="Accommodation">Accommodation &#127970;</option>
                  <option value="Entertainment">Entertainment &#127905;</option>
                  <option value="Shopping">Shopping &#128717;</option>
                  <option value="Miscellaneous">Miscellaneous 🎫</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="unique-text-input"
                  placeholder="Enter notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {message && <p className="unique-message">{message}</p>}
        <button type="submit" className="unique-add-expense-button" disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddExpense;
