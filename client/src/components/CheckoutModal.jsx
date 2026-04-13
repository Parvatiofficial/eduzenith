import React, { useState } from 'react';

const CheckoutModal = ({ isOpen, onClose, course, onPaymentSuccess }) => {
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !course) return null;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess(course);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-sm">
        <div className="modal-header">
          <h3>Secure Stripe Checkout</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="checkout-summary">
          <h4>{course.title}</h4>
          <p className="checkout-instructor">Instructor: {course.instructor}</p>
          <div className="checkout-price-row">
            <span>Tuition Price:</span>
            <strong>${course.price.toFixed(2)} USD</strong>
          </div>
          <div className="checkout-guarantee">
            🔒 256-Bit SSL Encrypted Payment & Instant Course Access
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handlePay} disabled={processing}>
              {processing ? 'Processing Payment...' : `Pay $${course.price.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
