
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/context/DeveloperModeContext"; // Fix: import User instead of UserRole

interface UserProfileSectionProps {
  user: User | null;
  onLogout: () => void;
}

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  user,
  onLogout,
}) => {
  if (!user) return null;

  const isAdmin = user.role === 'admin';
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="mt-auto pt-4 border-t border-border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {isAdmin ? 'Administrator' : 'Client User'}
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile Settings</DropdownMenuItem>
          <DropdownMenuItem>Notifications</DropdownMenuItem>
          {isAdmin && <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
