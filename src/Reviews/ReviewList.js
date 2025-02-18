import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReviewsList.css";
import AddReview from "./AddReview";
import Destinations from "../Destinations/Destination";
import FlightFooter from '../Flights/Footer and Ui/FlightFooter';

const DEFAULT_PROFILE_PHOTO = "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"; // Replace with your default profile photo URL

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewSlideIndex, setReviewSlideIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Adjust the number of reviews per page based on screen width
  const getReviewsPerPage = () => {
    if (windowWidth < 600) {
      return 1;
    } else if (windowWidth < 900) {
      return 2;
    } else {
      return 4;
    }
  };

  const reviewsPerPage = getReviewsPerPage();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://localhost:7030/api/Review");
        setReviews(response.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const reviewSlide = (direction) => {
    let maxSlideIndex;

    if (windowWidth < 600) {
      maxSlideIndex = reviews.length - 1; // For small screens
    } else if (windowWidth < 900) {
      maxSlideIndex = reviews.length - 2; // For medium screens
    } else {
      maxSlideIndex = reviews.length - reviewsPerPage-1; // For large screens
    }

    setReviewSlideIndex((prevIndex) =>
      (prevIndex + direction + maxSlideIndex + 1) % (maxSlideIndex + 1)
    );
  };

  return (
    <>
    <div>
      <Destinations/>
      <h1 style={{ marginLeft: "30px", marginTop: "15px", color: "black" }}>
        <i>Have a look on our TourNest Review</i>
      </h1>
          <AddReview/>
      <div className="review-container" style={{marginBottom:'4%'}}>
        <button className="arrow left-arrow" onClick={() => reviewSlide(-1)}>
          &#10094;
        </button>

        <div
          className="review-wrapper"
          style={{
            transform: windowWidth < 600 ? 
              `translateX(-${reviewSlideIndex * 50}%)` :
              `translateX(-${reviewSlideIndex * reviewsPerPage * 20}%)`,
          }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="review-box">
              <div className="review-header">
                <img
                  src={review.profilePhoto || DEFAULT_PROFILE_PHOTO}
                  alt={review.username}
                  className="profile-photo"
                />
                <span className="username">{review.username}</span>
              </div>
              <p>
                Created at:{" "}
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`star ${i < review.rating ? "filled" : "unfilled"}`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <p>{review.review1}</p>
            </div>
          ))}
        </div>

        <button className="arrow right-arrow" onClick={() => reviewSlide(1)}>
          &#10095;
        </button>
      </div>
    </div>
    <FlightFooter/>
    </>
  );
};

export default ReviewsList;
