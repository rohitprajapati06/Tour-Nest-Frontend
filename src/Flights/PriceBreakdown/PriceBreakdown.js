import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import PaymentComponent from "../../Payment/PaymentPage"; // Import Payment Component
import './PriceBreakdown.css';

const PriceBreakdown = () => {
  const location = useLocation();
  const [showTravellerPrices, setShowTravellerPrices] = useState(false);

  const { priceBreakdown, travellerPrices, bookingId } = location.state || {};

  if (!priceBreakdown) {
    return <p>No price breakdown data available.</p>;
  }

  const calculatePrice = (units, nanos) => (units + nanos / 1e9).toFixed(2);

  const baseFare = calculatePrice(priceBreakdown.baseFare.units, priceBreakdown.baseFare.nanos);
  const tax = calculatePrice(priceBreakdown.tax.units, priceBreakdown.tax.nanos);
  const totalPrice = calculatePrice(
    priceBreakdown.baseFare.units + priceBreakdown.tax.units,
    priceBreakdown.baseFare.nanos + priceBreakdown.tax.nanos
  );

  return (
    <div className="total-traveller-price-flight-booking">
      <h2 className="header">Price Breakdown</h2>
      <div className="price-summary">
        <p className="price-item">
          <strong>Tickets</strong>
          <span className="price-details">{priceBreakdown.total.currencyCode} {totalPrice}</span>
        </p>
        <p className="price-item">
          Flight Fare
          <span className="price-details">{priceBreakdown.total.currencyCode} {baseFare}</span>
        </p>
        <p className="price-item">
          Tax
          <span className="price-details">{priceBreakdown.total.currencyCode} {tax}</span>
        </p>
        <p className="price-total">
          Total  
          <span className="price-details">{priceBreakdown.total.currencyCode} {totalPrice}</span>
        </p>
        <p className="note">
          Includes taxes and charges. <br />
        </p>
        <p style={{ color: 'gray', fontSize: '12px' }}>
          <FaCheck /> No hidden fees - track your price at every step.
        </p>
      </div>

      <button onClick={() => setShowTravellerPrices(prev => !prev)} className="view-price-btn">
        View Price Breakdown
      </button>

      {showTravellerPrices && travellerPrices && travellerPrices.length > 0 && (
        <div className="traveller-prices">
          <h3>Traveller Prices</h3>
          <ul>
            {travellerPrices.map((traveller, index) => (
              <li key={index} className="traveller-item">
                <p className="price-item">
                  <strong>Traveller:</strong> {traveller.travellerReference} ({traveller.travellerType})
                </p>
                <p className="price-item">
                  <strong>Base Fare:</strong>
                  <span className="price-details">
                    {traveller.travellerPriceBreakdown.baseFare.currencyCode} &nbsp;
                    {calculatePrice(
                      traveller.travellerPriceBreakdown.baseFare.units,
                      traveller.travellerPriceBreakdown.baseFare.nanos
                    )}
                  </span>
                </p>
                <p className="price-item">
                  <strong>Tax:</strong>
                  <span className="price-details">
                    {traveller.travellerPriceBreakdown.tax.currencyCode} &nbsp;
                    {calculatePrice(
                      traveller.travellerPriceBreakdown.tax.units,
                      traveller.travellerPriceBreakdown.tax.nanos
                    )}
                  </span>
                </p>
                <p className="price-item">
                  <strong>Total Price:</strong>
                  <span className="price-details">
                    {traveller.travellerPriceBreakdown.total.currencyCode} &nbsp;
                    {calculatePrice(
                      traveller.travellerPriceBreakdown.total.units,
                      traveller.travellerPriceBreakdown.total.nanos
                    )}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* PaymentComponent is always displayed and now passes bookingId */}
      <PaymentComponent 
        totalPrice={totalPrice} 
        currency={priceBreakdown.total.currencyCode} 
        bookingId={bookingId}  
      />
    </div>
  );
};

export default PriceBreakdown;
