
import React from "react";

export const HeroImage: React.FC = () => {
  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
      <img 
        src="/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png" 
        alt="Inside Container Farm" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};
