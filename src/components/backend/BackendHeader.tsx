
import React from 'react';
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { Database, FileText } from 'lucide-react';

export const BackendHeader: React.FC = () => {
  const { isDeveloperMode, currentUser } = useDeveloperMode();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleViewFrontend = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AKAR Backend Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage all data, projections, and integrations
          </p>
          <div className="mt-2 flex items-center">
            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
              {isDeveloperMode ? 'Developer Mode' : 'Admin Access'}
            </span>
            {user && (
              <span className="text-xs text-muted-foreground ml-2">
                Logged in as: {user.email || currentUser?.name}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleViewFrontend}>
            <FileText className="mr-2 h-4 w-4" />
            View Frontend
          </Button>
          <Button size="sm">
            <Database className="mr-2 h-4 w-4" />
            Sync with Supabase
          </Button>
        </div>
      </div>
      
      <div className="border-b pb-2" />
    </div>
  );
};
