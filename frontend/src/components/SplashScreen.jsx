import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

const SplashScreen = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(finishLoading, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [finishLoading]);

  return (
    <motion.div 
      className="splash-root"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="splash-content">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="splash-logo"
        >
          ALISHAGRAM
        </motion.h1>
        
        <div className="splash-loader-wrap">
          <div className="splash-loader-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="splash-meta">
          <span>THE EXECUTIVE COLLECTION</span>
          <span>EST. 2024</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
