
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/context/DeveloperModeContext";
import { useMobile } from "@/hooks/use-mobile";

interface WelcomeCardProps {
  currentUser: User | null;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ currentUser }) => {
  const isMobile = useMobile();
  
  if (!currentUser) return null;
  
  return (
    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
      <CardContent className={`flex items-center justify-between ${isMobile ? 'p-3' : 'p-4'}`}>
        <div>
          <h2 className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>
            Welcome, {isMobile ? currentUser.name.split(' ')[0] : currentUser.name}
          </h2>
          <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {currentUser.role === 'admin' ? 'Administrator Access' : 'Client Access'}
          </p>
        </div>
        {currentUser.role === 'admin' && (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            {isMobile ? 'Dev Mode' : 'Developer Mode Active'}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
