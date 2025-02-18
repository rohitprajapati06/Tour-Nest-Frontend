import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Users/Registration/Register";
import EmergencyContact from "./EmergencyContacts/EmergencyContact";
import LeafletRoute from "./Maps/LeafletRoute";
import Login from "./Users/Login/Login";
import ReviewsList from "./Reviews/ReviewList";
import Destination from "./Destinations/Destination";
import Chatbot from "./Chatbot/Chatbot";
import Blogging from './Blogging/Blogging';
import ExpenseManager from './BudgetManagement/ExpenseManager';
import ImageGrid from './LandingPage/ImageGrid/ImageGrid';
import ProfileManagement from "./Users/UserProfile/ProfileManagement";
import FlightsSearch from "./Flights/FlightSearch/FlightSearch";
import PriceBreakdown from "./Flights/PriceBreakdown/PriceBreakdown";
import PaymentPage from './Payment/PaymentPage';
import FlightBooking from "./Flights/Flight Booking/FlightBooking";
import BookingList from "./Flights/Flight Booking/BookingList";
import LocationSearch from "./Blogging/Location";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/EmergencyContact" element={<EmergencyContact />} />
        <Route path="/Maps" element={<LeafletRoute />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
        <Route path="/" element={<ReviewsList />} />
        <Route path="/Destinations" element={<Destination />} />
        <Route path="/Chatbot" element={<Chatbot />} />
        <Route path="/Blogs" element={<Blogging />} />
        <Route path="/Expense" element={<ExpenseManager />} />
        <Route path="/Tours" element={<ImageGrid />} />
        <Route path="/UserProfile" element={<ProfileManagement />} />
        <Route path="/Flights" element={<FlightsSearch />} />
        <Route path="/price-breakdown" element={<PriceBreakdown />} />
        <Route path="/pay" element={<PaymentPage/>} />
        <Route path="/book" element={<FlightBooking/>} />
        <Route path="/MyBookings" element={<BookingList/>} />
        <Route path="/location" element={<LocationSearch/>} />

      </Routes>
    </Router>
  );
};

export default App;
