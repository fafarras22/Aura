
import React from "react";
import Image from "../../../assets/container-farm.png";

export const HeroImage: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden border shadow-lg bg-white flex items-center justify-center">
      <img 
        src="/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png" 
        alt="Modern container farm with vertical hydroponics"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};
