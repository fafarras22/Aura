
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Logo } from "@/components/logo/Logo";
import { Wallet, Languages } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface HomeHeaderProps {
  language: string;
  onLanguageSelect: (lang: any) => void;
  wallet: {
    connected: boolean;
    address?: string;
  };
  onConnectWallet: () => void;
  onNavigate: NavigateFunction;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ 
  language, 
  onLanguageSelect, 
  wallet, 
  onConnectWallet, 
  onNavigate 
}) => {
  return (
    <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-950/90">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo size="lg" showText={false} />
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/farm-projects" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Projects
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/tokenization" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              $AKR Token
            </Link>
            <Link to="/analytics" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              Analytics
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
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
                    onClick={() => onLanguageSelect('en')}
                    className="justify-start"
                  >
                    English
                  </Button>
                  <Button 
                    variant={language === 'id' ? "default" : "ghost"} 
                    onClick={() => onLanguageSelect('id')}
                    className="justify-start"
                  >
                    Indonesia
                  </Button>
                  <Button 
                    variant={language === 'th' ? "default" : "ghost"} 
                    onClick={() => onLanguageSelect('th')}
                    className="justify-start"
                  >
                    ไทย
                  </Button>
                  <Button 
                    variant={language === 'vi' ? "default" : "ghost"} 
                    onClick={() => onLanguageSelect('vi')}
                    className="justify-start"
                  >
                    Tiếng Việt
                  </Button>
                  <Button 
                    variant={language === 'ms' ? "default" : "ghost"} 
                    onClick={() => onLanguageSelect('ms')}
                    className="justify-start"
                  >
                    Bahasa Melayu
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            {wallet.connected ? (
              <Button 
                variant="default" 
                onClick={() => onNavigate('/dashboard')}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                variant="default" 
                onClick={onConnectWallet}
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
