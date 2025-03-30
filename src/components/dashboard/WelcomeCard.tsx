
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/context/DeveloperModeContext";

interface WelcomeCardProps {
  currentUser: User | null;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ currentUser }) => {
  if (!currentUser) return null;
  
  return (
    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Welcome, {currentUser.name}</h2>
          <p className="text-sm text-muted-foreground">
            {currentUser.role === 'admin' ? 'Administrator Access' : 'Client Access'}
          </p>
        </div>
        {currentUser.role === 'admin' && (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Developer Mode Active
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
