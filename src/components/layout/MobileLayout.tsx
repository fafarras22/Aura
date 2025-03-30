import React, { useState } from 'react';
import { Menu, X, Home, Leaf, Droplet, Wind, Bell, Settings, Layers, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeveloperMode } from '@/context/DeveloperModeContext';
import { AppleNotification } from '@/components/ui/apple-notification';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BottomHeader } from './BottomHeader';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  isPrimary?: boolean;
}

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();
  const navigate = useNavigate();
  const location = useLocation();

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/sensors', label: 'Sensors', icon: <Leaf className="w-5 h-5" /> },
    { path: '/tokenization', label: 'Tokenization', icon: <Layers className="w-5 h-5" />, isPrimary: true },
    { path: '/water', label: 'Water', icon: <Droplet className="w-5 h-5" /> },
    { path: '/climate', label: 'Climate', icon: <Wind className="w-5 h-5" /> },
  ];

  const handleSignOut = () => {
    // In a real app, this would include authentication logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="h-16 border-b flex items-center justify-between px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="h-8 w-8 rounded-md overflow-hidden bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
            <img src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" alt="AKAR Logo" className="h-7" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={triggerNotification}
          >
            <Bell className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 border border-primary/20">
                  <AvatarImage src="" alt="@user" />
                  <AvatarFallback className="bg-primary/10 dark:bg-primary/20 text-primary">MF</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Muhammad Farras</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">muhammad.farras@gmail.com</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 dark:bg-black/70" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 z-50 p-4 overflow-y-auto border-r border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="@user" />
                <AvatarFallback className="bg-primary/10 dark:bg-primary/20 text-primary">MF</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">Muhammad Farras</p>
                <p className="text-xs text-muted-foreground">muhammad.farras@gmail.com</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start ${
                    location.pathname === item.path 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="flex items-center w-full">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </div>
                </Button>
              ))}
            </nav>
            
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm">Developer Mode</span>
                <Switch
                  checked={isDeveloperMode}
                  onCheckedChange={toggleDeveloperMode}
                />
              </div>
              
              {/* Sign Out Button */}
              <Button 
                variant="ghost" 
                className="w-full mt-4 justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:text-red-400"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto pb-16">
        {children}
      </main>

      {/* Bottom Header using the dedicated component */}
      <BottomHeader />

      {/* Notification */}
      <AppleNotification
        title="AKAR Farm Update"
        description="Monitor your farm's status in real-time with our advanced dashboard."
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        icon={<Bell className="w-5 h-5 text-primary" />}
      />
    </div>
  );
}
