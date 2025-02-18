import React, { useState } from "react";
import "./AddReview.css"; // Include the CSS in a separate file

const AddReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      rating,
      review1: review,
      createdAt: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch("https://localhost:7030/api/Review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming you store the token
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      const data = await response.json();
      setMessage(data.message);
      setRating(0);
      setReview("");
      setIsModalOpen(false);
    } catch (error) {
      setMessage("Error adding review");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="add-review-button"
      >
        Add Review
      </button>

      {isModalOpen && (
        <div className="custom-modal" onClick={() => setIsModalOpen(false)}>
          <div
            className="custom-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <div className="modal-header">
              <h3>Add a Review</h3>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div id="ratingContainer" className="custom-star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`custom-star ${
                          rating >= star ? "active-star" : ""
                        }`}
                        onClick={() => handleStarClick(star)}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here"
                  />
                </div>

                <div className="form-group" style={{ marginTop: "10px" }}>
                  <input
                    type="submit"
                    value="Submit Review"
                    className="submit-review-button"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
};

export default AddReview;
