
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
  
  // Logo path based on theme and error state
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
      <div className={`relative flex items-center justify-center ${isDarkMode ? 'overflow-hidden' : ''}`}>
        <img 
          src={logoPath} 
          alt="AKAR Logo" 
          className={`${sizeClasses[size]} ${isDarkMode ? 'opacity-90' : ''}`}
          onError={() => setLogoError(true)}
        />
        {isDarkMode && (
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm ${sizeClasses[size]}`} 
               style={{ 
                 width: size === "sm" ? "24px" : size === "md" ? "32px" : "40px",
                 animation: "pulse 3s infinite ease-in-out"
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
