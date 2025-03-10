import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import './FlightSearch.css';
import './FlightDetails.css';
import './FlightParameters.css';
import { FaPlane, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import FlightUI from "../Footer and Ui/FlightUI";
import Airport from "../Airports/Airport";
import FlightFooter from "../Footer and Ui/FlightFooter";

const FlightsSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ fromId: "", toId: "", departDate: "", returnDate: "", pageNo: 1, adults: 1, children: "0", sort: "BEST",cabinClass: "ECONOMY", currency_code: "INR",});
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  // Populate form data from query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const updatedFormData = {};
    params.forEach((value, key) => {
      updatedFormData[key] = value;
    });
    setFormData((prevState) => ({ ...prevState, ...updatedFormData }));
  }, [location.search]);
  
  //State Management for passing data
  const handleSelect = (offer) => {
    const travellerDate = offer.segments[0].departureTime; // Use departureTime as travellerDate
    const departureAirport = offer.segments[0].departureAirport.code;
    const arrivalAirport = offer.segments[0].arrivalAirport.code;
    const cabinClass = offer.segments[0].legs[0].cabinClass;
    const planeNumber = offer.segments[0].legs[0].flightInfo?.flightNumber || 'N/A';
    
    navigate(`/book?token=${encodeURIComponent(offer.token)}`, {
      state: {
        priceBreakdown: offer.priceBreakdown,
        travellerPrices: offer.travellerPrices,
        bookingDetails: offer.segments,
        travellerDate, // Pass departureTime as travellerDate
        departureAirport,
        arrivalAirport,
        cabinClass,
        planeNumber,
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
  
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 355); // Set max limit to 355 days from today
  
    if (name === "departDate" || name === "returnDate") {
      const selectedDate = new Date(value);
  
      if (selectedDate < currentDate) {
        setError(`Please select a ${name === "departDate" ? "departure" : "return"} date that is today or in the future.`);
        return;
      }
  
      if (selectedDate > maxDate) {
        setError(`Please select a ${name === "departDate" ? "departure" : "return"} date within the next 1 Year.`);
        return;
      }
    }
  
    setError(""); // Clear any previous errors
    setFormData({ ...formData, [name]: value });
  };
  

  //Passing ID in Airport
  const handleAirportSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  //Search Result Open
  const openModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  //Search Result Close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
  };

  // Getting Data from Server
  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setFlightData(null);
    setLoading(true);

    const queryParams = new URLSearchParams(formData).toString();
    navigate(`/Flights?${queryParams}`); // Update URL with query parameters

    try {
      const response = await axios.get("https://localhost:7030/api/Flights/search", {
        params: formData,
      });
      setFlightData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div style={{fontFamily: "Arial, sans-serif",margin:'0' }}>
      <div className="flight-parameter">
        <h1 className="flight-heading-parameter"> <br/>Where would you like to travel this season?</h1>
  <form onSubmit={handleSearch} className="flight-booking-search-form">
    <table className="flight-booking-search-form-table">
    <thead className="flight-booking-search-tabhead-table">
          <tr className="flight-booking-search-form-header-row">
            <th className="flight-booking-search-form-th">From</th>
            <th className="flight-booking-search-form-th">To</th>
            <th className="flight-booking-search-form-th">Departure Date</th>
            <th className="flight-booking-search-form-th">Return Date</th>
            <th className="flight-booking-search-form-th">Cabin Class</th>
            <th className="flight-booking-search-form-th">Adults</th>
            <th className="flight-booking-search-form-th">Childrens</th>
            <th className="flight-booking-search-form-th"></th>
          </tr>
        </thead>
      <tbody>
        <tr className="flight-booking-search-form-row">
          <td className="flight-booking-search-form-td">
            <Airport 
              className="flight-booking-search-form-airport-input" 
              placeholder="Search by city, country, names"
              onSelect={(value) => handleAirportSelect("fromId", value)} 
            />
          </td>
          <td className="flight-booking-search-form-td">
            <Airport 
              className="flight-booking-search-form-airport-input" 
              placeholder="Search by city, country, names" 
              onSelect={(value) => handleAirportSelect("toId", value)} 
            />
          </td>
          <td className="flight-booking-search-form-td">
            <input 
              type="date" 
              className="flight-booking-search-form-input-date" 
              name="departDate" 
              value={formData.departDate} 
              onChange={handleInputChange} 
              required 
            />
          </td>
          <td className="flight-booking-search-form-td">
            <input 
              type="date" 
              className="flight-booking-search-form-input-date" 
              placeholder="Enter Return Date"
              name="returnDate" 
              value={formData.returnDate} 
              onChange={handleInputChange} 
            />
          </td>
          <td className="flight-booking-search-form-td">
            <select 
              className="flight-booking-search-form-select-class" 
              name="cabinClass" 
              value={formData.cabinClass} 
              onChange={handleInputChange}
            >
              <option value="ECONOMY">Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First</option>
              <option value="PREMIUM_ECONOMY">Premium Economy</option>
            </select>
          </td>
          <td className="flight-booking-search-form-td">
            <input 
              type="number" 
              className="flight-booking-search-form-input-number" 
              placeholder="adults" 
              name="adults" 
              value={formData.adults} 
              onChange={handleInputChange} 
              required
            />
          </td>
          <td className="flight-booking-search-form-td">
            <input 
              type="number" 
              className="flight-booking-search-form-input-number" 
              name="children" 
              placeholder="Enter number of childrens"
              onChange={handleInputChange} 
            />
          </td>
          
          <td className="flight-booking-search-form-td">
            <button type="submit" className="flight-booking-search-form-search-button">Search</button>
          </td>
        </tr>
      </tbody>
    </table>

    {/* Hidden Inputs */}
    <input type="hidden" className="hidden-input" name="sort" value="BEST" />
    <input type="hidden" className="hidden-input" name="currencyCode" value="INR" />
    <input type="hidden" className="hidden-input" name="pageNo" value="1" />
  </form>
</div>


      {error && <p style={{ color: "red" }}>{error}</p>}

    {/* Lazy Loader */}
      {loading && ( <div className="lazy-loader">
      <div className="video-container">
          <video autoPlay muted loop className="background-video">
                <source src="https://cdn.pixabay.com/video/2022/12/12/142647-780599383_large.mp4" type="video/mp4" />
          </video>
      </div>
      <div className="loader-message">
      <h2
          style={{
            color: "GoldenRod", // Keeps the elegant golden shade
            fontWeight: "bold",
            fontSize: "50px",
            textAlign: "center",
            letterSpacing: "2px", // Adds spacing for better readability
            textShadow: "4px 4px 10px rgba(0, 0, 0, 0.8), 2px 2px 5px rgba(218, 165, 32, 0.7)", // Dual-layer shadow
          }}
        >
          We Are Getting Flights For You
        </h2>

      </div>
      </div> )}

      {flightData && (
        <div className="container">
          {/* Left Column (Aggregation Data) */}
          <div className="left-column">
              <h3 className="aggregation-heading">Filters</h3>
                  <ul>
                      <li>Showing {flightData.data?.aggregation?.totalCount || 0} results</li>
                      <li>Filtered Total: {flightData.data?.aggregation?.filteredTotalCount || 0}</li>
                      <li>
                          <h3 className="aggregation-heading">Stops</h3>
                          <ul> {flightData.data?.aggregation?.stops?.map((stop, index) => (
                              <li key={index}>
                                  <label> <input type="radio" name="stop" value={stop.numberOfStops} /> {stop.numberOfStops} </label>
                                  <span style={{ float: 'right' }}>{stop.count}</span>
                              </li> ))}
                              </ul>
                      </li>

            <li>
            <h3 className="aggregation-heading">Airlines</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {flightData.data?.aggregation?.airlines?.map((airline, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {/* Logo and Name on the left */}
                    <img src={airline.logoUrl} alt={airline.name} style={{ height: "30px", marginRight: '10px' }} />
                    <span style={{ marginRight: '10px' }}>{airline.name}</span>

                    {/* Count and Checkbox on the right */}
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '10px' }}>{airline.count}</span>
                      <label>
                        <input type="checkbox" name="airline" value={airline.name} />
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </li>

            <li>
            <h3 className="aggregation-heading">Flight Times</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
              <h3 className="aggregation-subheading">Departs</h3> 
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {flightData.data?.aggregation?.flightTimes[0]?.departure?.map((time, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      {/* Start - End on the left */}
                      <span style={{ marginRight: '10px' }}>
                        {time.start} - {time.end}
                      </span>

            {/* Count and Checkbox on the right */}
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>{time.count}</span>
                    <label>
                      <input type="checkbox" name="departureTime" value={`${time.start}-${time.end}`} />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </li>
            <li>
            <h3 className="aggregation-subheading">Arrival</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {flightData.data?.aggregation?.flightTimes[0]?.arrival?.map((time, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {/* Start - End on the left */}
                    <span style={{ marginRight: '10px' }}>
                      {time.start} - {time.end}
                    </span>

            {/* Count and Checkbox on the right */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>{time.count}</span>
              <label>
                <input type="checkbox" name="arrivalTime" value={`${time.start}-${time.end}`} />
              </label>
            </div>
          </li>
        ))}
      </ul>
    </li>
  </ul>
</li>

<li>
<h3 className="aggregation-heading">Duration</h3>
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {flightData.data?.aggregation?.duration
      ?.filter(duration => duration.durationType === 'JOURNEY') // Filter by "journey"
      .map((duration, index) => (
        <li key={index} style={{ marginBottom: '20px' }}>
          {/* Min - Slider - Max */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ marginRight: '10px' }}>{duration.min}</span>

            {/* Slider input with min and max dynamically set */}
            <input
              type="range"
              min={duration.min}
              max={duration.max}
              step="1"
              defaultValue={duration.min} // Set initial value to min
              style={{ marginRight: '10px', width: '200px' }}
              onChange={(e) => console.log(`Selected value: ${e.target.value}`)} // Handle slider changes
            />
            <span style={{ marginLeft: '10px' }}>{duration.max}</span>
          </div>        
        </li>
      ))}
  </ul>
</li>
            </ul>
          </div>

          <div className="middle-column">
      {flightData.data.flightOffers.map((offer, index) => (
        <div key={index} className="flight-offer">
          <div className="flight-row">
            {/* Left Section: Logo and Departure Info */}
            <small style={{display:'none'}}> {offer.token} </small>
            <img
              style={{ marginLeft: '20px' }}
              src={offer.segments[0].legs[0].carriersData[0].logo}
              alt={offer.segments[0].legs[0].carriersData[0].name}
              className="carrier-logo"
            />
            <div className="left-section">
              <div className="departure-info">
                <p className="departure-time">
                  {new Date(offer.segments[0].departureTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="airport-code">{offer.segments[0].departureAirport.code}</p>
              </div>
            </div>

            {/* Center Section: Flight Icon */}
            <div className="center-section">
              <span className="flight-icon">
                &emsp;&emsp;&emsp;&emsp;
                <FaPlane />
              </span>
            </div>

            {/* Right Section: Arrival Info */}
            <div className="right-section">
              <div className="arrival-info">
                <p className="arrival-time">
                  {new Date(offer.segments[0].arrivalTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="airport-code">{offer.segments[0].arrivalAirport.code}</p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="vertical-divider"></div>

            {/* Price and Details Section */}
            <div className="price-details">
              <p className="price">
                {offer.priceBreakdown.total.currencyCode}{' '}
                {(offer.priceBreakdown.total.units + offer.priceBreakdown.total.nanos / 1e9).toFixed(2)}
              </p>
              <button
                className="view-details-btn"
                onClick={() => openModal(offer)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}

 {/* Modal */}
{isModalOpen && selectedOffer && (
  <div className="flight-details-modal-box-booking" style={{ display: 'block' }}>
    <div className="flight-details-modal-box-booking-content">
      <span className="flight-details-modal-box-booking-close" onClick={closeModal}>
        &times;
      </span>
      {/* Modal Content */}
      <h3>Flight Details</h3>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Modal Left Section */}
        <div className="flight-details-modal-box-booking-left-section" style={{ flex: 1, marginRight: '20px' }}>
          <div className="flight-details-modal-box-booking-departure-city">
            <p><strong>Flight to {selectedOffer.segments[0].arrivalAirport.cityName}</strong></p>
            {(() => {
              const totalSeconds = selectedOffer.segments[0].totalTime; // Convert TotalTime from seconds to hours and minutes
              const hours = Math.floor(totalSeconds / 3600); // Get hours
              const minutes = Math.floor((totalSeconds % 3600) / 60); // Get remaining minutes
              return <p>Flight Time {hours} hours {minutes} minutes</p>;
            })()}
          </div><br/>

          <div className="flight-details-modal-box-booking-departure-time">
          <p><strong> <FaPlaneDeparture/>  &nbsp;{selectedOffer.segments[0].departureAirport.code} - {selectedOffer.segments[0].departureAirport.name}</strong><br/>
              {new Date(selectedOffer.segments[0].departureTime).toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).replace(',', ' ')}</p>
          </div> <br/>

          <div className="flight-details-modal-box-booking-arrival-date-time">
            <p> <FaPlaneArrival/> &nbsp;  <strong>{selectedOffer.segments[0].arrivalAirport.code} - {selectedOffer.segments[0].arrivalAirport.name}</strong><br/>     
            {new Date(selectedOffer.segments[0].arrivalTime).toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).replace(',', ' ')}</p>
          </div>
        </div>

        {/* Modal Right Section */}
        <div className="flight-details-modal-box-booking-right-section" style={{ flex: 1 }}>
          {/* Display Carrier Name and Logo */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {selectedOffer.segments[0].legs[0].carriersData[0]?.logo && (
              <img
                src={selectedOffer.segments[0].legs[0].carriersData[0]?.logo}
                alt={selectedOffer.segments[0].legs[0].carriersData[0]?.name}
                style={{ height: '30px', marginRight: '10px' }}
              />
            )}
            <p style={{ fontWeight: 'bold', margin: 0 }}>
              {selectedOffer.segments[0].legs[0].carriersData[0]?.name || 'N/A'}
            </p>
          </div>

          {/* Display Flight Number and Cabin Class */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <p>
              {selectedOffer.segments[0].legs[0].flightInfo?.flightNumber || 'N/A'}. {selectedOffer.segments[0].legs[0].cabinClass || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr style={{ border: '1px solid #ddd', margin: '20px 0' }} />

      {/* Luggage Allowance Section */}
      <div className="flight-details-modal-box-booking-luggage-section">
        <p><strong>Luggage Allowance</strong></p>
        <ul>
          {selectedOffer.segments[0].travellerCheckedLuggage.map((luggage, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <img src="/luggage.png" alt="suitcase icon" style={{ marginRight: '10px', width: '40px', height: '40px' }} />
              {luggage.luggageAllowance.maxPiece} checked-in piece<br />
              Max Weight {luggage.luggageAllowance.maxWeightPerPiece} {luggage.luggageAllowance.massUnit}
            </li>
          ))}
          {selectedOffer.segments[0].travellerCabinLuggage.map((luggage, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <img src="/bag.png" alt="suitcase icon" style={{ marginRight: '10px', width: '30px', height: '30px' }} />
              {luggage.luggageAllowance.maxPiece} cabin piece <br />
              Max Weight {luggage.luggageAllowance.maxWeightPerPiece} {luggage.luggageAllowance.massUnit} ,{" "}
              {luggage.luggageAllowance.sizeRestrictions.maxLength} x{" "}
              {luggage.luggageAllowance.sizeRestrictions.maxWidth} x{" "}
              {luggage.luggageAllowance.sizeRestrictions.maxHeight}{" "}
              {luggage.luggageAllowance.sizeRestrictions.sizeUnit}
            </li>
          ))}
        </ul>
      </div>

      <hr style={{ border: '1px solid #ddd', margin: '20px 0' }} />

      {/* Price Breakdown and Button Section */}
      <div className="flight-details-modal-box-booking-price-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3>
            {selectedOffer.priceBreakdown.total.currencyCode}{' '}
            {(selectedOffer.priceBreakdown.total.units + selectedOffer.priceBreakdown.total.nanos / 1e9).toFixed(2)}
          </h3>
        </div>
        <div>
        <button
          onClick={() => handleSelect(selectedOffer)}
          className="flight-details-modal-box-booking-btn"
        >
          Select
        </button>

        </div>
      </div>
    </div>
  </div>
)}
    </div>

          {/* Right Column (Baggage Policies) */}
          <div className="baggage-policy-container">
            <h2>Baggage Policies</h2>
            <p style={{fontSize:"16px", textAlign:"center"}}><q><i>Check the baggage policies of specific flight with just one click</i></q></p>
            <ul className="baggage-policies">
              {flightData.data?.baggagePolicies?.map((policy, index) => (
                <li key={index} className="baggage-policy-item">
                  <div className="baggage-policy-details">
                    <a href={policy.url} target="_blank" rel="noopener noreferrer">
                      <h3>{policy.name}</h3>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <FlightUI/>
    </div>
    <FlightFooter/>
    </>
  );
};

export default FlightsSearch;
