import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingList.css'; // Import the CSS file

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to generate a random seat number
  const generateRandomSeatNumber = () => {
    const seatNumber = Math.floor(Math.random() * 29) + 1;  // Random number between 1 and 29
    const seatLetter = String.fromCharCode(Math.floor(Math.random() * 6) + 65); // Random letter between A and F
    return `${seatNumber}${seatLetter}`;
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://localhost:7030/api/Booking/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setBookings(response.data);
      } catch (err) {
        setError('Error fetching bookings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ticket-of-the-user-flight-container">
      {bookings.length === 0 ? (
        <p>Book Your First Fligth</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.bookingId} className="ticket-of-the-user-flight">
            {/* Left Section - Airplane Icon */}
            <div className="ticket-of-the-user-flight-left">✈</div>

            {/* Middle Section - Flight Details */}
            <div className="ticket-of-the-user-flight-middle">
              <h2 className="ticket-of-the-user-flight-heading">{booking.departureAirport} ✈ {booking.arrivalAirport}</h2>
              <p><strong>Passenger:</strong> {booking.passenger}</p>
              <p><strong>Departure Time:</strong> {new Date(booking.travellerDate).toLocaleString()}</p>
              <p><strong>Seat No:</strong> {generateRandomSeatNumber()}</p> {/* Display random seat number */}
              <p><strong>Ticket No:</strong> {booking.bookingId || 'N/A'}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>

            {/* Right Section - Traveler & Payment Details */}
            <div className="ticket-of-the-user-flight-right">
              <div className="ticket-of-the-user-flight-traveler-info">
                <h3 className="ticket-of-the-user-flight-subheading">Travelers</h3>
                {booking.travellerDetails.length > 0 ? (
                  <ul>
                    {booking.travellerDetails.map((traveller) => (
                      <li key={traveller.travellerId}>
                        {traveller.name} (Age: {traveller.age})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No traveler details</p>
                )}

                <h3 className="ticket-of-the-user-flight-subheading">Price</h3>
                {booking.payments.length > 0 ? (
                  <ul>
                    {booking.payments.map((payment) => (
                      <li key={payment.paymentId}>
                         &#8377;{payment.amount}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No payments</p>
                )}
              </div>
            </div>

            {/* Divider Line */}
            <div className="ticket-of-the-user-flight-divider"></div>

            {/* Barcode Section */}
            <div className="ticket-of-the-user-flight-barcode"></div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingList;
