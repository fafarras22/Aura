
import React, { useState } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = "md", 
  className = "", 
  showText = false 
}) => {
  const [logoError, setLogoError] = useState(false);
  
  // New logo path
  const logoPath = logoError 
    ? "/placeholder.svg" 
    : "/lovable-uploads/b795ce5f-6c21-4dec-8060-90844a893974.png";
  
  // Size mapping
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoPath} 
        alt="AKAR Logo" 
        className={`${sizeClasses[size]}`}
        onError={() => setLogoError(true)}
      />
      {showText && (
        <span className="font-bold text-xl">AKAR</span>
      )}
    </div>
  );
};
