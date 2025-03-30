
import { faker } from '@faker-js/faker';

// Define interfaces for type safety
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
  category: 'climate' | 'water' | 'energy' | 'environment';
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  isRead: boolean;
  title: string;
  category: string;
}

export interface Harvest {
  id: string;
  crop: string;
  quantity: number;
  unit: string;
  date: string;
  status: 'ready' | 'in progress' | 'completed';
  plantName: string;
  plantType: string;
  plantedDate: string;
  estimatedHarvestDate: string;
  actualHarvestDate: string;
  harvestWeight: number;
  container: string;
  images: string[];
}

export interface ContainerSalesData {
  id: string;
  containerName: string;
  supermarketClient: {
    name: string;
    location: string;
    imageUrl?: string;
  };
  priceRange: {
    min: number;
    max: number;
  };
  totalSales: number;
  totalRevenue: number;
  monthlySales: number[];
  recurringCustomers: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
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

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSnapshot: string;
  lastUpdated: string;
}

export interface TokenizationData {
  totalValue: number;
  activeContracts: number;
  averageReturn: number;
  contractTypes: {
    name: string;
    value: number;
    color: string;
  }[];
  allocationData: {
    name: string;
    value: number;
    color: string;
  }[];
  investmentPerformance: {
    month: string;
    returns: number;
  }[];
  transactions: {
    id: string;
    date: string;
    type: string;
    amount: number;
    status: string;
  }[];
  userHoldings: number;
  recentTransactions: {
    id: number;
    type: string;
    amount: number;
    date: string;
  }[];
  totalTokens: number;
  totalInvestors: number;
  recentActivities: {
    id: string;
    date: string;
    description: string;
    tokenAmount: number;
    type: 'invested' | 'harvested' | 'distributed';
    transactionHash?: string;
  }[];
}

export const getMockSensorData = (): SensorData[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    value: faker.number.float({ min: 10, max: 30, fractionDigits: 1 }),
    unit: faker.helpers.arrayElement(['°C', '%', 'ppm', 'm/s']),
    iconName: faker.helpers.arrayElement([
      'thermometer', 
      'droplet', 
      'wind', 
      'zap', 
      'flask-conical', 
      'waves', 
      'alert-circle'
    ]),
    status: faker.helpers.arrayElement(['normal', 'warning', 'error']),
    minValue: faker.number.float({ min: 0, max: 10, fractionDigits: 1 }),
    maxValue: faker.number.float({ min: 30, max: 50, fractionDigits: 1 }),
    lastUpdated: faker.date.recent().toLocaleTimeString(),
    category: faker.helpers.arrayElement(['climate', 'water', 'energy', 'environment'])
  }));
};

export const getMockAlerts = (): Alert[] => {
  return Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['info', 'warning', 'error']),
    message: faker.lorem.sentence(),
    timestamp: faker.date.recent().toLocaleString(),
    isRead: faker.datatype.boolean(),
    title: faker.lorem.words(3),
    category: faker.helpers.arrayElement(['System', 'Environment', 'Security'])
  }));
};

export const getMockHarvests = (): Harvest[] => {
  return Array.from({ length: 6 }, () => ({
    id: faker.string.uuid(),
    crop: faker.lorem.word(),
    quantity: faker.number.int({ min: 50, max: 200 }),
    unit: 'kg',
    date: faker.date.future().toLocaleDateString(),
    status: faker.helpers.arrayElement(['ready', 'in progress', 'completed']),
    plantName: faker.lorem.word(),
    plantType: faker.lorem.word(),
    plantedDate: faker.date.past().toLocaleDateString(),
    estimatedHarvestDate: faker.date.future().toLocaleDateString(),
    actualHarvestDate: faker.date.future().toLocaleDateString(),
    harvestWeight: faker.number.float({ min: 20, max: 100, fractionDigits: 1 }),
    container: faker.lorem.word(),
    images: [faker.image.url(), faker.image.url()]
  }));
};

export const getMockContainerSalesData = (): ContainerSalesData[] => {
  return Array.from({ length: 3 }, () => ({
    id: faker.string.uuid(),
    containerName: faker.lorem.word(),
    supermarketClient: {
      name: faker.company.name(),
      location: faker.address.city(),
      imageUrl: faker.image.url()
    },
    priceRange: {
      min: faker.number.int({ min: 40000, max: 50000 }),
      max: faker.number.int({ min: 50000, max: 60000 })
    },
    totalSales: faker.number.int({ min: 500, max: 1500 }),
    totalRevenue: faker.number.int({ min: 20000000, max: 50000000 }),
    monthlySales: Array.from({ length: 12 }, () => faker.number.int({ min: 50, max: 150 })),
    recurringCustomers: Array.from({ 
      length: faker.number.int({ min: 10, max: 50 })
    }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      imageUrl: faker.image.avatar()
    }))
  }));
};

export const getMockFarmLocations = (): FarmLocation[] => {
  return [
    {
      id: 'location1',
      name: 'Farm A',
      address: 'Jl. Kebon Jeruk No. 27',
      coordinates: { x: 25, y: 30 }
    },
    {
      id: 'location2',
      name: 'Farm B',
      address: 'Jl. Mangga Besar No. 10',
      coordinates: { x: 45, y: 50 }
    },
    {
      id: 'location3',
      name: 'Farm C',
      address: 'Jl. Gajah Mada No. 104',
      coordinates: { x: 70, y: 60 }
    }
  ];
};

export const getMockCameras = (): Camera[] => {
  return Array.from({ length: 6 }, () => ({
    id: faker.string.uuid(),
    name: `Camera ${faker.lorem.word()}`,
    location: faker.location.streetAddress(),
    status: faker.helpers.arrayElement(['online', 'offline', 'maintenance']),
    lastSnapshot: faker.image.url(),
    lastUpdated: faker.date.recent().toLocaleString()
  }));
};

export const getMockTokenizationData = (): TokenizationData => {
  const recentActivities = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    date: faker.date.recent().toLocaleDateString(),
    description: faker.helpers.arrayElement([
      'New investment in Container A',
      'Harvest profits distributed',
      'Tokens staked for farm expansion',
      'Community pool contribution',
      'Performance reward claimed'
    ]),
    tokenAmount: faker.number.float({ min: 10, max: 500, fractionDigits: 1 }),
    type: faker.helpers.arrayElement(['invested', 'harvested', 'distributed']),
    transactionHash: `0x${faker.string.hexadecimal({ length: 40 })}`
  }));

  return {
    totalValue: 450000000,
    activeContracts: 24,
    averageReturn: 12.5,
    totalTokens: 1000000,
    totalInvestors: 2500,
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
    recentActivities
  };
};
