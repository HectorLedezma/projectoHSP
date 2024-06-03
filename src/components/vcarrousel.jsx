// src/VerticalCarousel.js
import React, { useState } from 'react';
import './VerticalCarousel.css';

const VerticalCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  useState(()=>{
    setInterval(()=>{
        nextItem();
    },30000)
  });

  return (
    <div className="carousel-container">
      
      <div className="carousel">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? 'active' : ''
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;
