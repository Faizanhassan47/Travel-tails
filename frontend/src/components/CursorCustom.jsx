import React, { useEffect, useRef, useState } from 'react';
import './CursorCustom.css';

const CursorCustom = () => {
  const cursorRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'pointer', 'view'

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smoother GPU-synced updates
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          // Use translate3d for hardware acceleration, bypassing React state
          cursorRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        }
      });
      
      const target = e.target;
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`custom-cursor cursor-${cursorState}`}
    >
      {cursorState === 'view' && <span className="cursor-text">VIEW</span>}
    </div>
  );
};

export default CursorCustom;
