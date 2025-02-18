import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const PaymentComponent = ({ totalPrice, currency, bookingId }) => { // Accept bookingId as a prop
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Function to get the JWT token from local storage
  const getToken = () => {
    return localStorage.getItem("accessToken"); // Retrieve the token from localStorage
  };

  const handlePayment = async () => {
    if (!totalPrice || totalPrice <= 0) {
      alert("Invalid payment amount.");
      return;
    }
  
    try {
      setIsLoading(true);
  
      const token = getToken();
      if (!token) {
        alert("You are not authenticated. Please log in again.");
        return;
      }
  
      // Step 1: Create an order in backend
      const response = await axios.post(
        "https://localhost:7030/api/Payment/create-order", // Ensure this is the correct URL for your backend
        {
          amount: parseFloat(totalPrice),
          currency,
          receiptId: `receipt_${new Date().getTime()}`,
          bookingId: bookingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const { orderId } = response.data; // Razorpay Order ID
  
      // Step 2: Open Razorpay Checkout
      const options = {
        key: "rzp_test_4XaJyg1ZTdKayI", // Your Razorpay Key
        amount: totalPrice * 100, // Convert amount to paisa
        currency,
        name: "Tour Nest",
        description: "Test Transaction",
        order_id: orderId, // Use the orderId from backend
        handler: async function (response) {
          console.log("Payment details:", response);
  
          // Step 3: Update Payment Status in Backend
          await axios.post(
            "https://localhost:7030/api/Payment/update-payment-status", // Endpoint to update payment status
            {
              orderId: orderId, // Razorpay Order ID from create-order
              paymentId: response.razorpay_payment_id, // Razorpay Payment ID from handler
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          navigate("/UserProfile"); // Navigate to success page or home after payment is successful
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
        console.log("Payment failure details:", response.error);
      });
  
      rzp.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          background: isLoading ? "#ccc" : "#3399cc",
          color: "#fff",
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
          width: "100%",
        }}
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentComponent;
