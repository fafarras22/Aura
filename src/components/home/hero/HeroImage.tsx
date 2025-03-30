
import React from "react";
import { useMobile } from "@/hooks/use-mobile";

export const HeroImage: React.FC = () => {
  const isMobile = useMobile();
  
  return (
    <div 
      className={`relative rounded-2xl overflow-hidden shadow-xl ${isMobile ? 'h-[250px]' : 'h-[400px]'}`} 
      role="img" 
      aria-label="AKAR Container Farm"
    >
      <img 
        src="/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png" 
        alt="AKAR Smart Container Farm with hydroponics system for sustainable urban agriculture" 
        className="w-full h-full object-cover"
        loading="eager"
      />
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-white text-sm font-medium px-3 py-1.5 bg-primary/80 rounded-full inline-block">
              AKAR Smart Farming
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
