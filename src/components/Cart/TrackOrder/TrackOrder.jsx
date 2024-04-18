import React, { useState } from 'react';
import './TrackOrder.css';
import { useNavigate } from 'react-router-dom';

const TrackOrder = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setOrderId(value);
    // Update the error message as the user types
    validateOrderId(value);
  };

  const validateOrderId = (value) => {
    if (!value.trim()) {
      setError('Order ID is required');
    } else if (/\s/.test(value)) {
      setError('No whitespace allowed');
    } else {
      setError('');
    }
  };

  const trackOrder = () => {
    if (!error && orderId) {
      // If there's no error and orderId is not empty, proceed to navigate
      navigate(`/track-order/details/${orderId}`);
    } else {
      // If the input is not valid, set an appropriate error message
      setError('Please enter a valid Order ID');
    }
  };

  return (
    <div className="track-order-container">
      <div className="track-order-frame215">
        <div className="track-order-frame424">
          <div className="track-order-frame510">
            <span className="track-order-text 24Bold">
              Track your order
            </span>
          </div>
          <div className="track-order-frame259">
            <div className="track-order-frame107">
              <span className="track-order-text02 20Medium">
                Enter your Order ID
              </span>
              <span className="track-order-text04 16Light">
                You can track your order by entering your order ID
              </span>
            </div>
            <div className="track-order-frame106">
              <input
                type="text"
                className={`track-order-input ${error ? 'input-error' : ''} p-2`}
                style={{border:"1px solid #E2E8F0",borderRadius:"8px"}}
                value={orderId}
                onChange={handleInputChange}
                placeholder="Enter Order Id"
              />
              {error && <div className="error-message">{error}</div>}
              <div onClick={trackOrder} style={{cursor:"pointer"}} className="track-order-frame12">
                <span className="track-order-text08 16Medium">
                  TRACK ORDER
                </span>
              </div>
              <span className="track-order-text10 14Medium" onClick={() => navigate('/contact-us')} style={{cursor:"pointer"}}>
                Need help? Contact Us
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
