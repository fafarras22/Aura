
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AuthHeader: React.FC = () => {
  const [logoError, setLogoError] = useState(false);
  
  const logoPath = logoError 
    ? "/placeholder.svg" 
    : "/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png";
  
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <Link to="/">
          <img 
            src={logoPath} 
            alt="AKAR Logo" 
            className="h-10"
            onError={() => setLogoError(true)}
          />
        </Link>
      </div>
    </header>
  );
};
