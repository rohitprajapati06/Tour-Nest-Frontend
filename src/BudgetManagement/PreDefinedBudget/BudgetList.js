import React from "react";
import "./BudgetList.css"; // Import the CSS file

const BudgetList = ({ title, budgets, locations, onSelectChange, selectedLocation }) => {
  const uniqueLocations = [...new Set(locations)];

  return (
    <div className="budget-list" style={{ width: "30%" }}>
      <h2>{title}</h2>
      <select
        value={selectedLocation || "Eiffel Tower, Paris"} // Set default value to "Eiffel Tower, Paris"
        onChange={(e) => onSelectChange(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      >
        {uniqueLocations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
      {budgets
        .filter((budget) => budget.location === selectedLocation || budget.location === "Eiffel Tower, Paris")
        .map((budget) => (
          <div
            key={budget.id}
            className="budget-item"
          >
            <h3>{budget.location}</h3>
            <p>
              <strong>Transportation:</strong> {budget.transportation}
            </p>
            <p>
              <strong>Accommodation:</strong> {budget.accommodation}
            </p>
            <p>
              <strong>Food:</strong> {budget.food}
            </p>
            <p>
              <strong>Attractions:</strong> {budget.attractions}
            </p>
            <p>
              <strong>Miscellaneous:</strong> {budget.miscellaneous}
            </p>
            <p>
              <strong>Total:</strong> {budget.total}
            </p>
          </div>
        ))}
    </div>
  );
};

export default BudgetList;
