
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const NavSection: React.FC<NavSectionProps> = ({ 
  title, 
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="py-1">
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "transform rotate-180"
          )} 
        />
      </button>
      
      {isOpen && (
        <div className="mt-1 ml-2 pl-2 border-l border-border">
          {children}
        </div>
      )}
    </div>
  );
};
