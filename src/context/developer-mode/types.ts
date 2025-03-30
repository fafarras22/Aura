
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

export interface DeveloperModeContextType {
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
}
