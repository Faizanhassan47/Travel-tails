import React from 'react';
import './Marquee.css';

const Marquee = ({ text, speed = 20 }) => {
  return (
    <div className="marquee-container">
      <div className="marquee-content" style={{ animationDuration: `${speed}s` }}>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Marquee;
