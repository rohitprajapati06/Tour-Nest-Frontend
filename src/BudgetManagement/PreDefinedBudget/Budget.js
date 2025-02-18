import React, { useState, useEffect } from "react";
import BudgetList from "./BudgetList";

const Budget = () => {
  const [budgets, setBudgets] = useState({
    normalBudgets: [],
    midRangeBudgets: [],
    luxuryBudgets: [],
  });

  const [loading, setLoading] = useState(true);
  const [selectedLocations, setSelectedLocations] = useState({
    normal: "",
    midRange: "",
    luxury: "",
  });
  const [isVisible, setIsVisible] = useState(true); // State for toggling visibility
  const [currentSlide, setCurrentSlide] = useState(0); // State for slideshow

  const categories = [
    {
      title: "Normal Budgets",
      budgets: budgets.normalBudgets,
      category: "normal",
    },
    {
      title: "Mid-Range Budgets",
      budgets: budgets.midRangeBudgets,
      category: "midRange",
    },
    {
      title: "Luxury Budgets",
      budgets: budgets.luxuryBudgets,
      category: "luxury",
    },
  ];

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch("https://localhost:7030/api/PreDefinedExpense");
        const data = await response.json();
        setBudgets({
          normalBudgets: data.normalBudgets,
          midRangeBudgets: data.midRangeBudgets,
          luxuryBudgets: data.luxuryBudgets,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching budgets:", error);
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const handleSelectChange = (category, location) => {
    setSelectedLocations((prev) => ({
      ...prev,
      [category]: location,
    }));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ position: "relative", padding: "20px", backgroundColor: "#1e1e1e", margin: "20px 10px" }}>
      <h1 style={{ color: "turquoise" }}>Predefined Budgets</h1>
      <button
        style={{
          position: "absolute",
          top: "30px",
          right: "10px",
          backgroundColor: "#1e1e1e",
          border: "none",
          padding: "10px 20px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "white",
          fontSize: "30px",
        }}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? "_" : "+"}
      </button>

      {isVisible && (
        <div className="budget-container">
          {/* For desktop view */}
          <div className="desktop-view">
            {categories.map(({ title, budgets, category }) => (
              <BudgetList
                key={category}
                title={title}
                budgets={budgets.filter(
                  (budget) => !selectedLocations[category] || budget.location === selectedLocations[category]
                )}
                locations={budgets.map((budget) => budget.location)}
                onSelectChange={(location) => handleSelectChange(category, location)}
                selectedLocation={selectedLocations[category]}
              />
            ))}
          </div>

          {/* For small screens */}
          <div className="mobile-view">
            <button onClick={handlePrevSlide}>&#10094;&#10094;</button>
            <BudgetList
              title={categories[currentSlide].title}
              budgets={categories[currentSlide].budgets.filter(
                (budget) =>
                  !selectedLocations[categories[currentSlide].category] ||
                  budget.location === selectedLocations[categories[currentSlide].category]
              )}
              locations={categories[currentSlide].budgets.map((budget) => budget.location)}
              onSelectChange={(location) =>
                handleSelectChange(categories[currentSlide].category, location)
              }
              selectedLocation={selectedLocations[categories[currentSlide].category]}
            />
            <button onClick={handleNextSlide}>&#10095;&#10095;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
