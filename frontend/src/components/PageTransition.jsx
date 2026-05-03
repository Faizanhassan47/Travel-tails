import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const pageVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(10px)',
    scale: 1.05
  },
  enter: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.19, 1, 0.22, 1] // Cinematic Ease
    }
  },
  exit: {
    opacity: 0,
    filter: 'blur(10px)',
    scale: 0.95,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1]
    }
  }
};

const PageTransition = ({ children }) => {
  return (
    <MotionDiv
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </MotionDiv>
  );
};

export default PageTransition;
