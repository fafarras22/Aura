
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
