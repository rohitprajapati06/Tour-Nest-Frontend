import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FlightBooking.css";

const FlightBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingDetails = useMemo(() => location.state || {}, [location.state]);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [travelers, setTravelers] = useState([]);

  useEffect(() => {
    if (!bookingDetails.travellerDate) {
      setMessage("Missing booking details. Redirecting...");
      setTimeout(() => navigate("/"), 3000);
    }
  }, [bookingDetails, navigate]);

  useEffect(() => {
    if (bookingDetails.travellerPrices) {
      setTravelers(
        Array(bookingDetails.travellerPrices.length).fill({ name: "", age: "" })
      );
    }
  }, [bookingDetails.travellerPrices]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!bookingDetails.travellerDate) {
      setMessage("Booking details are incomplete.");
      setLoading(false);
      return;
    }

    const passengerCount = bookingDetails.travellerPrices
      ? bookingDetails.travellerPrices.length
      : 1;

    const bookingData = {
      travellerDate: bookingDetails.travellerDate || new Date().toISOString(),
      departureAirport: bookingDetails.departureAirport || "N/A",
      arrivalAirport: bookingDetails.arrivalAirport || "N/A",
      cabinClass: bookingDetails.cabinClass || "Economy",
      planeNumber: bookingDetails.planeNumber?.toString() || "N/A",
      status: "Pending",
      passenger: passengerCount,
      email,
      phone,
    };

    try {
      const response = await axios.post(
        "https://localhost:7030/api/Booking",
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 201) {
        const newBookingId = response.data.bookingId;
        setBookingId(newBookingId);
        setMessage("");
      } else {
        setMessage(`Booking failed: ${response.data.message || "Try again."}`);
      }
    } catch (error) {
      setMessage("Error submitting booking.");
    } finally {
      setLoading(false);
    }
  };

  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index] = { ...updatedTravelers[index], [field]: value };
    setTravelers(updatedTravelers);
  };

  const handleAddTravelers = async () => {
    if (!bookingId) {
      setMessage("Booking ID is missing. Please complete booking first.");
      return;
    }

    for (const traveler of travelers) {
      if (!traveler.name.trim()) {
        setMessage("All travelers must have a name.");
        return;
      }
      if (Number(traveler.age) <= 0) {
        setMessage("Traveler age must be greater than 0.");
        return;
      }

      const travelerData = {
        bookingId,
        name: traveler.name,
        age: Number(traveler.age),
      };

      try {
        const response = await axios.post(
          "https://localhost:7030/api/Booking/TravellerDetails",
          travelerData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.status === 201) {
          setMessage(`Traveler details have been added successfully!`);
        } else {
          setMessage(`Failed to add traveler: ${traveler.name}`);
          return;
        }
      } catch (error) {
        console.error("Server Error:", error.response?.data || error);
        setMessage(error.response?.data?.Name?.[0] || "Error adding traveler details.");
        return;
      }
    }

    // Navigate to PaymentPage with priceBreakdown
    setTimeout(() => {
      navigate("/price-breakdown", {
        state: {
          priceBreakdown: bookingDetails.priceBreakdown,
          travellerPrices: bookingDetails.travellerPrices,
          bookingId: bookingId,
        },
      });
    }, 1000);
  };

  return (
    <div className="flight-from-source-to-destination-container">

      <h2 className="flight-from-source-to-destination-title">Contact Information</h2>
      <p style={{textAlign:'center'}}>Provide Contact details for further updates of your flights </p>

      {message && <p className="flight-from-source-to-destination-message">{message}</p>}

      {!bookingId ? (
        <form onSubmit={handleBooking} className="flight-from-source-to-destination-form">
          <div className="flight-from-source-to-destination-form-group">
            <label>Email</label>
            <input
              type="email"
              style={{width:"100%",backgroundColor:"white",border:'1px solid #ccc'}}
              className="flight-from-source-to-destination-input-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flight-from-source-to-destination-form-group">
            <label>Phone</label>
            <input
              type="tel"
              className="flight-from-source-to-destination-input-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button className="flight-from-source-to-destination-clickablebutton" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      ) : (
        <div className="flight-from-source-to-destination-traveler-details">
          <h2 style={{textAlign:"center",color:"black"}}> Traveller Details</h2>

          <div className="flight-from-source-to-destination-traveler-cards">
            {travelers.map((traveler, index) => (
              <div key={index} className="flight-from-source-to-destination-traveler-card">
                <h4>Traveller {index + 1}</h4>
                <input
                  type="text"
                  className="flight-from-source-to-destination-input-traveler-name"
                  placeholder="Full Name"
                  value={traveler.name}
                  onChange={(e) => handleTravelerChange(index, "name", e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="flight-from-source-to-destination-input-traveler-age"
                  placeholder="Age"
                  value={traveler.age}
                  onChange={(e) => handleTravelerChange(index, "age", e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          <button className="flight-from-source-to-destination-clickablebutton" onClick={handleAddTravelers}>Save Details</button>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;