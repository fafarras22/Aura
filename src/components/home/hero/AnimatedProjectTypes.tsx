
import React, { useState, useEffect } from 'react';

interface AnimatedProjectTypesProps {
  baseText: string;
  projectTypes: string[];
  interval?: number;
  className?: string;
}

export const AnimatedProjectTypes: React.FC<AnimatedProjectTypesProps> = ({
  baseText,
  projectTypes,
  interval = 3000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projectTypes.length);
        setIsTransitioning(false);
      }, 500); // Half the transition time
    }, interval);
    
    return () => clearInterval(timer);
  }, [projectTypes.length, interval]);

  return (
    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${className}`}>
      <span className="text-gray-900 dark:text-gray-100">{baseText} </span>
      <span 
        className={`bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 inline-block min-w-40 transition-all duration-500 transform ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}
      >
        {projectTypes[currentIndex]}
      </span>
    </h1>
  );
};
