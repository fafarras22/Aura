
import { faker } from '@faker-js/faker';

export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  iconName: string;
  status: 'normal' | 'warning' | 'error';
  minValue: number;
  maxValue: number;
  lastUpdated: string;
  category?: string; // Added for Climate, Sensors, Water pages
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  isRead: boolean;
  title?: string; // Added for Alerts.tsx
  category?: string; // Added for Alerts.tsx
}

export interface Harvest {
  id: string;
  plantName: string;  // Added for Harvest.tsx
  plantType: string;  // Added for Harvest.tsx
  plantedDate: string; // Added for Harvest.tsx
  estimatedHarvestDate: string; // Added for Harvest.tsx
  actualHarvestDate?: string; // Added for Harvest.tsx
  harvestWeight?: number; // Added for Harvest.tsx
  status: 'ready' | 'growing' | 'harvested'; // Changed from 'ready' | 'in progress' | 'completed'
  crop: string;
  quantity: number;
  unit: string;
  date: string;
  container: string; // Added for Harvest.tsx
  images: string[]; // Added for Harvest.tsx
}

export interface ContainerSalesData {
  id: string;
  containerName: string;
  supermarketClient: {
    name: string;
    location: string;
    imageUrl?: string; // Added for SalesStatusCard.tsx
  };
  priceRange: {
    min: number;
    max: number;
  };
  totalSales: number;
  totalRevenue: number; // Added for SalesStatusCard.tsx
  monthlySales: Array<{ month: string; sales: number }>; // Added for SalesStatusCard.tsx
  recurringCustomers: Array<{
    id: string;
    name: string;
    imageUrl?: string; // Added for SalesStatusCard.tsx
  }>;
}

export interface ClientData {
  id: string;
  name: string;
  location: string;
  imageUrl?: string;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  isOnline: boolean;
  lastSnapshot: string;
}

export interface FarmLocation {
  id: string;
  name: string;
  address: string;
  coordinates: {
    x: number;
    y: number;
  };
}

// Added recentActivities and totalInvestors to TokenizationData
export interface TokenizationData {
  totalValue: number;
  activeContracts: number;
  averageReturn: number;
  totalTokens?: number; // Added for TokenizationOverview.tsx
  totalInvestors?: number; // Added for TokenizationOverview.tsx
  contractTypes: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  allocationData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  investmentPerformance: Array<{
    month: string;
    returns: number;
  }>;
  transactions: Array<{
    id: string;
    date: string;
    type: string;
    amount: number;
    status: string;
  }>;
  userHoldings: number;
  recentTransactions: Array<{
    id: number;
    type: string;
    amount: number;
    date: string;
  }>;
  recentActivities?: Array<{
    id: string;
    description: string;
    type: string;
    tokenAmount: number;
    date: string;
    transactionHash: string;
  }>;
}

export const getMockSensorData = (): SensorData[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    value: faker.number.float({ min: 10, max: 30, fractionDigits: 1 }), // Changed precision to fractionDigits
    unit: faker.helpers.arrayElement(['°C', '%', 'ppm', 'm/s']),
    iconName: faker.helpers.arrayElement(['thermometer', 'droplet', 'wind', 'zap', 'flask-conical', 'waves', 'alert-circle']),
    status: faker.helpers.arrayElement(['normal', 'warning', 'error']),
    minValue: faker.number.float({ min: 0, max: 10, fractionDigits: 1 }), // Changed precision to fractionDigits
    maxValue: faker.number.float({ min: 30, max: 50, fractionDigits: 1 }), // Changed precision to fractionDigits
    lastUpdated: faker.date.recent().toLocaleTimeString(),
    category: faker.helpers.arrayElement(['Temperature', 'Humidity', 'CO2', 'Light', 'Water']), // Added category
  }));
};

export const getMockAlerts = (): Alert[] => {
  return Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['info', 'warning', 'error']),
    title: faker.lorem.sentence(), // Added title
    message: faker.lorem.sentence(),
    timestamp: faker.date.recent().toISOString(), // Changed to ISO format
    isRead: faker.datatype.boolean(),
    category: faker.helpers.arrayElement(['System', 'Environment', 'Security', 'Maintenance']), // Added category
  }));
};

export const getMockHarvests = (): Harvest[] => {
  return Array.from({ length: 6 }, () => {
    const plantedDate = faker.date.past().toISOString();
    const estimatedHarvestDate = faker.date.future().toISOString();
    const status = faker.helpers.arrayElement(['ready', 'growing', 'harvested']);
    
    return {
      id: faker.string.uuid(),
      plantName: faker.helpers.arrayElement(['Lettuce', 'Spinach', 'Kale', 'Basil', 'Tomato']),
      plantType: faker.helpers.arrayElement(['Leafy Green', 'Herb', 'Fruit']),
      plantedDate: plantedDate,
      estimatedHarvestDate: estimatedHarvestDate,
      actualHarvestDate: status === 'harvested' ? faker.date.recent().toISOString() : undefined,
      harvestWeight: status === 'harvested' ? faker.number.float({ min: 0.1, max: 5, fractionDigits: 1 }) : undefined,
      status: status,
      crop: faker.lorem.word(),
      quantity: faker.number.int({ min: 50, max: 200 }),
      unit: 'kg',
      date: faker.date.future().toLocaleDateString(),
      container: faker.helpers.arrayElement(['Container A', 'Container B', 'Container C']),
      images: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.image.url()),
    };
  });
};

export const getMockContainerSalesData = (): ContainerSalesData[] => {
  return Array.from({ length: 3 }, () => {
    const min = faker.number.int({ min: 40000, max: 50000 });
    const max = faker.number.int({ min: 50000, max: 60000 });
    const totalSales = faker.number.int({ min: 500, max: 1500 });
    
    return {
      id: faker.string.uuid(),
      containerName: faker.lorem.word(),
      supermarketClient: {
        name: faker.company.name(),
        location: faker.location.city(),
        imageUrl: faker.image.avatar(),
      },
      priceRange: {
        min,
        max,
      },
      totalSales,
      totalRevenue: totalSales * (min + max) / 2, // Added totalRevenue
      monthlySales: Array.from({ length: 6 }, () => ({
        month: faker.date.month(),
        sales: faker.number.int({ min: 50, max: 250 }),
      })), // Added monthlySales
      recurringCustomers: Array.from({ length: faker.number.int({ min: 10, max: 50 }) }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        imageUrl: faker.image.avatar(),
      })),
    };
  });
};

export const getMockFarmLocations = (): FarmLocation[] => {
  return [
    {
      id: 'location1',
      name: 'Farm A',
      address: 'Jl. Kebon Jeruk No. 27',
      coordinates: { x: 25, y: 30 },
    },
    {
      id: 'location2',
      name: 'Farm B',
      address: 'Jl. Mangga Besar No. 10',
      coordinates: { x: 45, y: 50 },
    },
    {
      id: 'location3',
      name: 'Farm C',
      address: 'Jl. Gajah Mada No. 104',
      coordinates: { x: 70, y: 60 },
    },
  ];
};

export const getMockTokenizationData = (): TokenizationData => {
  return {
    totalValue: 450000000,
    activeContracts: 24,
    averageReturn: 12.5,
    totalTokens: 1000000,
    totalInvestors: 238,
    contractTypes: [
      { name: 'Standard', value: 45, color: '#4CAF50' },
      { name: 'Premium', value: 30, color: '#2E7D32' },
      { name: 'Enterprise', value: 25, color: '#1B5E20' }
    ],
    allocationData: [
      { name: 'Farm Operations', value: 40, color: '#4CAF50' },
      { name: 'Technology', value: 25, color: '#8BC34A' },
      { name: 'Marketing', value: 15, color: '#CDDC39' },
      { name: 'Research', value: 20, color: '#2E7D32' }
    ],
    investmentPerformance: [
      { month: 'Jan', returns: 5.2 },
      { month: 'Feb', returns: 5.8 },
      { month: 'Mar', returns: 6.1 },
      { month: 'Apr', returns: 5.9 },
      { month: 'May', returns: 6.3 },
      { month: 'Jun', returns: 7.0 },
      { month: 'Jul', returns: 7.5 },
      { month: 'Aug', returns: 8.2 },
      { month: 'Sep', returns: 8.6 },
      { month: 'Oct', returns: 9.1 },
      { month: 'Nov', returns: 9.4 },
      { month: 'Dec', returns: 9.8 }
    ],
    transactions: [
      { id: 'tx1', date: '2023-01-15', type: 'Purchase', amount: 250, status: 'completed' },
      { id: 'tx2', date: '2023-02-10', type: 'Dividend', amount: 15, status: 'completed' },
      { id: 'tx3', date: '2023-03-22', type: 'Purchase', amount: 100, status: 'completed' },
      { id: 'tx4', date: '2023-04-05', type: 'Sale', amount: 75, status: 'completed' },
      { id: 'tx5', date: '2023-04-30', type: 'Dividend', amount: 25, status: 'completed' },
      { id: 'tx6', date: '2023-05-14', type: 'Purchase', amount: 300, status: 'pending' }
    ],
    userHoldings: 35,
    recentTransactions: [
      { id: 1, type: 'Purchase', amount: 15, date: '2023-05-10' },
      { id: 2, type: 'Reward', amount: 2.5, date: '2023-05-25' },
      { id: 3, type: 'Purchase', amount: 20, date: '2023-06-05' },
      { id: 4, type: 'Reward', amount: 3.2, date: '2023-06-25' }
    ],
    recentActivities: [
      { 
        id: 'act1',
        description: 'Invested in Container Farm A',
        type: 'invested',
        tokenAmount: 150,
        date: '2023-06-15',
        transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b'
      },
      { 
        id: 'act2',
        description: 'Harvested yield from Container Farm B',
        type: 'harvested',
        tokenAmount: 35,
        date: '2023-06-20',
        transactionHash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1'
      },
      { 
        id: 'act3',
        description: 'Received staking rewards',
        type: 'reward',
        tokenAmount: 12.5,
        date: '2023-06-25',
        transactionHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c'
      }
    ]
  };
};

// Add the missing function for CCTV cameras
export const getMockCameras = (): Camera[] => {
  return Array.from({ length: 4 }, (_, i) => ({
    id: `camera-${i + 1}`,
    name: `Camera ${i + 1}`,
    location: faker.helpers.arrayElement(['Entry', 'Container A', 'Container B', 'Container C', 'Warehouse']),
    isOnline: faker.datatype.boolean(0.8), // 80% chance of being online
    lastSnapshot: faker.image.url()
  }));
};
