
// Types for farm locations
export interface FarmLocation {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: 'active' | 'inactive' | 'maintenance';
  containers: number;
  address: string;
}

// Types for container sales data
export interface ContainerSalesData {
  month: string;
  amount: number;
  id?: string;
  containerName?: string;
  supermarketClient?: {
    name: string;
    location: string;
    contractValue: number;
    imageUrl?: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  totalSales?: number;
  totalRevenue?: number;
  monthlySales?: {
    month: string;
    sales: number;
  }[];
  recurringCustomers?: {
    id: string;
    name: string;
    purchaseFrequency: string;
    imageUrl?: string;
  }[];
}

// Types for container status
export interface ContainerStatus {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  currentTemp: number;
  targetTemp: number;
  humidity: number;
  waterLevel: number;
  lastHarvest: string;
  nextMaintenance: string;
  harvestPerformance: number;
}

// Types for CCTV camera
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

// Alias type for backward compatibility
export type Camera = CCTVCamera;

// Types for climate sensor readings
export interface ClimateReading {
  id: string;
  timestamp: Date;
  temperature: number;
  humidity: number;
  co2: number;
  light: number;
}

// Types for water sensor readings
export interface WaterReading {
  id: string;
  timestamp: Date;
  ph: number;
  ec: number;
  tds: number;
  do: number;
  level: number;
  temperature: number;
}

// Types for sensor data
export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'error';
  iconName: string;
  lastUpdated: string;
  minValue: number;
  maxValue: number;
  category?: string;
}

// Type alias for sensor status
export type SensorStatus = 'normal' | 'warning' | 'error';

// Types for alerts
export interface Alert {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error';
  containerNumber: string;
  isRead: boolean;
}

// Types for harvests
export interface Harvest {
  id: string;
  cropName: string;
  containerNumber: string;
  plantedDate: Date;
  harvestDate: Date;
  status: 'growing' | 'ready' | 'harvested';
  estimatedYield: number;
  actualYield?: number;
  notes: string;
  // Additional properties for compatibility
  crop?: string;
  quantity?: number;
  unit?: string;
  date?: string;
}

// Types for tokenization data
export interface TokenizationData {
  totalValue: number;
  activeContracts: number;
  averageReturn: number;
  tokenBalance: number;
  tokenPrice: number;
  tokenChange: number;
  tokenChangeType: 'increase' | 'decrease';
  recentTransactions: {
    id: string;
    type: 'buy' | 'sell' | 'transfer';
    amount: number;
    value: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
  }[];
  tokenHolders: {
    category: string;
    percentage: number;
  }[];
  investments: {
    id: string;
    name: string;
    tokens: number;
    value: number;
    returnRate: number;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed';
  }[];
  // Additional properties for compatibility
  totalTokens?: number;
  totalInvestors?: number;
  contractDuration?: number;
  recentActivities?: {
    id: string;
    type: 'invested' | 'harvested' | 'other';
    description: string;
    tokenAmount: number;
    date: string;
    transactionHash?: string;
  }[];
  // Properties needed by TokenOverview
  tokenAllocation: {
    name: string;
    value: number;
  }[];
  investmentPerformance: {
    month: string;
    value: number;
  }[];
}

// Types for dashboard stats
export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
}
