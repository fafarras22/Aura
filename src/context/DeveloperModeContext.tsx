
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  DeveloperModeContextType, 
  User, 
  SuspiciousActivity,
  ContainerData
} from "./developer-mode/types";
import { USERS, CONTAINERS } from "./developer-mode/constants";
import { 
  handleUserLogin, 
  handleAdminLogin, 
  handleLogout, 
  handleLogoutAdmin,
  handleUserSignup
} from "./developer-mode/authOperations";
import { 
  toggleContainerStatus, 
  sendPaymentReminderNotification,
  getFilteredContainerData
} from "./developer-mode/containerOperations";

// Create context with initial values
const DeveloperModeContext = createContext<DeveloperModeContextType>({
  isDeveloperMode: false,
  toggleDeveloperMode: () => {},
  loginAsAdmin: () => false,
  isAdminLoggedIn: false,
  logoutAdmin: () => {},
  currentUser: null,
  login: () => false,
  signup: () => false,
  logout: () => {},
  suspiciousActivities: [],
  clearSuspiciousActivities: () => {},
  canAccessDeveloperMode: false,
  toggleContainerOperation: () => {},
  sendPaymentReminder: () => {},
  getContainerData: () => [],
});

export const DeveloperModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [suspiciousActivities, setSuspiciousActivities] = useState<SuspiciousActivity[]>([]);
  const [containers, setContainers] = useState<ContainerData[]>(CONTAINERS);

  // Only admin users can access developer mode
  const canAccessDeveloperMode = currentUser?.role === 'admin';

  // Toggle developer mode (only if logged in as admin)
  const toggleDeveloperMode = () => {
    if (isAdminLoggedIn) {
      setIsDeveloperMode(!isDeveloperMode);
    }
  };

  // Admin login
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

  // Admin logout
  const logoutAdmin = () => {
    handleLogoutAdmin(setIsAdminLoggedIn, setIsDeveloperMode);
  };

  // User login
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

  // User signup
  const signup = (username: string, password: string): boolean => {
    return handleUserSignup(username, password, setCurrentUser);
  };

  // User logout
  const logout = () => {
    handleLogout(setCurrentUser, currentUser, logoutAdmin);
  };

  // Clear suspicious activities
  const clearSuspiciousActivities = () => {
    setSuspiciousActivities([]);
  };

  // Toggle container operation (start/stop)
  const toggleContainerOperation = (containerId: string, active: boolean) => {
    const updatedContainers = toggleContainerStatus(containers, containerId, active);
    setContainers(updatedContainers);
  };

  // Send payment reminder
  const sendPaymentReminder = (containerId: string) => {
    sendPaymentReminderNotification(containerId);
  };

  // Get container data (filtered by containerId if provided)
  const getContainerData = (containerId?: string): ContainerData[] => {
    return getFilteredContainerData(containers, isDeveloperMode, currentUser, containerId);
  };

  const contextValue: DeveloperModeContextType = {
    isDeveloperMode,
    toggleDeveloperMode,
    loginAsAdmin,
    isAdminLoggedIn,
    logoutAdmin,
    currentUser,
    login,
    signup,
    logout,
    suspiciousActivities,
    clearSuspiciousActivities,
    canAccessDeveloperMode,
    toggleContainerOperation,
    sendPaymentReminder,
    getContainerData,
  };

  return (
    <DeveloperModeContext.Provider value={contextValue}>
      {children}
    </DeveloperModeContext.Provider>
  );
};

export const useDeveloperMode = () => useContext(DeveloperModeContext);
export type { User };
