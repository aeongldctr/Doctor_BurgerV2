import React, { useState } from 'react';
import './DoctorBurger.css';

import burger1 from '../burger1.webp';
import burger2 from '../burger2.webp';
import burger3 from '../burger3.webp';
import burger4 from '../burger4.webp';
import burger5 from '../burger5.webp';
import burger6 from '../burger6.webp';
import burger7 from '../burger7.webp';
import burger8 from '../burger8.webp';
import burger9 from '../burger9.webp';

const DoctorBurger = () => {
  const burgers = [
    {
      id: 1,
      name: 'CLASSIC ONION BURGER',
      description: 'Juicy patty, crispy onion rings, chilli sauce, tomatoes, pickles',
      detailDescription: 'Sink your teeth into our all-time favorite! Crafted with a 100% freshly grilled beef patty that is bursting with savory juices, topped with golden crunchy onion rings, sweet ripe tomatoes, tangy pickles, and our signature spicy chili kick sauce. Every single bite gives you that satisfying crunch and mouthwatering flavor you crave.',
      price: 9.15,
      rating: 5,
      image: burger1
    },
    {
      id: 2,
      name: 'CHEZI BURGER',
      description: 'House patty, double cheddar cheese, bacon, onion, mustard',
      detailDescription: 'For true cheese lovers only! This comfort masterpiece features a thick, flame-seared patty smothered under two thick blankets of melted golden cheddar cheese. Layered with smoky crispy bacon strips, freshly diced onions, and classic tangy yellow mustard inside a warm butter-toasted bun.',
      price: 9.32,
      rating: 5,
      image: burger2
    },
    {
      id: 3,
      name: 'ULTIMATE ONION BURGER',
      description: 'Caramelized onions, American cheese, tomato relish, lettuce',
      detailDescription: 'A sweet and savory dream come true. We slowly simmer sweet onions until they are deeply caramelized, rich, and tender, then heap them generously over a sizzling hot beef patty with creamy melted American cheese, crisp farm lettuce, and a gourmet tangy tomato relish.',
      price: 6.15,
      rating: 4,
      image: burger3
    },
    {
      id: 4,
      name: 'CHEZI LOADED BURGER',
      description: 'Loaded cheese patty, bacon, onion rings, house special sauce',
      detailDescription: 'Take your burger cravings to the next level! Packed with a cheese-loaded beef patty, thick-cut smoky bacon, crispy battered onion rings, and a generous drizzle of our homemade secret house sauce. It is gloriously loaded, delightfully messy, and packed with irresistible flavor.',
      price: 9.25,
      rating: 4,
      image: burger4
    },
    {
      id: 5,
      name: 'SMOKY BBQ CHEZI BURGER',
      description: 'Smoked beef patty, sweet barbecue glaze, cheddar cheese, crispy onions',
      detailDescription: 'Fire-grilled to smoky perfection! This burger is bathed in our rich honey-smoked BBQ glaze, stacked with tender beef, crisp golden onion strings, aged melted cheddar cheese, and fresh leaf lettuce. A smoky-sweet flavor explosion that hits the spot every single time.',
      price: 8.75,
      rating: 5,
      image: burger5
    },
    {
      id: 6,
      name: 'CRISPY ONION OVERLOAD BURGER',
      description: 'Double beef patties, mountain of golden onion rings, cheddar melt, tangy sauce',
      detailDescription: 'Can never have too much crunch! We stack two juicy beef patties high under a mountain of extra-crunchy golden onion rings, melted cheddar cheese, sweet pickles, and our signature tangy burger cream. It is towering, bold, and super crispy.',
      price: 10.45,
      rating: 4,
      image: burger6
    },
    {
      id: 7,
      name: 'SPICY CHEZI JALAPEÑO BURGER',
      description: 'Fire-grilled patty, melted pepper cheese, sliced jalapeños, chipotle mayo',
      detailDescription: 'Ready to turn up the heat? Made with a seasoned spicy beef patty, molten pepper jack cheese, tangy pickled jalapeños, crunchy red onions, and a fiery drizzle of creamy chipotle sauce. Perfectly spicy, bold, and seriously addictive.',
      price: 8.90,
      rating: 5,
      image: burger7
    },
    {
      id: 8,
      name: 'DOUBLE BACON ONION BURGER',
      description: 'Crispy bacon strips, double patties, sautéed sweet onions, honey mustard',
      detailDescription: 'The irresistible meat lover’s combo! Packed with hardwood-smoked crispy bacon strips, two juicy beef patties, tender sautéed sweet onions, and our smooth tangy honey mustard glaze. Smoky, savory, and guaranteed to fill you right up.',
      price: 9.95,
      rating: 4,
      image: burger8
    },
    {
      id: 9,
      name: 'CHEZI MONSTER DELUXE BURGER',
      description: 'Triple melted cheddar, prime beef, caramelized onions, secret garlic sauce',
      detailDescription: 'The king of all burgers! Built for big appetites with an extra-thick grilled prime beef patty wrapped in three layers of rich melted cheddar, sweet caramelized onions, and our creamy house-blended roasted garlic mayo on a warm toasted sesame bun.',
      price: 11.50,
      rating: 5,
      image: burger9
    }
  ]; 
  const [favorites, setFavorites] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const displayedBurgers = showAll ? burgers : burgers.slice(0, 8);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2600);
  };
  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const openProductModal = (burger) => {
    setSelectedProduct(burger);
    setModalQty(1);
  };
  const closeProductModal = () => {
    setSelectedProduct(null);
    setModalQty(1);
  };

  const handleAddToCart = (product, qty) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: qty
          }
        ];
      }
    });

    closeProductModal();
    showToast(`Added ${qty}x ${product.name} to your bag! 🍔`);
  };

  const updateCartItemQty = (id, delta) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutComplete(true);
  };

  const handleFinishCheckout = () => {
    setCartItems([]);
    setCheckoutComplete(false);
    setIsCartOpen(false);
    showToast('🎉 Order placed successfully! Thank you for dining with us!');
  };

  const cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="burger-app-container">
      {toastMessage && (
        <div className="toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      <header className="navbar">
        <div className="logo">
          <span className="burger-logo-icon">🍔</span>
          <span className="logo-text">TASTY BURGER</span>
        </div>

        <div className="nav-right">
          <nav className="nav-links">
            <a href="#about">ABOUT</a>
            <a href="#menu">OUR MENU</a>
            <a href="#shop">SHOP</a>
            <a href="#contact">CONTACT</a>
          </nav>

          <div
            className="cart-icon"
            onClick={() => setIsCartOpen(true)}
            role="button"
            tabIndex={0}
            title="Open Shopping Cart"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>

            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </div>
        </div>
      </header>

      <section className="burger-hero">
        <h1 className="section-title">OUR CRAZY BURGERS</h1>
        <p>
          Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy patties, bold toppings, and irresistible sauces, all stacked on a perfectly toasted bun.
        </p>
      </section>

      <section className="burger-grid">
        {displayedBurgers.map((burger) => (
          <div
            key={burger.id}
            className="burger-card"
            onClick={() => openProductModal(burger)}
            title="Click to view details & customize"
          >
            <div className="burger-card-img-wrap">
              <img src={burger.image} alt={burger.name} className="burger-image" />
              <span className="quick-view-badge">View Burger</span>
            </div>

            <div className="card-body">
              <div className="rating-row">
                <span>
                  {'★'.repeat(burger.rating)}
                  {'☆'.repeat(5 - burger.rating)}
                </span>
                <button
                  type="button"
                  className="heart-btn"
                  onClick={(e) => toggleFavorite(burger.id, e)}
                  style={{ opacity: favorites[burger.id] ? 1 : 0.4 }}
                  title={favorites[burger.id] ? 'Remove from favorites' : 'Add to favorites'}
                >
                  ♥
                </button>
              </div>

              <h3>{burger.name}</h3>
              <p>{burger.description}</p>

              <div className="card-footer">
                <span className="price-tag">${burger.price.toFixed(2)}</span>
                <span className="order-hint-text">Order Now →</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {burgers.length > 8 && (
        <div className="view-more-container">
          <button
            type="button"
            className="view-more-btn"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll
              ? 'View Less Products ▲'
              : `View More Products (${burgers.length - 8} More) ▼`}
          </button>
        </div>
      )}

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeProductModal}>
          <div
            className="product-modal-horizontal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={closeProductModal}
              aria-label="Close product details"
            >
              ✕
            </button>

            <div className="modal-image-col">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="modal-burger-img"
              />
              <span className="modal-tag">Fresh & Hot</span>
            </div>

            <div className="modal-info-col">
              <div className="modal-info-top">
                <div className="modal-rating-badge-row">
                  <span className="modal-stars">
                    {'★'.repeat(selectedProduct.rating)}
                    {'☆'.repeat(5 - selectedProduct.rating)}
                  </span>
                  <span className="modal-rating-text">{selectedProduct.rating}.0 / 5.0 Rating</span>
                </div>

                <h2 className="modal-title">{selectedProduct.name}</h2>

                <div className="modal-base-price">
                  <span className="price-label">Base Price:</span>
                  <span className="base-price-val">${selectedProduct.price.toFixed(2)}</span>
                </div>

                <div className="modal-description-wrapper">
                  <h4 className="desc-heading">What Makes It Delicious:</h4>
                  <p className="modal-detailed-desc">{selectedProduct.detailDescription}</p>
                </div>
              </div>

              <div className="modal-bottom-controls">
                <div className="modal-qty-price-row">
                  <div className="qty-picker-group">
                    <span className="qty-picker-label">Quantity:</span>
                    <div className="qty-counter-box">
                      <button
                        type="button"
                        className="qty-action-btn"
                        onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-counter-number">{modalQty}</span>
                      <button
                        type="button"
                        className="qty-action-btn"
                        onClick={() => setModalQty((q) => q + 1)}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="modal-dynamic-calc">
                    <span className="dynamic-calc-formula">
                      {modalQty} × ${selectedProduct.price.toFixed(2)}
                    </span>
                    <span className="dynamic-calc-total">
                      ${(selectedProduct.price * modalQty).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="modal-add-to-cart-btn"
                  onClick={() => handleAddToCart(selectedProduct, modalQty)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span>Add To Cart • ${(selectedProduct.price * modalQty).toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div
            className="cart-drawer-vertical"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <div className="cart-drawer-title-group">
                <span className="cart-header-icon">🛍️</span>
                <h3>Your Shopping Bag</h3>
                <span className="cart-distinct-badge">
                  {cartItems.length} {cartItems.length === 1 ? 'Burger' : 'Burgers'}
                </span>
              </div>
              <button
                type="button"
                className="cart-drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart drawer"
              >
                ✕
              </button>
            </div>

            <div className="cart-drawer-body">
              {cartItems.length === 0 ? (
                <div className="cart-empty-box">
                  <div className="cart-empty-emoji">🍔</div>
                  <h4>Your Bag Is Empty</h4>
                  <p>Choose from our delicious burgers to start your order!</p>
                  <button
                    type="button"
                    className="cart-empty-browse-btn"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <img src={item.image} alt={item.name} className="cart-item-image" />

                      <div className="cart-item-info">
                        <div className="cart-item-header">
                          <h4 className="cart-item-name">{item.name}</h4>
                          <button
                            type="button"
                            className="cart-item-remove-btn"
                            onClick={() => removeCartItem(item.id)}
                            title="Remove this burger"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="cart-item-unit-price">
                          ${item.price.toFixed(2)} each
                        </div>

                        <div className="cart-item-calc-row">
                          <div className="cart-item-qty-control">
                            <button
                              type="button"
                              className="qty-btn-mini"
                              onClick={() => updateCartItemQty(item.id, -1)}
                              title="Minus quantity"
                            >
                              -
                            </button>
                            <span className="cart-item-qty-count">{item.quantity}</span>
                            <button
                              type="button"
                              className="qty-btn-mini"
                              onClick={() => updateCartItemQty(item.id, 1)}
                              title="Plus quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="cart-item-total-col">
                            <span className="cart-item-math-label">
                              {item.quantity} × ${item.price.toFixed(2)}
                            </span>
                            <span className="cart-item-math-total">
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

            {cartItems.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-total-row">
                  <span className="cart-total-label">Grand Total:</span>
                  <span className="cart-total-amount">
                    ${cartTotalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="cart-drawer-buttons">
                  <button
                    type="button"
                    className="cart-add-more-btn"
                    onClick={() => setIsCartOpen(false)}
                  >
                    + Add More Items
                  </button>

                  <button
                    type="button"
                    className="cart-checkout-btn"
                    onClick={handleCheckout}
                  >
                    Done Check Out (${cartTotalPrice.toFixed(2)})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {checkoutComplete && (
        <div className="modal-overlay" onClick={() => setCheckoutComplete(false)}>
          <div
            className="checkout-success-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="success-badge-icon">🎉</div>
            <h3 className="success-title">Order Placed Successfully!</h3>
            <p className="success-desc">
              Thank you for ordering at <strong>TASTY BURGER</strong>! Your delicious burgers are now being freshly grilled and prepared.
            </p>

            <div className="order-summary-box">
              <div className="summary-line">
                <span>Distinct Burgers:</span>
                <strong>{cartItems.length} types</strong>
              </div>
              <div className="summary-line">
                <span>Total Quantity:</span>
                <strong>{cartItems.reduce((acc, i) => acc + i.quantity, 0)} burgers</strong>
              </div>
              <div className="summary-line highlight-total">
                <span>Total Paid:</span>
                <strong className="success-price">${cartTotalPrice.toFixed(2)}</strong>
              </div>
            </div>

            <button
              type="button"
              className="success-complete-btn"
              onClick={handleFinishCheckout}
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorBurger;