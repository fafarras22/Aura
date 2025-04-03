
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Home, LayoutDashboard, Sprout, Coins, BarChart2, Settings, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { WalletConnectModal } from '@/components/wallet/WalletConnectModal';
import { useState } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-accent';
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Fixed Header */}
      <AppHeader setShowWalletModal={setShowWalletModal} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r bg-background hidden md:block">          
          <div className="py-4 px-3 space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${isActive('/')}`}
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${isActive('/dashboard')}`}
              onClick={() => navigate('/dashboard')}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${isActive('/farm-projects')}`}
              onClick={() => navigate('/farm-projects')}
            >
              <Sprout className="mr-2 h-4 w-4" />
              Farm Projects
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${isActive('/tokenization')}`}
              onClick={() => navigate('/tokenization')}
            >
              <Coins className="mr-2 h-4 w-4" />
              Tokenization
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${isActive('/analytics')}`}
              onClick={() => navigate('/analytics')}
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${isActive('/settings')}`}
              onClick={() => navigate('/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">          
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
      
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
      />
    </div>
  );
};
