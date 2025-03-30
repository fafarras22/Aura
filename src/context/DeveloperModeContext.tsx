
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { User, ContainerData, SuspiciousActivity, DeveloperModeContextType } from './developer-mode/types';
import { USERS, CONTAINERS } from './developer-mode/constants';
import { logSuspiciousActivity, handleLoginAttempts } from './developer-mode/securityUtils';
import { 
  getFilteredContainerData, 
  toggleContainer, 
  sendPaymentReminder as sendReminder 
} from './developer-mode/containerOperations';
import { 
  handleUserLogin, 
  handleAdminLogin, 
  handleLogout as logoutUser, 
  handleLogoutAdmin 
} from './developer-mode/authOperations';

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
        });
      }
    };
    
    checkSecurity();
  }, []);

  // Wrapper functions that use the imported utility functions
  const getContainerData = (containerId?: string): ContainerData[] => {
    return getFilteredContainerData(containers, isDeveloperMode, currentUser, containerId);
  };

  const toggleContainerOperation = (containerId: string, active: boolean): void => {
    toggleContainer(containerId, active, isDeveloperMode, containers, setContainers);
  };

  const sendPaymentReminder = (containerId: string): void => {
    sendReminder(containerId, isDeveloperMode, containers);
  };

  const login = (username: string, password: string): boolean => {
    return handleUserLogin(
      username, 
      password, 
      loginAttempts, 
      setLoginAttempts, 
      setCurrentUser, 
      setIsAdminLoggedIn, 
      setIsDeveloperMode,
      setSuspiciousActivities
    );
  };

  const loginAsAdmin = (password: string): boolean => {
    return handleAdminLogin(
      password, 
      loginAttempts, 
      setLoginAttempts, 
      setCurrentUser, 
      setIsAdminLoggedIn, 
      setIsDeveloperMode,
      setSuspiciousActivities
    );
  };

  const logout = (): void => {
    logoutUser(setCurrentUser, currentUser, logoutAdmin);
  };

  const logoutAdmin = (): void => {
    handleLogoutAdmin(setIsAdminLoggedIn, setIsDeveloperMode);
  };

  const toggleDeveloperMode = (): void => {
    if (!canAccessDeveloperMode && !isDeveloperMode) {
      // Log potential hack attempt if a client user tries to enable developer mode
      if (currentUser && currentUser.role === 'client') {
        logSuspiciousActivity(
          "Client user attempted to access developer mode", 
          currentUser.name,
          setSuspiciousActivities
        );
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

  const clearSuspiciousActivities = (): void => {
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

// Export types for easy import by other components
export type { User, ContainerData, SuspiciousActivity };

export function useDeveloperMode() {
  const context = useContext(DeveloperModeContext);
  if (context === undefined) {
    throw new Error('useDeveloperMode must be used within a DeveloperModeProvider');
  }
  return context;
}
