
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
