
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockContainers } from './mockData';
import type { User, ContainerData } from './types';

interface DeveloperModeContextType {
  isDeveloperMode: boolean;
  toggleDeveloperMode: () => void;
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  loginAsAdmin: (password: string) => boolean;
  logout: () => void;
  getContainerData: () => ContainerData[];
}

const DeveloperModeContext = createContext<DeveloperModeContextType>({
  isDeveloperMode: false,
  toggleDeveloperMode: () => {},
  currentUser: null,
  login: () => false,
  loginAsAdmin: () => false,
  logout: () => {},
  getContainerData: () => [],
});

export const DeveloperModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDeveloperMode, setIsDeveloperMode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [containerData, setContainerData] = useState<ContainerData[]>(mockContainers);
  
  // Load saved state from localStorage on component mount
  useEffect(() => {
    // Load developer mode state
    const savedDeveloperMode = localStorage.getItem('isDeveloperMode');
    if (savedDeveloperMode) {
      setIsDeveloperMode(JSON.parse(savedDeveloperMode));
    }
    
    // Load logged in user state
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isDeveloperMode', JSON.stringify(isDeveloperMode));
  }, [isDeveloperMode]);
  
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);
  
  const toggleDeveloperMode = () => {
    setIsDeveloperMode(prev => !prev);
  };
  
  const login = (username: string, password: string): boolean => {
    // Simple mock login - in a real app this would connect to an auth service
    if (username && password) {
      const mockUser: User = {
        id: 'user-1',
        name: username,
        role: 'client',
        containerId: 'container-1',
        avatar: '',
      };
      
      setCurrentUser(mockUser);
      return true;
    }
    return false;
  };
  
  const loginAsAdmin = (password: string): boolean => {
    // Simple mock admin login - in a real app this would have proper security
    if (password === 'admin') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Administrator',
        role: 'admin',
        avatar: '',
      };
      
      setCurrentUser(adminUser);
      setIsDeveloperMode(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setCurrentUser(null);
  };
  
  const getContainerData = (): ContainerData[] => {
    return containerData;
  };
  
  return (
    <DeveloperModeContext.Provider
      value={{
        isDeveloperMode,
        toggleDeveloperMode,
        currentUser,
        login,
        loginAsAdmin,
        logout,
        getContainerData,
      }}
    >
      {children}
    </DeveloperModeContext.Provider>
  );
};

export const useDeveloperMode = () => {
  const context = useContext(DeveloperModeContext);
  if (!context) {
    throw new Error('useDeveloperMode must be used within a DeveloperModeProvider');
  }
  return context;
};
