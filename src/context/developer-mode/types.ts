
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'client' | 'manager';
  containerId?: string;
  avatar: string;
}

export interface ContainerData {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  sensors?: {
    temperature?: number;
    humidity?: number;
    co2?: number;
    ph?: number;
  };
  currentCapacity?: number;
  maxCapacity?: number;
  lastHarvest?: string;
  nextHarvest?: string;
  owner?: string;
  client?: string;
}

export interface SuspiciousActivity {
  id: string;
  timestamp: Date;
  ipAddress: string;
  action: string;
  username?: string;
}

export interface DeveloperModeContextType {
  isDeveloperMode: boolean;
  toggleDeveloperMode: () => void;
  loginAsAdmin: (password: string) => boolean;
  isAdminLoggedIn: boolean;
  logoutAdmin: () => void;
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
  suspiciousActivities: SuspiciousActivity[];
  clearSuspiciousActivities: () => void;
  canAccessDeveloperMode: boolean;
  toggleContainerOperation: (containerId: string, active: boolean) => void;
  sendPaymentReminder: (containerId: string) => void;
  getContainerData: (containerId?: string) => ContainerData[];
}
