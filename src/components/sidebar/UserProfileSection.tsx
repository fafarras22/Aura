
import React from 'react';
import { Shield, LogOut, ToggleLeft, ToggleRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserRole } from '@/context/developer-mode/types';

interface UserProfileSectionProps {
  userName: string;
  userRole: UserRole;
  containerId?: string;
  canAccessDeveloperMode: boolean;
  isDeveloperMode: boolean;
  toggleDeveloperMode: () => void;
  onSignOut: () => void;
}

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  userName,
  userRole,
  containerId,
  canAccessDeveloperMode,
  isDeveloperMode,
  toggleDeveloperMode,
  onSignOut
}) => {
  // Determine badge style based on user role
  const userRoleText = userRole === 'admin' ? 'Admin' : 'Client';
  const userRoleBadgeVariant = userRole === 'admin' ? 'default' : 'outline';

  return (
    <div className="flex flex-col px-4 space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback className={`${
            userRole === 'admin' 
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" 
              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          }`}>
            {userName?.charAt(0) ?? (userRole === 'admin' ? "A" : "U")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{userName ?? 'Unknown User'}</p>
            <Badge variant={userRoleBadgeVariant} className="text-[10px] px-1.5 py-0">
              {userRoleText}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {containerId ? `Container: ${containerId}` : ''}
          </p>
        </div>
      </div>
      
      {/* Developer Mode Toggle - Only visible for admin users */}
      {canAccessDeveloperMode && (
        <Button 
          variant="outline" 
          size="sm"
          className="w-full justify-between hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 dark:hover:text-green-300"
          onClick={toggleDeveloperMode}
        >
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            <span>Developer Mode</span>
          </div>
          {isDeveloperMode ? (
            <ToggleRight className="w-4 h-4 text-green-500" />
          ) : (
            <ToggleLeft className="w-4 h-4" />
          )}
        </Button>
      )}
      
      {/* Security Status */}
      <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center space-x-2 text-green-700 dark:text-green-300 text-sm">
        <Shield className="w-4 h-4" />
        <span>Secure Connection</span>
      </div>
      
      {/* Sign Out Button */}
      <Button 
        variant="outline" 
        className="w-full justify-start hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 dark:hover:text-green-300"
        onClick={onSignOut}
      >
        <LogOut className="w-4 h-4 mr-2" />
        <span>Sign Out</span>
      </Button>
    </div>
  );
};
