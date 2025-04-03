
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo/Logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Languages, Wallet } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { DisconnectWalletButton } from '@/components/wallet/DisconnectWalletButton';

interface AppHeaderProps {
  setShowWalletModal?: (show: boolean) => void;
  language?: 'en' | 'id' | 'ko';
  setLanguage?: (language: 'en' | 'id' | 'ko') => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  setShowWalletModal,
  language = 'en',
  setLanguage
}) => {
  const navigate = useNavigate();
  const { wallet } = useWallet();
  
  const handleConnectWallet = () => {
    if (setShowWalletModal) {
      setShowWalletModal(true);
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-950/90">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <Logo size="lg" showText={true} />
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/farm-projects" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Farm Projects
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/tokenization" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Token
            </Link>
            <Link to="/analytics" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Analytics
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {setLanguage && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Languages className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <div className="grid gap-1">
                    <Button 
                      variant={language === 'en' ? "default" : "ghost"} 
                      onClick={() => setLanguage('en')}
                      className="justify-start"
                    >
                      English
                    </Button>
                    <Button 
                      variant={language === 'id' ? "default" : "ghost"} 
                      onClick={() => setLanguage('id')}
                      className="justify-start"
                    >
                      Indonesia
                    </Button>
                    <Button 
                      variant={language === 'ko' ? "default" : "ghost"} 
                      onClick={() => setLanguage('ko')}
                      className="justify-start"
                    >
                      한국어
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            
            {wallet.connected ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:flex"
                >
                  Dashboard
                </Button>
                <DisconnectWalletButton variant="text" />
              </div>
            ) : (
              <Button 
                variant="default" 
                onClick={handleConnectWallet}
                className="gap-2"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
