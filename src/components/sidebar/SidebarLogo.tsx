
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo/Logo";

interface SidebarLogoProps {
  isDeveloperMode: boolean;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ isDeveloperMode }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Logo size="lg" />
      {isDeveloperMode && (
        <Badge variant="secondary" className="px-2 py-1 text-xs rounded-full">
          Developer Mode
        </Badge>
      )}
    </div>
  );
};
