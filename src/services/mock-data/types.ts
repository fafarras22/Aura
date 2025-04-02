
// Define all shared types for mock data here

export interface FarmLocation {
  id: string;
  name: string;
  status: 'active' | 'maintenance' | 'offline';
  location: {
    lat: number;
    lng: number;
  };
  containers: number;
  address: string;
}

export interface ContainerSalesData {
  id: string;
  containerName: string;
  totalSales: number;
  totalRevenue: number;
  supermarketClient?: {
    name: string;
    imageUrl: string;
    location: string;
    contractValue: number;
  };
  monthlySales?: {
    month: string;
    sales: number;
  }[];
  recurringCustomers?: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  month: string;
  amount: number;
}

export interface TokenizationData {
  totalValue: number;
  totalTokens: number;
  activeContracts: number;
  totalInvestors: number;
  averageReturn: number;
  recentActivities: {
    id: string;
    type: 'invested' | 'harvested' | 'transferred';
    description: string;
    tokenAmount: number;
    date: string;
    transactionHash: string;
  }[];
  tokenBalance: number;
  tokenPrice: number;
  tokenChange: number;
  tokenChangeType: 'increase' | 'decrease' | 'stable';
  tokenHolders: any[];
  investments: any[];
  recentTransactions: any[];
  tokenAllocation: any[];
  investmentPerformance: any[];
  contractDuration: number;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  containerNumber: string;
  isRead: boolean;
  timestamp: Date | string;
}

// New types needed for other mock data files
export interface CCTVCamera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  lastMotion: Date;
  preview: string;
  imageUrl: string;
  lastRecording: Date;
}

export interface ContainerStatus {
  id: string;
  name: string;
  status: 'active' | 'maintenance' | 'inactive';
  currentTemp: number;
  targetTemp: number;
  humidity: number;
  waterLevel: number;
  lastHarvest: string;
  nextMaintenance: string;
  harvestPerformance: number;
}

export interface DashboardStat {
  id: string;
  title: string;
  value: number | string;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  icon: string;
}

export interface Harvest {
  id: string;
  cropName: string;
  containerName: string;
  harvestDate: string;
  amount: number;
  unit: string;
  status: 'scheduled' | 'harvested' | 'in-progress';
  notes?: string;
}

export interface ClimateReading {
  timestamp: string;
  temperature: number;
  humidity: number;
  co2: number;
  light: number;
}

export interface WaterReading {
  timestamp: string;
  ph: number;
  ec: number;
  tds: number;
  do: number;
  level: number;
  temperature: number;
}

export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'error';
  category: 'climate' | 'water' | 'energy' | 'environment';
  lastUpdated: string;
}

// SensorStatus used in SensorCard component
export type SensorStatus = 'normal' | 'warning' | 'error';
