import React, { useState } from 'react';
import './DoctorBurger.css';

// Import image assets
import burger1 from '../burger1.webp';
import burger2 from '../burger2.webp';
import burger3 from '../burger3.webp';
import burger4 from '../burger4.webp';

const DoctorBurger = () => {
  const burgers = [
    {
      id: 1,
      name: 'CLASSIC ONION BURGER',
      description: 'Juicy patty, crispy onion rings, chilli sauce, tomatoes, pickles',
      price: '$9.15',
      rating: 5,
      image: burger1
    },
    {
      id: 2,
      name: 'CHEZI BURGER',
      description: 'House patty, double cheddar cheese, bacon, onion, mustard',
      price: '$9.32',
      rating: 5,
      image: burger2
    },
    {
      id: 3,
      name: 'ULTIMATE ONION BURGER',
      description: 'Caramelized onions, American cheese, tomato relish, lettuce',
      price: '$6.15',
      rating: 4,
      image: burger3
    },
    {
      id: 4,
      name: 'CHEZI LOADED BURGER',
      description: 'Loaded cheese patty, bacon, onion rings, house special sauce',
      price: '$9.25',
      rating: 4,
      image: burger4
    }
  ];

  const [cartCount] = useState(2);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="burger-app-container">
      {/* Navbar Header */}
      <header className="navbar">
        {/* Left: Logo Section */}
        <div className="logo">
          <span className="burger-logo-icon">🍔</span>
          <span className="logo-text">TASTY BURGER</span>
        </div>

        {/* Right: Nav Links & Plain Black Bag Icon Group */}
        <div className="nav-right">
          <nav className="nav-links">
            <a href="#about">ABOUT</a>
            <a href="#menu">OUR MENU</a>
            <a href="#shop">SHOP</a>
            <a href="#contact">CONTACT</a>
          </nav>

          <div className="cart-icon">
            {/* Plain Black */}
            <svg
              width="20"
              height="20"
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
            <span className="cart-badge">{cartCount}</span>
          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <section className="burger-hero">
        <h1 className="section-title">OUR CRAZY BURGERS</h1>
        <p>
          Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy patties, bold toppings, and irresistible sauces, all stacked on a perfectly toasted bun.
        </p>
      </section>

      {/* Dynamic Burger Grid */}
      <section className="burger-grid">
        {burgers.map((burger) => (
          <div key={burger.id} className="burger-card">
            <img src={burger.image} alt={burger.name} className="burger-image" />

            <div className="card-body">
              <div className="rating-row">
                <span>
                  {'★'.repeat(burger.rating)}
                  {'☆'.repeat(5 - burger.rating)}
                </span>
                <button
                  className="heart-btn"
                  onClick={() => toggleFavorite(burger.id)}
                  style={{ opacity: favorites[burger.id] ? 1 : 0.4 }}
                >
                  ♥
                </button>
              </div>

              <h3>{burger.name}</h3>
              <p>{burger.description}</p>

              <div className="card-footer">
                <span className="price-tag">{burger.price}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DoctorBurger;