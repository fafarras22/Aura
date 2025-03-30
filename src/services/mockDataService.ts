
import { faker } from '@faker-js/faker';

// Sensor data interfaces and functions
export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  category: 'climate' | 'water' | 'energy' | 'environment';
  status: 'normal' | 'warning' | 'error';
  iconName: string;
  lastUpdated: string;
  minValue: number;
  maxValue: number;
}

export function getMockSensorData(): SensorData[] {
  // Create the specific sensors with appropriate data
  return [
    {
      id: '1',
      name: 'Outside Temperature',
      value: faker.number.int({ min: 24, max: 35 }),
      unit: '°C',
      category: 'climate',
      status: faker.helpers.arrayElement(['normal', 'warning', 'normal', 'normal']),
      iconName: 'thermometer',
      lastUpdated: faker.date.recent().toLocaleTimeString(),
      minValue: 20,
      maxValue: 40
    },
    {
      id: '2',
      name: 'Inside Temperature',
      value: faker.number.int({ min: 20, max: 28 }),
      unit: '°C',
      category: 'climate',
      status: faker.helpers.arrayElement(['normal', 'normal', 'warning', 'normal']),
      iconName: 'thermometer',
      lastUpdated: faker.date.recent().toLocaleTimeString(),
      minValue: 18,
      maxValue: 30
    },
    {
      id: '3',
      name: 'TDS (Total Dissolved Solids)',
      value: faker.number.int({ min: 500, max: 1500 }),
      unit: 'ppm',
      category: 'water',
      status: faker.helpers.arrayElement(['normal', 'warning', 'error', 'normal']),
      iconName: 'flask-conical',
      lastUpdated: faker.date.recent().toLocaleTimeString(),
      minValue: 400,
      maxValue: 1800
    },
    {
      id: '4',
      name: 'Humidity',
      value: faker.number.int({ min: 50, max: 90 }),
      unit: '%',
      category: 'climate',
      status: faker.helpers.arrayElement(['normal', 'warning', 'normal', 'normal']),
      iconName: 'droplet',
      lastUpdated: faker.date.recent().toLocaleTimeString(),
      minValue: 40,
      maxValue: 95
    },
    {
      id: '5',
      name: 'CO2',
      value: faker.number.int({ min: 400, max: 1200 }),
      unit: 'ppm',
      category: 'environment',
      status: faker.helpers.arrayElement(['normal', 'normal', 'normal', 'warning']),
      iconName: 'wind',
      lastUpdated: faker.date.recent().toLocaleTimeString(),
      minValue: 350,
      maxValue: 1500
    },
    {
      id: '6',
      name: 'Dissolved Oxygen (DO)',
      value: faker.number.float({ min: 5, max: 12, fractionDigits: 1 }),
      unit: 'mg/L',
      category: 'water',
      status: faker.helpers.arrayElement(['normal', 'warning', 'normal', 'normal']),
      iconName: 'droplet',
      lastUpdated: faker.date.recent().toLocaleTimeString(),
      minValue: 4,
      maxValue: 14
    },
    {
      id: '7',
      name: 'Plant Nutrients (NPK)',
      value: faker.number.int({ min: 80, max: 100 }),
      unit: '%',
      category: 'environment',
      status: faker.helpers.arrayElement(['normal', 'normal', 'warning', 'normal']),
      iconName: 'flask-conical',
      lastUpdated: faker.date.recent().toLocaleTimeString(),
      minValue: 75,
      maxValue: 100
    },
    {
      id: '8',
      name: 'Electrical Conductivity',
      value: faker.number.float({ min: 1.0, max: 3.0, fractionDigits: 1 }),
      unit: 'mS/cm',
      category: 'water',
      status: faker.helpers.arrayElement(['normal', 'normal', 'warning', 'error']),
      iconName: 'zap',
      lastUpdated: faker.date.recent().toLocaleTimeString(),
      minValue: 0.5,
      maxValue: 4.0
    },
    {
      id: '9',
      name: 'Water Level',
      value: faker.number.int({ min: 60, max: 100 }),
      unit: '%',
      category: 'water',
      status: faker.helpers.arrayElement(['normal', 'warning', 'normal', 'normal']),
      iconName: 'waves',
      lastUpdated: faker.date.recent().toLocaleTimeString(),
      minValue: 50,
      maxValue: 100
    }
  ];
}

// Alert interfaces and functions
export interface Alert {
  id: number;
  type: string;
  message: string;
  time: string;
  status: 'active' | 'resolved';
  isRead: boolean;
  title: string;
  category: string;
  timestamp: string;
}

export function getMockAlerts(): Alert[] {
  return [
    {
      id: 1,
      type: 'Temperature',
      title: 'High Temperature',
      message: 'Temperature too high',
      time: '2 minutes ago',
      status: 'active',
      isRead: false,
      category: 'warning',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'Water Level',
      title: 'Low Water Level',
      message: 'Water level too low',
      time: '15 minutes ago',
      status: 'active',
      isRead: false,
      category: 'error',
      timestamp: new Date().toISOString()
    },
    {
      id: 3,
      type: 'Nutrients',
      title: 'Nutrient Deficiency',
      message: 'Nutrient levels critical',
      time: '30 minutes ago',
      status: 'resolved',
      isRead: true,
      category: 'error',
      timestamp: new Date().toISOString()
    },
    {
      id: 4,
      type: 'CO2',
      title: 'High CO2 Levels',
      message: 'CO2 levels too high',
      time: '1 hour ago',
      status: 'resolved',
      isRead: true,
      category: 'warning',
      timestamp: new Date().toISOString()
    }
  ];
}

// Tokenization interfaces and functions
export interface TokenizationData {
  totalTokens: number;
  circulatingSupply: number;
  tokenPrice: number;
  averageReturn: number;
  marketCap: number;
  userHoldings: number;
  totalInvestors: number;
  totalValue: number;
  activeContracts: number;
  recentTransactions: Array<{
    id: number;
    type: string;
    amount: number;
    date: string;
  }>;
  recentActivities?: Array<{
    id: number;
    type: string;
    description: string;
    tokenAmount: number;
    date: string;
    transactionHash?: string;
  }>;
  investments: Array<{
    id: number;
    name: string;
    roi: number;
    amount: number;
    status: string;
  }>;
  allocationData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function getMockTokenizationData(): TokenizationData {
  return {
    totalTokens: 1000000,
    circulatingSupply: 750000,
    tokenPrice: 20, // in MATIC
    averageReturn: 12.5,
    marketCap: 750000 * 20,
    userHoldings: faker.number.int({ min: 5, max: 100 }),
    totalInvestors: faker.number.int({ min: 2000, max: 3000 }),
    totalValue: 15000000,
    activeContracts: 5,
    recentTransactions: [
      {
        id: 1,
        type: 'Purchase',
        amount: 10,
        date: '2023-05-15'
      },
      {
        id: 2,
        type: 'Reward',
        amount: 1.5,
        date: '2023-06-01'
      },
      {
        id: 3,
        type: 'Purchase',
        amount: 5,
        date: '2023-06-15'
      }
    ],
    recentActivities: [
      {
        id: 1,
        type: 'invested',
        description: 'New investment in Farm A',
        tokenAmount: 50,
        date: '2 days ago',
        transactionHash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
      },
      {
        id: 2,
        type: 'harvested',
        description: 'Harvest rewards distributed',
        tokenAmount: 15,
        date: '1 week ago',
        transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b'
      },
      {
        id: 3,
        type: 'transfer',
        description: 'Tokens transferred to wallet',
        tokenAmount: 25,
        date: '2 weeks ago',
        transactionHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b'
      }
    ],
    investments: [
      {
        id: 1,
        name: 'Container Farm A',
        roi: 12.5,
        amount: 50,
        status: 'active'
      },
      {
        id: 2,
        name: 'Container Farm B',
        roi: 10.2,
        amount: 25,
        status: 'pending'
      },
      {
        id: 3,
        name: 'Expansion Project',
        roi: 15.0,
        amount: 30,
        status: 'active'
      }
    ],
    allocationData: [
      { name: 'Operations', value: 30, color: '#4CAF50' },
      { name: 'Research', value: 15, color: '#2196F3' },
      { name: 'Marketing', value: 10, color: '#FF9800' },
      { name: 'Development', value: 25, color: '#9C27B0' },
      { name: 'Reserve', value: 20, color: '#607D8B' }
    ]
  };
}

// Harvest interfaces and functions
export interface Harvest {
  id: number;
  crop: string;
  status: 'ready' | 'in progress' | 'completed';
  quantity: number;
  unit: string;
  date: string;
}

export function getMockHarvests(): Harvest[] {
  return [
    {
      id: 1,
      crop: 'Lettuce',
      status: 'ready',
      quantity: 50,
      unit: 'kg',
      date: '2023-06-15'
    },
    {
      id: 2,
      crop: 'Spinach',
      status: 'in progress',
      quantity: 30,
      unit: 'kg',
      date: '2023-06-22'
    },
    {
      id: 3,
      crop: 'Kale',
      status: 'completed',
      quantity: 45,
      unit: 'kg',
      date: '2023-06-01'
    },
    {
      id: 4,
      crop: 'Basil',
      status: 'ready',
      quantity: 20,
      unit: 'kg',
      date: '2023-06-10'
    },
    {
      id: 5,
      crop: 'Tomatoes',
      status: 'in progress',
      quantity: 100,
      unit: 'kg',
      date: '2023-06-30'
    },
    {
      id: 6,
      crop: 'Cucumbers',
      status: 'completed',
      quantity: 80,
      unit: 'kg',
      date: '2023-05-25'
    }
  ];
}

// Camera interfaces and functions
export interface Camera {
  id: number;
  name: string;
  location: string;
  status: string;
  lastMotion: string;
  lastSnapshot?: string;
  lastUpdated?: string;
}

export function getMockCameras(): Camera[] {
  return [
    {
      id: 1,
      name: 'Front Container',
      location: 'External - Front Entrance',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString(),
      lastSnapshot: faker.date.recent().toISOString(),
      lastUpdated: faker.date.recent().toISOString()
    },
    {
      id: 2,
      name: 'Rear Container',
      location: 'External - Rear Access',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString(),
      lastSnapshot: faker.date.recent().toISOString(),
      lastUpdated: faker.date.recent().toISOString()
    },
    {
      id: 3,
      name: 'Growing Area A',
      location: 'Internal - Section A',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString(),
      lastSnapshot: faker.date.recent().toISOString(),
      lastUpdated: faker.date.recent().toISOString()
    },
    {
      id: 4,
      name: 'Growing Area B',
      location: 'Internal - Section B',
      status: 'offline',
      lastMotion: '-',
      lastSnapshot: null,
      lastUpdated: faker.date.recent().toISOString()
    },
    {
      id: 5,
      name: 'Water System',
      location: 'Internal - Utility Room',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString(),
      lastSnapshot: faker.date.recent().toISOString(),
      lastUpdated: faker.date.recent().toISOString()
    },
    {
      id: 6,
      name: 'Control Room',
      location: 'Internal - Front Section',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString(),
      lastSnapshot: faker.date.recent().toISOString(),
      lastUpdated: faker.date.recent().toISOString()
    }
  ];
}

// Farm location interfaces and functions
export interface FarmLocation {
  id: number;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'active' | 'maintenance' | 'offline';
  crops: string[];
  capacity: number;
  utilization: number;
  lastHarvest: string;
  nextHarvest: string;
}

export function getMockFarmLocations(): FarmLocation[] {
  return [
    {
      id: 1,
      name: 'Jakarta Hub',
      location: 'Jakarta, Indonesia',
      coordinates: { lat: -6.2088, lng: 106.8456 },
      status: 'active',
      crops: ['Lettuce', 'Kale', 'Basil'],
      capacity: 100,
      utilization: 85,
      lastHarvest: '2023-06-01',
      nextHarvest: '2023-06-15'
    },
    {
      id: 2,
      name: 'Bali Eco-Center',
      location: 'Denpasar, Bali',
      coordinates: { lat: -8.6705, lng: 115.2126 },
      status: 'active',
      crops: ['Spinach', 'Tomatoes', 'Herbs'],
      capacity: 75,
      utilization: 90,
      lastHarvest: '2023-06-05',
      nextHarvest: '2023-06-20'
    },
    {
      id: 3,
      name: 'Bandung Mountain Farm',
      location: 'Bandung, West Java',
      coordinates: { lat: -6.9175, lng: 107.6191 },
      status: 'maintenance',
      crops: ['Strawberries', 'Lettuce', 'Kale'],
      capacity: 50,
      utilization: 60,
      lastHarvest: '2023-05-25',
      nextHarvest: '2023-06-10'
    },
    {
      id: 4,
      name: 'Surabaya Port',
      location: 'Surabaya, East Java',
      coordinates: { lat: -7.2575, lng: 112.7521 },
      status: 'active',
      crops: ['Lettuce', 'Herbs', 'Cucumbers'],
      capacity: 100,
      utilization: 95,
      lastHarvest: '2023-06-03',
      nextHarvest: '2023-06-18'
    },
    {
      id: 5,
      name: 'Makassar Coastal',
      location: 'Makassar, South Sulawesi',
      coordinates: { lat: -5.1477, lng: 119.4327 },
      status: 'active',
      crops: ['Lettuce', 'Spinach', 'Herbs'],
      capacity: 75,
      utilization: 80,
      lastHarvest: '2023-06-04',
      nextHarvest: '2023-06-19'
    }
  ];
}

// Container sales data interfaces and functions
export interface Customer {
  id: number;
  name: string;
  imageUrl?: string;
  purchaseFrequency: 'weekly' | 'biweekly' | 'monthly';
  totalSpent: number;
}

export interface SupermarketClient {
  id: number;
  name: string;
  location: string;
  imageUrl?: string;
  contractStartDate: string;
  contractEndDate: string;
}

export interface ContainerSalesData {
  id: number;
  containerName: string;
  supermarketClient: SupermarketClient;
  priceRange: {
    min: number;
    max: number;
  };
  totalSales: number;
  totalRevenue: number;
  monthlySales: number[];
  recurringCustomers: Customer[];
}

export function getMockContainerSalesData(): ContainerSalesData[] {
  return [
    {
      id: 1,
      containerName: 'Jakarta Premium Greens',
      supermarketClient: {
        id: 101,
        name: 'FreshMart Supermarket',
        location: 'Central Jakarta',
        imageUrl: null,
        contractStartDate: '2023-01-15',
        contractEndDate: '2024-01-14'
      },
      priceRange: {
        min: 50000,
        max: 65000
      },
      totalSales: 450,
      totalRevenue: 25000000,
      monthlySales: [320, 350, 380, 410, 430, 450],
      recurringCustomers: [
        {
          id: 1001,
          name: 'Restaurant A',
          imageUrl: null,
          purchaseFrequency: 'weekly',
          totalSpent: 5000000
        },
        {
          id: 1002,
          name: 'Restaurant B',
          imageUrl: null,
          purchaseFrequency: 'biweekly',
          totalSpent: 3500000
        },
        {
          id: 1003,
          name: 'Hotel A',
          imageUrl: null,
          purchaseFrequency: 'weekly',
          totalSpent: 4800000
        },
        {
          id: 1004,
          name: 'Catering Service',
          imageUrl: null,
          purchaseFrequency: 'weekly',
          totalSpent: 4200000
        },
        {
          id: 1005,
          name: 'Health Food Store',
          imageUrl: null,
          purchaseFrequency: 'biweekly',
          totalSpent: 2800000
        },
        {
          id: 1006,
          name: 'Local Market Vendor',
          imageUrl: null,
          purchaseFrequency: 'weekly',
          totalSpent: 3100000
        }
      ]
    },
    {
      id: 2,
      containerName: 'Bandung Fresh Produce',
      supermarketClient: {
        id: 102,
        name: 'GreenGrocer',
        location: 'Bandung City Center',
        imageUrl: null,
        contractStartDate: '2023-02-01',
        contractEndDate: '2024-01-31'
      },
      priceRange: {
        min: 45000,
        max: 60000
      },
      totalSales: 380,
      totalRevenue: 20000000,
      monthlySales: [280, 300, 330, 350, 370, 380],
      recurringCustomers: [
        {
          id: 2001,
          name: 'Restaurant C',
          imageUrl: null,
          purchaseFrequency: 'weekly',
          totalSpent: 4200000
        },
        {
          id: 2002,
          name: 'Restaurant D',
          imageUrl: null,
          purchaseFrequency: 'monthly',
          totalSpent: 1500000
        },
        {
          id: 2003,
          name: 'School Cafeteria',
          imageUrl: null,
          purchaseFrequency: 'weekly',
          totalSpent: 3800000
        },
        {
          id: 2004,
          name: 'Juice Bar Chain',
          imageUrl: null,
          purchaseFrequency: 'biweekly',
          totalSpent: 2500000
        }
      ]
    }
  ];
}
