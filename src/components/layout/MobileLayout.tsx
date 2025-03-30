
import React, { useState } from 'react';
import { Menu, X, Home, Leaf, Droplet, Wind, Bell, Settings, Layers, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeveloperMode } from '@/context/DeveloperModeContext';
import { AppleNotification } from '@/components/ui/apple-notification';
import { Switch } from '@/components/ui/switch';

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
      <header className="h-16 border-b flex items-center justify-between px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <img src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" alt="AKAR Logo" className="h-8" />
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={triggerNotification}
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 z-50 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start ${
                    location.pathname === item.path 
                      ? 'bg-primary/10 text-primary' 
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
            
            <div className="mt-8 pt-4 border-t">
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
                className="w-full mt-4 justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
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
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-30">
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
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'text-green-600 hover:bg-green-50'
                        : location.pathname === item.path
                          ? 'text-primary-foreground'
                          : 'text-gray-500'
                    } ${index === 2 ? 'relative -top-3 rounded-full shadow-lg' : ''}`}
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

      {/* Notification */}
      <AppleNotification
        title="Welcome to AKAR Farm"
        description="Monitor your farm's status in real-time with our advanced dashboard."
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        icon={<Bell className="w-5 h-5 text-primary" />}
      />
    </div>
  );
}
