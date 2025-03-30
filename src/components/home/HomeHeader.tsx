
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface HomeHeaderProps {
  language: 'en' | 'id';
  setLanguage: (language: 'en' | 'id') => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ language, setLanguage }) => {
  return (
    <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" 
            alt="AKAR Logo" 
            className="h-10"
          />
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              {language === 'en' ? 'About' : 'Tentang'}
            </a>
            <a href="#solutions" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              {language === 'en' ? 'Solutions' : 'Solusi'}
            </a>
            <a href="#technology" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              {language === 'en' ? 'Technology' : 'Teknologi'}
            </a>
            <a href="#tokenization" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              {language === 'en' ? 'Tokenization' : 'Tokenisasi'}
            </a>
            <a href="#indonesia" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              {language === 'en' ? 'Indonesia Impact' : 'Dampak Indonesia'}
            </a>
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
                </div>
              </PopoverContent>
            </Popover>
            <Link to="/login">
              <Button variant="outline" size="sm">
                {language === 'en' ? 'Sign in' : 'Masuk'}
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="apple" size="sm" className="rounded-full">
                {language === 'en' ? 'Dashboard' : 'Dasbor'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
