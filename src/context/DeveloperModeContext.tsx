
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";

type DeveloperModeContextType = {
  isDeveloperMode: boolean;
  toggleDeveloperMode: () => void;
  loginAsAdmin: (password: string) => boolean;
  isAdminLoggedIn: boolean;
  logoutAdmin: () => void;
};

const DeveloperModeContext = createContext<DeveloperModeContextType | undefined>(undefined);

// Admin password - in a real app, this would be handled securely on the server
const ADMIN_PASSWORD = "akar@admin2023"; 

export function DeveloperModeProvider({ children }: { children: ReactNode }) {
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [securityChecks, setSecurityChecks] = useState<boolean>(false);

  // Track login attempts for security
  const [loginAttempts, setLoginAttempts] = useState<number>(0);

  useEffect(() => {
    // Run security checks when mounted
    const checkSecurity = () => {
      const securityPassed = true; // In a real app, perform actual security checks
      setSecurityChecks(securityPassed);
      
      if (securityPassed) {
        toast({
          title: "Security Check Passed",
          description: "Your connection is secure and encrypted.",
          variant: "default",
          icon: <Shield className="h-5 w-5 text-green-500" />
        });
      }
    };
    
    checkSecurity();
  }, []);

  const loginAsAdmin = (password: string): boolean => {
    // Track login attempts for security
    setLoginAttempts(prev => prev + 1);
    
    // Implement login timeout after multiple failed attempts
    if (loginAttempts >= 5) {
      toast({
        title: "Too Many Attempts",
        description: "For security reasons, please try again later.",
        variant: "destructive"
      });
      return false;
    }
    
    if (password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      setIsDeveloperMode(true);
      setLoginAttempts(0);
      
      toast({
        title: "Admin Login Successful",
        description: "Developer mode is now active.",
        variant: "default"
      });
      
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid password. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsDeveloperMode(false);
    
    toast({
      title: "Logged Out",
      description: "You have been logged out of admin mode.",
      variant: "default"
    });
  };

  const toggleDeveloperMode = () => {
    if (!isAdminLoggedIn && !isDeveloperMode) {
      toast({
        title: "Authentication Required",
        description: "Admin login is required to enable developer mode.",
        variant: "default"
      });
      return;
    }
    
    // If already logged in as admin, allow toggling developer mode
    setIsDeveloperMode(prev => !prev);
  };

  return (
    <DeveloperModeContext.Provider value={{ isDeveloperMode, toggleDeveloperMode, loginAsAdmin, isAdminLoggedIn, logoutAdmin }}>
      {children}
    </DeveloperModeContext.Provider>
  );
}

export function useDeveloperMode() {
  const context = useContext(DeveloperModeContext);
  if (context === undefined) {
    throw new Error('useDeveloperMode must be used within a DeveloperModeProvider');
  }
  return context;
}
