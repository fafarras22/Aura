
import React, { useState } from "react";
import { useMobile } from "@/hooks/use-mobile";

export const HeroImage: React.FC = () => {
  const isMobile = useMobile();
  const [imageError, setImageError] = useState(false);
  
  // Update the fallback image to a more reliable source and set the primary image path
  const imagePath = imageError 
    ? "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
    : "/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png";
  
  return (
    <div 
      className={`relative rounded-2xl overflow-hidden shadow-xl ${isMobile ? 'h-[200px]' : 'h-[400px]'}`} 
      role="img" 
      aria-label="AKAR Container Farm"
    >
      <img 
        src={imagePath} 
        alt="AKAR Smart Container Farm with hydroponics system for sustainable urban agriculture" 
        className="w-full h-full object-cover"
        loading="eager"
        onError={() => setImageError(true)}
      />
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-white text-xs font-medium px-2 py-0.5 bg-primary/90 rounded-full inline-block">
              PT Tumbuh Dimana Sadja
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
