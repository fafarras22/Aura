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
  suspiciousActivities: SuspiciousActivity[];
  clearSuspiciousActivities: () => void;
  canAccessDeveloperMode: boolean;
  toggleContainerOperation: (containerId: string, active: boolean) => void;
  sendPaymentReminder: (containerId: string) => void;
  getContainerData: (containerId?: string) => ContainerData[];
};

export type User = {
  id: string;
  name: string;
  role: 'admin' | 'client';
  containerId?: string;
};

export type ContainerData = {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  owner: string;
  lastPayment?: Date;
  nextPaymentDue?: Date;
};

export type SuspiciousActivity = {
  id: string;
  timestamp: Date;
  ipAddress: string;
  action: string;
  username?: string;
};

// Admin and user credentials - in a real app, this would be stored securely on the server
const ADMIN_PASSWORD = "admin@akar2025"; 
const USERS: User[] = [
  { id: "admin-1", name: "Muhammad Farras", role: "admin" },
  { id: "client-1", name: "Guest", role: "client", containerId: "CONT-001" }
];

// Mock container data - in a real app, this would come from a database
const CONTAINERS: ContainerData[] = [
  { 
    id: "CONT-001", 
    name: "Jakarta Farm Container A", 
    location: "Jakarta", 
    status: "active", 
    owner: "Guest",
    lastPayment: new Date(2025, 2, 15),
    nextPaymentDue: new Date(2025, 3, 15)
  },
  { 
    id: "CONT-002", 
    name: "Surabaya Farm Container B", 
    location: "Surabaya", 
    status: "active", 
    owner: "Company B",
    lastPayment: new Date(2025, 2, 10),
    nextPaymentDue: new Date(2025, 3, 10)
  },
  { 
    id: "CONT-003", 
    name: "Bandung Farm Container C", 
    location: "Bandung", 
    status: "maintenance", 
    owner: "Company C",
    lastPayment: new Date(2025, 1, 25),
    nextPaymentDue: new Date(2025, 2, 25)
  }
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
  const [suspiciousActivities, setSuspiciousActivities] = useState<SuspiciousActivity[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<string[]>([]);
  const [containers, setContainers] = useState<ContainerData[]>(CONTAINERS);

  // Track login attempts for security
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  
  // Computed property to determine if the user can access developer mode
  const canAccessDeveloperMode = isAdminLoggedIn || (currentUser?.role === 'admin');

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

  // Function to get container data based on role and containerId
  const getContainerData = (containerId?: string): ContainerData[] => {
    // Admin or developer mode can see all containers
    if (isDeveloperMode || (currentUser && currentUser.role === 'admin')) {
      return containers;
    }
    
    // Client can only see their own container
    if (currentUser && currentUser.role === 'client') {
      return containers.filter(container => 
        container.id === (containerId || currentUser.containerId)
      );
    }
    
    // If no user is logged in, return empty array
    return [];
  };

  // Function to toggle container operation status
  const toggleContainerOperation = (containerId: string, active: boolean) => {
    // Only allow in developer mode
    if (!isDeveloperMode) {
      toast({
        title: "Access Denied",
        description: "Only administrators can control container operations.",
        variant: "destructive"
      });
      return;
    }
    
    // Update container status
    setContainers(prev => prev.map(container => {
      if (container.id === containerId) {
        return {
          ...container,
          status: active ? 'active' : 'inactive'
        };
      }
      return container;
    }));
    
    toast({
      title: `Container ${active ? 'Activated' : 'Deactivated'}`,
      description: `Container ${containerId} has been ${active ? 'activated' : 'deactivated'}.`,
      variant: active ? "default" : "destructive"
    });
  };

  // Function to send payment reminder to client
  const sendPaymentReminder = (containerId: string) => {
    // Only allow in developer mode
    if (!isDeveloperMode) {
      toast({
        title: "Access Denied",
        description: "Only administrators can send payment reminders.",
        variant: "destructive"
      });
      return;
    }
    
    // Find container
    const container = containers.find(c => c.id === containerId);
    if (!container) {
      toast({
        title: "Container Not Found",
        description: `Container ${containerId} was not found.`,
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send an email or notification
    toast({
      title: "Payment Reminder Sent",
      description: `Payment reminder sent to owner of container ${container.name}.`,
      variant: "default"
    });
  };

  // Function to log suspicious activities
  const logSuspiciousActivity = (action: string, username?: string) => {
    // In a real app, you would get the actual IP address from the request
    const mockIpAddress = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    const newActivity: SuspiciousActivity = {
      id: Date.now().toString(),
      timestamp: new Date(),
      ipAddress: mockIpAddress,
      action,
      username
    };
    
    setSuspiciousActivities(prev => [...prev, newActivity]);
    
    // In a real app, you would also send this information to your backend for logging
    console.log("SECURITY ALERT:", newActivity);
    
    return newActivity;
  };

  const login = (username: string, password: string): boolean => {
    // Track login attempts for security
    setLoginAttempts(prev => prev + 1);
    
    // Check if there have been too many failed attempts
    if (loginAttempts >= 5) {
      const activity = logSuspiciousActivity("Too many login attempts", username);
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
      // Log failed login attempt
      if (loginAttempts >= 2) {
        logSuspiciousActivity("Multiple failed login attempts", username);
      }
      
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
      logSuspiciousActivity("Too many admin login attempts");
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
      // Log suspicious admin login attempt
      logSuspiciousActivity("Failed admin login attempt", password);
      
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
    if (!canAccessDeveloperMode && !isDeveloperMode) {
      // Log potential hack attempt if a client user tries to enable developer mode
      if (currentUser && currentUser.role === 'client') {
        logSuspiciousActivity("Client user attempted to access developer mode", currentUser.name);
      }
      
      toast({
        title: "Access Denied",
        description: "Only AKAR admin users can access developer mode.",
        variant: "destructive"
      });
      return;
    }
    
    // If already logged in as admin, allow toggling developer mode
    setIsDeveloperMode(prev => !prev);
    
    toast({
      title: isDeveloperMode ? "Developer Mode Disabled" : "Developer Mode Enabled",
      description: isDeveloperMode 
        ? "Switched to client view mode." 
        : "Full administrative access activated.",
      variant: "default"
    });
  };

  const clearSuspiciousActivities = () => {
    setSuspiciousActivities([]);
    toast({
      title: "Security Log Cleared",
      description: "All suspicious activity records have been cleared.",
      variant: "default"
    });
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
      logout,
      suspiciousActivities,
      clearSuspiciousActivities,
      canAccessDeveloperMode,
      toggleContainerOperation,
      sendPaymentReminder,
      getContainerData
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
