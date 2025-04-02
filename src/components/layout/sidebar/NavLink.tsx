
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  to: string;
  label: string;
  icon?: LucideIcon;
  exact?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  label, 
  icon: Icon, 
  exact = false,
  disabled = false,
  onClick
}) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to
    : location.pathname.startsWith(to);
  
  return (
    <Link
      to={disabled ? '#' : to}
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        disabled && "opacity-50 pointer-events-none"
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {label}
    </Link>
  );
};
