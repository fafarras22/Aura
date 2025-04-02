
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";

interface SidebarLogoProps {
  isDeveloperMode: boolean;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ isDeveloperMode }) => {
  const [logoError, setLogoError] = useState(false);
  const logoPath = logoError 
    ? "/placeholder.svg" 
    : "/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png";

  return (
    <div className="flex flex-col items-center space-y-2">
      <img
        src={logoPath}
        alt="AKAR Logo"
        className="h-12"
        onError={() => setLogoError(true)}
      />
      {isDeveloperMode && (
        <Badge variant="secondary" className="px-2 py-1 text-xs rounded-full">
          Developer Mode
        </Badge>
      )}
    </div>
  );
};
