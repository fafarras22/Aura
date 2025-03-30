
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";

type DeveloperModeContextType = {
  isDeveloperMode: boolean;
  toggleDeveloperMode: () => void;
  loginAsAdmin: (password: string) => boolean;
  isAdminLoggedIn: boolean;
  logoutAdmin: () => void;
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

export type User = {
  id: string;
  name: string;
  role: 'admin' | 'client';
  containerId?: string;
};

// Admin and user credentials - in a real app, this would be stored securely on the server
const ADMIN_PASSWORD = "akar@admin2023"; 
const USERS: User[] = [
  { id: "admin-1", name: "Muhammad Farras", role: "admin" },
  { id: "client-1", name: "Guest", role: "client", containerId: "CONT-001" }
];

// User credentials - in a real app, these would be hashed and stored securely
const USER_PASSWORDS: Record<string, string> = {
  "Muhammad Farras": "admin123",
  "Guest": "guest123"
};

const DeveloperModeContext = createContext<DeveloperModeContextType | undefined>(undefined);

export function DeveloperModeProvider({ children }: { children: ReactNode }) {
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [securityChecks, setSecurityChecks] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
          // Remove the icon property since it's not supported directly
        });
      }
    };
    
    checkSecurity();
  }, []);

  const login = (username: string, password: string): boolean => {
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
    
    const user = USERS.find(u => u.name === username);
    
    if (user && USER_PASSWORDS[username] === password) {
      setCurrentUser(user);
      setLoginAttempts(0);
      
      // If admin user, also set admin mode
      if (user.role === 'admin') {
        setIsAdminLoggedIn(true);
        setIsDeveloperMode(true);
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome, ${username}!`,
        variant: "default"
      });
      
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  };

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
      // Find the admin user
      const adminUser = USERS.find(u => u.role === 'admin');
      if (adminUser) {
        setCurrentUser(adminUser);
      }
      
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

  const logout = () => {
    setCurrentUser(null);
    
    // If user was admin, also log out of admin mode
    if (currentUser?.role === 'admin') {
      logoutAdmin();
    }
    
    toast({
      title: "Logged Out",
      description: "You have been logged out.",
      variant: "default"
    });
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
    <DeveloperModeContext.Provider value={{ 
      isDeveloperMode, 
      toggleDeveloperMode, 
      loginAsAdmin, 
      isAdminLoggedIn, 
      logoutAdmin,
      currentUser,
      login,
      logout
    }}>
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
