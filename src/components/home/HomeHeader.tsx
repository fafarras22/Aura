
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { LanguageSelector } from "@/components/layout/LanguageSelector";

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
          <Button variant="link" onClick={() => navigate('/farm-projects')}>Projects</Button>
          <Button variant="link" onClick={() => navigate('/learn-more')}>Learn More</Button>
          <Button variant="link" onClick={() => navigate('/explore-solutions')}>Solutions</Button>
        </nav>
        
        <div className="flex items-center gap-2">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <ModeToggle />
          <Button size="sm" onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
