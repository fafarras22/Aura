
import React from "react";

export const HeroImage: React.FC = () => {
  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl" role="img" aria-label="AKAR Container Farm">
      <img 
        src="/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png" 
        alt="AKAR Smart Container Farm with hydroponics system for sustainable urban agriculture" 
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
};
