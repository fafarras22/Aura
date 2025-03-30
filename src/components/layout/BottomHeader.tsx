
import React from 'react';
import { Home, Leaf, Droplet, Wind, Layers } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  isPrimary?: boolean;
}

export function BottomHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="h-6 w-6" /> },
    { path: '/sensors', label: 'Sensors', icon: <Leaf className="h-6 w-6" /> },
    { path: '/tokenization', label: 'Tokenization', icon: <Layers className="h-7 w-7" />, isPrimary: true },
    { path: '/water', label: 'Water', icon: <Droplet className="h-6 w-6" /> },
    { path: '/climate', label: 'Climate', icon: <Wind className="h-6 w-6" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-30 md:hidden">
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <TooltipProvider key={item.path}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="icon"
                  className={`p-3 rounded-none ${
                    item.isPrimary
                      ? location.pathname === item.path
                        ? 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
                        : 'text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                      : location.pathname === item.path
                        ? 'text-primary-foreground'
                        : 'text-gray-500 dark:text-gray-400'
                  } ${index === 2 ? 'relative -top-5 rounded-full shadow-lg h-14 w-14' : 'h-12 w-12'}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
