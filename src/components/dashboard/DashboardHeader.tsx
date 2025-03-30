
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { User } from "@/context/DeveloperModeContext";
import { useMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  currentUser: User | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentUser }) => {
  const isMobile = useMobile();
  
  if (!currentUser) return null;
  
  return (
    <div className="flex justify-between items-center">
      <h1 className={`font-bold tracking-tight ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Dashboard</h1>
      {!isMobile && (
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};
