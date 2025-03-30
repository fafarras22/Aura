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
}

export const getMockSensorData = (): SensorData[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    value: faker.number.float({ min: 10, max: 30, precision: 0.1 }),
    unit: faker.helpers.arrayElement(['°C', '%', 'ppm', 'm/s']),
    iconName: faker.helpers.arrayElement(['thermometer', 'droplet', 'wind', 'zap', 'flask-conical', 'waves', 'alert-circle']),
    status: faker.helpers.arrayElement(['normal', 'warning', 'error']),
    minValue: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
    maxValue: faker.number.float({ min: 30, max: 50, precision: 0.1 }),
    lastUpdated: faker.date.recent().toLocaleTimeString(),
  }));
};

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const getMockAlerts = (): Alert[] => {
  return Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['info', 'warning', 'error']),
    message: faker.lorem.sentence(),
    timestamp: faker.date.recent().toLocaleString(),
    isRead: faker.datatype.boolean(),
  }));
};

export interface Harvest {
  id: string;
  crop: string;
  quantity: number;
  unit: string;
  date: string;
  status: 'ready' | 'in progress' | 'completed';
}

export const getMockHarvests = (): Harvest[] => {
  return Array.from({ length: 6 }, () => ({
    id: faker.string.uuid(),
    crop: faker.lorem.word(),
    quantity: faker.number.int({ min: 50, max: 200 }),
    unit: 'kg',
    date: faker.date.future().toLocaleDateString(),
    status: faker.helpers.arrayElement(['ready', 'in progress', 'completed']),
  }));
};

export interface ContainerSalesData {
  id: string;
  containerName: string;
  supermarketClient: {
    name: string;
    location: string;
  };
  priceRange: {
    min: number;
    max: number;
  };
  totalSales: number;
  recurringCustomers: Array<{
    id: string;
    name: string;
  }>;
}

export const getMockContainerSalesData = (): ContainerSalesData[] => {
  return Array.from({ length: 3 }, () => ({
    id: faker.string.uuid(),
    containerName: faker.lorem.word(),
    supermarketClient: {
      name: faker.company.name(),
      location: faker.address.city(),
    },
    priceRange: {
      min: faker.number.int({ min: 40000, max: 50000 }),
      max: faker.number.int({ min: 50000, max: 60000 }),
    },
    totalSales: faker.number.int({ min: 500, max: 1500 }),
    recurringCustomers: Array.from({ length: faker.number.int({ min: 10, max: 50 }) }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    })),
  }));
};

export interface FarmLocation {
  id: string;
  name: string;
  address: string;
  coordinates: {
    x: number;
    y: number;
  };
}

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

// Add user holdings to tokenization data
export interface TokenizationData {
  totalValue: number;
  activeContracts: number;
  averageReturn: number;
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
}

export const getMockTokenizationData = (): TokenizationData => {
  return {
    totalValue: 450000000,
    activeContracts: 24,
    averageReturn: 12.5,
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
    ]
  };
};
