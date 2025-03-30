import { faker } from '@faker-js/faker';

interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  category: 'climate' | 'water' | 'energy' | 'environment';
  status: 'normal' | 'warning' | 'error';
  iconName: string;
  lastUpdated: string;
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
      lastUpdated: faker.date.recent().toLocaleTimeString()
    },
    {
      id: '2',
      name: 'Inside Temperature',
      value: faker.number.int({ min: 20, max: 28 }),
      unit: '°C',
      category: 'climate',
      status: faker.helpers.arrayElement(['normal', 'normal', 'warning', 'normal']),
      iconName: 'thermometer',
      lastUpdated: faker.date.recent().toLocaleTimeString()
    },
    {
      id: '3',
      name: 'TDS (Total Dissolved Solids)',
      value: faker.number.int({ min: 500, max: 1500 }),
      unit: 'ppm',
      category: 'water',
      status: faker.helpers.arrayElement(['normal', 'warning', 'error', 'normal']),
      iconName: 'flask-conical',
      lastUpdated: faker.date.recent().toLocaleTimeString()
    },
    {
      id: '4',
      name: 'Humidity',
      value: faker.number.int({ min: 50, max: 90 }),
      unit: '%',
      category: 'climate',
      status: faker.helpers.arrayElement(['normal', 'warning', 'normal', 'normal']),
      iconName: 'droplet',
      lastUpdated: faker.date.recent().toLocaleTimeString()
    },
    {
      id: '5',
      name: 'CO2',
      value: faker.number.int({ min: 400, max: 1200 }),
      unit: 'ppm',
      category: 'environment',
      status: faker.helpers.arrayElement(['normal', 'normal', 'normal', 'warning']),
      iconName: 'wind',
      lastUpdated: faker.date.recent().toLocaleTimeString()
    },
    {
      id: '6',
      name: 'Dissolved Oxygen (DO)',
      value: faker.number.float({ min: 5, max: 12, precision: 0.1 }),
      unit: 'mg/L',
      category: 'water',
      status: faker.helpers.arrayElement(['normal', 'warning', 'normal', 'normal']),
      iconName: 'droplet',
      lastUpdated: faker.date.recent().toLocaleTimeString()
    },
    {
      id: '7',
      name: 'Plant Nutrients (NPK)',
      value: faker.number.int({ min: 80, max: 100 }),
      unit: '%',
      category: 'environment',
      status: faker.helpers.arrayElement(['normal', 'normal', 'warning', 'normal']),
      iconName: 'flask-conical',
      lastUpdated: faker.date.recent().toLocaleTimeString()
    },
    {
      id: '8',
      name: 'Electrical Conductivity',
      value: faker.number.float({ min: 1.0, max: 3.0, precision: 0.1 }),
      unit: 'mS/cm',
      category: 'water',
      status: faker.helpers.arrayElement(['normal', 'normal', 'warning', 'error']),
      iconName: 'zap',
      lastUpdated: faker.date.recent().toLocaleTimeString()
    },
    {
      id: '9',
      name: 'Water Level',
      value: faker.number.int({ min: 60, max: 100 }),
      unit: '%',
      category: 'water',
      status: faker.helpers.arrayElement(['normal', 'warning', 'normal', 'normal']),
      iconName: 'waves',
      lastUpdated: faker.date.recent().toLocaleTimeString()
    }
  ];
}

interface Alert {
  id: number;
  type: string;
  message: string;
  time: string;
  status: 'active' | 'resolved';
}

export function getMockAlerts(): Alert[] {
  return [
    {
      id: 1,
      type: 'Temperature',
      message: 'Temperature too high',
      time: '2 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'Water Level',
      message: 'Water level too low',
      time: '15 minutes ago',
      status: 'active'
    },
    {
      id: 3,
      type: 'Nutrients',
      message: 'Nutrient levels critical',
      time: '30 minutes ago',
      status: 'resolved'
    },
    {
      id: 4,
      type: 'CO2',
      message: 'CO2 levels too high',
      time: '1 hour ago',
      status: 'resolved'
    }
  ];
}

interface TokenizationData {
  totalTokens: number;
  circulatingSupply: number;
  tokenPrice: number;
  averageReturn: number;
  marketCap: number;
  userHoldings: number;
  totalInvestors: number;
  recentTransactions: Array<{
    id: number;
    type: string;
    amount: number;
    date: string;
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

interface Harvest {
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

// Add function to get mock cameras
export function getMockCameras() {
  return [
    {
      id: 1,
      name: 'Front Container',
      location: 'External - Front Entrance',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString()
    },
    {
      id: 2,
      name: 'Rear Container',
      location: 'External - Rear Access',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString()
    },
    {
      id: 3,
      name: 'Growing Area A',
      location: 'Internal - Section A',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString()
    },
    {
      id: 4,
      name: 'Growing Area B',
      location: 'Internal - Section B',
      status: 'offline',
      lastMotion: '-'
    },
    {
      id: 5,
      name: 'Water System',
      location: 'Internal - Utility Room',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString()
    },
    {
      id: 6,
      name: 'Control Room',
      location: 'Internal - Front Section',
      status: 'online',
      lastMotion: faker.date.recent().toLocaleTimeString()
    }
  ];
}
