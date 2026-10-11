import React, { useState } from 'react';
import './Product.css';

// Modal para sa burger details na nakapahiga sa gitna ng screen
const Product = ({ burger, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);

  if (!burger) return null;

  // Bawas quantity pero bawal bumaba sa 1
  const handleDecrease = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  // Dagdag quantity
  const handleIncrease = () => {
    setQty((prev) => prev + 1);
  };

  const totalPrice = (burger.price * qty).toFixed(2);

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Pangsara ng modal */}
        <button type="button" className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Picture ng burger sa kaliwa */}
        <div className="product-image-container">
          <img src={burger.image} alt={burger.name} className="product-img" />
          <span className="fresh-badge">Fresh & Hot</span>
        </div>

        {/* Info at controls sa kanan */}
        <div className="product-details-container">
          <div className="details-header">
            <div className="rating-wrap">
              <span className="stars">
                {'★'.repeat(burger.rating)}
                {'☆'.repeat(5 - burger.rating)}
              </span>
              <span className="rating-score">{burger.rating}.0 / 5.0</span>
            </div>

            <h2 className="burger-heading">{burger.name}</h2>

            <div className="unit-price-tag">
              <span className="label">Base Price:</span>
              <span className="amount">${burger.price.toFixed(2)}</span>
            </div>

            <div className="description-box">
              <h4>What Makes It Delicious:</h4>
              <p>{burger.detailDescription}</p>
            </div>
          </div>

          {/* Controls sa ibaba: quantity selector, dynamic multiplied price, at add to cart */}
          <div className="modal-actions-bottom">
            <div className="qty-price-row">
              <div className="qty-picker">
                <span className="qty-lbl">Quantity:</span>
                <div className="counter-box">
                  <button type="button" className="btn-qty" onClick={handleDecrease}>
                    -
                  </button>
                  <span className="count-number">{qty}</span>
                  <button type="button" className="btn-qty" onClick={handleIncrease}>
                    +
                  </button>
                </div>
              </div>

              {/* Dynamic na nagmu-multiply yung price depende sa qty */}
              <div className="calc-price-box">
                <span className="calc-formula">
                  {qty} × ${burger.price.toFixed(2)}
                </span>
                <span className="calc-total">${totalPrice}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-add-cart"
              onClick={() => onAddToCart(burger, qty)}
            >
              Add To Cart • ${totalPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

