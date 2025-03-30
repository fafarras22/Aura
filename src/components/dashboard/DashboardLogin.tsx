
import React from "react";
import { LoginDialog } from "@/components/dashboard/LoginDialog";

interface DashboardLoginProps {
  showLoginDialog: boolean;
  setShowLoginDialog: (show: boolean) => void;
  onLogin: (type: 'admin' | 'user', username: string, password: string) => boolean;
}

export const DashboardLogin: React.FC<DashboardLoginProps> = ({
  showLoginDialog,
  setShowLoginDialog,
  onLogin,
}) => {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="text-center my-20 opacity-50">
        <h1 className="text-2xl font-bold tracking-tight">AKAR Farm Dashboard</h1>
        <p className="mt-2 text-sm">Please login to access the dashboard</p>
      </div>
      
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        onLogin={onLogin}
      />
    </div>
  );
};
