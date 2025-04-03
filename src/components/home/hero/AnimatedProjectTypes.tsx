
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
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projectTypes.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [projectTypes.length, interval]);

  return (
    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${className}`}>
      <span className="text-gray-900 dark:text-gray-100">{baseText} </span>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 inline-block min-w-40 transition-transform duration-500 transform hover:scale-105">
        {projectTypes[currentIndex]}
      </span>
    </h1>
  );
};
