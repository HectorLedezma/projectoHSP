// src/VerticalCarousel.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VerticalCarousel.css';

const VerticalCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const newItem = () =>{
    let resItem = [];
    if(items.length > 15){
      const divItem = Math.round(items.length/15);
      
      for(let i = 0; i < divItem ;i++){// i = 0 // i = 1
        resItem.push([]);
        for(let j = 0; j<15;j++){// i = 0; j = 0 // i = 0; j = 1 // ... // i = 1; j = 0 
          try {
            resItem[i].push(items[((15*i)+j)]);//(15*0)+0) = 0 (15*0)+1) = 1 // ... // (15*1)+0) = 15
          } catch (error) {
            break;
          }
        }
      }
    }else{
      resItem = items;
    }
    return resItem;
  }
  const PartItems = newItem();
  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === PartItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  useState(()=>{
    setInterval(()=>{
        nextItem();
    },5000)
  });

  return (
    <div className="carousel-container">
      
      <div className="carousel">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ y: 200, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="carousel-item"
          >
            {PartItems[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VerticalCarousel;
