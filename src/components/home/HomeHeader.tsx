
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { Wallet, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface HomeHeaderProps {
  language: 'en' | 'id' | 'ko';
  setLanguage: (language: 'en' | 'id' | 'ko') => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ language, setLanguage }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="link" className="p-0" onClick={() => navigate('/')}>
            <span className="text-xl font-bold">AKAR Farm</span>
          </Button>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="link" onClick={() => navigate('/')}>Home</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="gap-1">
                Products <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={() => navigate('/farm-projects')}>
                Container Projects
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/tokenization')}>
                $AKR Tokenization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="link" onClick={() => navigate('/how-it-works')}>How It Works</Button>
          <Button variant="link" onClick={() => navigate('/sensors')}>Farm Monitoring</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="gap-1">
                About <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={() => navigate('/about')}>
                About Us
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/whitepaper')}>
                Whitepaper
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/careers')}>
                Careers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/partners')}>
                Partners
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="gap-1">
                Legal <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={() => navigate('/privacy-policy')}>
                Privacy Policy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/terms-of-service')}>
                Terms of Service
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/legal')}>
                Legal Information
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <div className="flex items-center gap-2">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <ModeToggle />
          <Button size="sm" onClick={() => navigate('/connect-wallet')} className="gap-1">
            <Wallet className="h-4 w-4" />
            Connect
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
