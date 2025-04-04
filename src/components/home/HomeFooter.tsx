
import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo/Logo";
import { Lock } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface HomeFooterProps {
  onNavigate: NavigateFunction;
}

export const HomeFooter: React.FC<HomeFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-12 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo size="md" showText={false} />
            </div>
            
            <p className="text-muted-foreground">
              Revolutionizing agriculture across ASEAN through blockchain technology and sustainable farming investments.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/farm-projects" className="text-muted-foreground hover:text-primary">Projects</Link></li>
              <li><Link to="/tokenization" className="text-muted-foreground hover:text-primary">$AKR Token</Link></li>
              <li><Link to="/analytics" className="text-muted-foreground hover:text-primary">Analytics</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">WhitePaper</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary">support@akar.farm</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Telegram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 AKAR Farm. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm">Terms</Button>
            <Button variant="ghost" size="sm">Privacy</Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => onNavigate('/admin-signup')}
            >
              <Lock className="h-4 w-4" />
              Admin Access
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
