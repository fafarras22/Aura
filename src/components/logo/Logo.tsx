
import React, { useState, useEffect } from "react";
import { useTheme } from "@/components/ui/theme-provider";

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
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
  // Updated logo path
  const logoPath = logoError 
    ? "/placeholder.svg" 
    : "/lovable-uploads/04090cbb-3921-4e15-9bcc-7bc8946b8642.png";
  
  // Size mapping
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  // Width mapping for the oval
  const widthMap = {
    sm: 28,
    md: 36, 
    lg: 48
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative flex items-center justify-center ${isDarkMode ? 'overflow-hidden' : ''}`}>
        <img 
          src={logoPath} 
          alt="AKAR Logo" 
          className={`${sizeClasses[size]} ${isDarkMode ? 'opacity-95 z-10' : ''}`}
          onError={() => setLogoError(true)}
        />
        {isDarkMode && (
          <div 
            className="absolute rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 backdrop-blur-sm" 
            style={{ 
              width: `${widthMap[size]}px`,
              height: `${widthMap[size] * 0.9}px`,
              animation: "logo-glow 3s infinite ease-in-out",
              transform: "scale(1.1)"
            }} 
          />
        )}
      </div>
      {showText && (
        <span className="font-bold text-xl">AKAR</span>
      )}
    </div>
  );
};
