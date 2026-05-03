import React, { useEffect, useState } from 'react';
import './CursorCustom.css';

const CursorCustom = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default'); // 'default', 'pointer', 'view'

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      
      // Check if hovering over a photo card or gallery image
      const isPhoto = target.closest('.pcard') || target.closest('.hp-mosaic-item') || target.closest('.hp-journal-img-wrap');
      
      if (isPhoto) {
        setCursorState('view');
      } else {
        const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                           target.tagName === 'A' || 
                           target.tagName === 'BUTTON' ||
                           target.closest('button') ||
                           target.closest('a');
        setCursorState(isClickable ? 'pointer' : 'default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`custom-cursor cursor-${cursorState}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
    >
      {cursorState === 'view' && <span className="cursor-text">VIEW</span>}
    </div>
  );
};

export default CursorCustom;
