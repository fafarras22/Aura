
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { User } from "@/context/DeveloperModeContext";

interface DashboardHeaderProps {
  currentUser: User | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentUser }) => {
  if (!currentUser) return null;
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};
