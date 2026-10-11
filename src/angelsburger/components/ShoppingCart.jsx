import React, { useState } from 'react';
import './ShoppingCart.css';

// Modal para sa cart items na nakapatayo sa kanang side
const ShoppingCart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckoutComplete
}) => {
  const [isDoneCheckout, setIsDoneCheckout] = useState(false);

  if (!isOpen) return null;

  // Compute total amount ng lahat ng burger sa cart
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return;
    setIsDoneCheckout(true);
  };

  const handleCloseSuccess = () => {
    setIsDoneCheckout(false);
    onCheckoutComplete();
  };

  return (
    <>
      <div className="cart-backdrop" onClick={onClose}>
        <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
          {/* Header ng cart */}
          <div className="cart-header">
            <div className="cart-title-info">
              <span className="cart-icon-emoji">🛍️</span>
              <h3>Shopping Bag</h3>
              <span className="badge-count">
                {cartItems.length} {cartItems.length === 1 ? 'Burger' : 'Burgers'}
              </span>
            </div>
            <button type="button" className="cart-close" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Listahan ng order */}
          <div className="cart-content">
            {cartItems.length === 0 ? (
              <div className="empty-cart-state">
                <span className="empty-emoji">🍔</span>
                <h4>Your Cart Is Empty</h4>
                <p>Select your favorite crazy burgers from the menu!</p>
                <button type="button" className="browse-menu-btn" onClick={onClose}>
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="items-container">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <img src={item.image} alt={item.name} className="cart-item-pic" />

                    <div className="item-info">
                      <div className="item-name-row">
                        <h4>{item.name}</h4>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => onRemoveItem(item.id)}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="unit-cost">${item.price.toFixed(2)} each</div>

                      <div className="item-controls-row">
                        {/* +/- para sa quantity */}
                        <div className="cart-qty-buttons">
                          <button
                            type="button"
                            className="mini-btn"
                            onClick={() => onUpdateQty(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button
                            type="button"
                            className="mini-btn"
                            onClick={() => onUpdateQty(item.id, 1)}
                          >
                            +
                          </button>
                        </div>

                        {/* Presyo na naka-multiply sa quantity */}
                        <div className="item-sum">
                          <span className="math-label">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </span>
                          <span className="math-total">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer kapag may laman yung cart */}
          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="total-amount-row">
                <span className="lbl-total">Total Amount:</span>
                <span className="val-total">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="footer-btns">
                <button type="button" className="btn-add-more" onClick={onClose}>
                  + Add More Items
                </button>
                <button
                  type="button"
                  className="btn-checkout"
                  onClick={handleCheckoutClick}
                >
                  Done Check Out (${cartTotal.toFixed(2)})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pop up pag na-click yung Done Check Out */}
      {isDoneCheckout && (
        <div className="checkout-modal-backdrop" onClick={handleCloseSuccess}>
          <div className="checkout-card" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">🎉</div>
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for ordering at Tasty Burger! Your food is now being prepared.</p>

            <div className="receipt-summary">
              <div className="receipt-row">
                <span>Distinct Burgers:</span>
                <strong>{cartItems.length} types</strong>
              </div>
              <div className="receipt-row">
                <span>Total Quantity:</span>
                <strong>{cartItems.reduce((acc, i) => acc + i.quantity, 0)} items</strong>
              </div>
              <div className="receipt-row highlight">
                <span>Total Paid:</span>
                <strong className="paid-amount">${cartTotal.toFixed(2)}</strong>
              </div>
            </div>

            <button type="button" className="btn-finish" onClick={handleCloseSuccess}>
              Done & Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
