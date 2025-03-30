
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { User } from "@/context/DeveloperModeContext";
import { useMobile } from "@/hooks/use-mobile";
import { Shield, User as UserIcon } from 'lucide-react';

interface DashboardHeaderProps {
  currentUser: User | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentUser }) => {
  const isMobile = useMobile();
  
  if (!currentUser) return null;
  
  const isAdmin = currentUser.role === 'admin';
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className={`font-bold tracking-tight ${isMobile ? 'text-xl' : 'text-3xl'}`}>Dashboard</h1>
        <Badge 
          variant="outline" 
          className={`
            ${isAdmin 
              ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" 
              : "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
            } text-xs py-0.5 px-2 whitespace-nowrap flex items-center gap-1`}
        >
          {isAdmin ? (
            <>
              <Shield className="w-3 h-3" />
              <span>Admin Mode</span>
            </>
          ) : (
            <>
              <UserIcon className="w-3 h-3" />
              <span>Client Mode</span>
            </>
          )}
        </Badge>
      </div>
      
      {!isMobile && (
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};
