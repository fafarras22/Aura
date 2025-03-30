
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";

interface SidebarLogoProps {
  isDeveloperMode: boolean;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ isDeveloperMode }) => {
  const [logoPath, setLogoPath] = useState("/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png");

  return (
    <div className="flex flex-col items-center space-y-2">
      <img
        src={logoPath}
        alt="AKAR Logo"
        className="h-12"
        onError={() => setLogoPath("/placeholder.svg")}
      />
      {isDeveloperMode && (
        <Badge variant="secondary" className="px-2 py-1 text-xs rounded-full">
          Developer Mode
        </Badge>
      )}
    </div>
  );
};
