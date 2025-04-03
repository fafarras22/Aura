
import React, { useState, useEffect } from "react";

export const HeroImage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const projectImages = [
    "/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png",
    "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png",
    "/lovable-uploads/1fe7dc27-86fd-4951-be87-72e09e824c9b.png",
    "/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png"
  ];
  
  // Auto rotate images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden border shadow-lg bg-white h-full flex items-center justify-center group">
      {projectImages.map((src, index) => (
        <img 
          key={index}
          src={src} 
          alt={`Agricultural project ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex justify-center gap-2">
          {projectImages.map((_, index) => (
            <button 
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
