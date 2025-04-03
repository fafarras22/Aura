
import React, { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  LayoutDashboard, 
  Sprout, 
  Coins, 
  BarChart2, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppHeader } from './AppHeader';
import { WalletConnectModal } from '@/components/wallet/WalletConnectModal';

interface MobileLayoutProps {
  children: ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent';
  };
  
  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <AppHeader setShowWalletModal={setShowWalletModal} />
      
      <div className="flex items-center h-16 px-4 border-b md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="h-16 border-b flex items-center px-6">
              <h1 className="text-xl font-bold">AKAR FarmWatch</h1>
            </div>
            
            <div className="py-4 px-3 space-y-1">
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${isActive('/')}`}
                onClick={() => navigateTo('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${isActive('/dashboard')}`}
                onClick={() => navigateTo('/dashboard')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${isActive('/farm-projects')}`}
                onClick={() => navigateTo('/farm-projects')}
              >
                <Sprout className="mr-2 h-4 w-4" />
                Farm Projects
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${isActive('/tokenization')}`}
                onClick={() => navigateTo('/tokenization')}
              >
                <Coins className="mr-2 h-4 w-4" />
                Tokenization
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${isActive('/analytics')}`}
                onClick={() => navigateTo('/analytics')}
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${isActive('/settings')}`}
                onClick={() => navigateTo('/settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto p-4">
        {children}
      </main>
      
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
      />
    </div>
  );
};
