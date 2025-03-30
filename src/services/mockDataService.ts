
import { faker } from '@faker-js/faker';

// Farm location interface
export interface FarmLocation {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: 'active' | 'inactive' | 'maintenance';
  containers: number;
  address: string;
}

// Data for container farms
export const getMockFarmLocations = (): FarmLocation[] => {
  return [
    {
      id: '1',
      name: 'Jakarta Central Farm',
      location: { lat: -6.2088, lng: 106.8456 },
      status: 'active',
      containers: 8,
      address: 'Jl. Sudirman No. 123, Jakarta'
    },
    {
      id: '2',
      name: 'Bali Eco Center',
      location: { lat: -8.3405, lng: 115.0920 },
      status: 'active',
      containers: 5,
      address: 'Jl. Sunset Road 45, Kuta, Bali'
    },
    {
      id: '3',
      name: 'Surabaya Hub',
      location: { lat: -7.2575, lng: 112.7521 },
      status: 'maintenance',
      containers: 6,
      address: 'Jl. Pemuda 102, Surabaya'
    },
    {
      id: '4',
      name: 'Medan Center',
      location: { lat: 3.5952, lng: 98.6722 },
      status: 'active',
      containers: 4,
      address: 'Jl. Gatot Subroto 78, Medan'
    },
    {
      id: '5',
      name: 'Makassar Facility',
      location: { lat: -5.1477, lng: 119.4327 },
      status: 'inactive',
      containers: 3,
      address: 'Jl. Pettarani 55, Makassar'
    },
    {
      id: '6',
      name: 'Bandung Research Center',
      location: { lat: -6.9175, lng: 107.6191 },
      status: 'active',
      containers: 7,
      address: 'Jl. Asia Afrika 133, Bandung'
    },
    {
      id: '7',
      name: 'Yogyakarta Innovation Hub',
      location: { lat: -7.8014, lng: 110.3644 },
      status: 'active',
      containers: 4,
      address: 'Jl. Malioboro 42, Yogyakarta'
    }
  ];
};

// Container sales data 
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

// Interface for Container Status
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

// Interface for CCTV Camera
export interface CCTVCamera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  lastMotion: Date;
  preview: string;
  imageUrl: string; // Add the missing property
  lastRecording: Date; // Add the missing property
}

// Alias type for Camera for backward compatibility
export type Camera = CCTVCamera;

// Climate sensor reading
export interface ClimateReading {
  id: string;
  timestamp: Date;
  temperature: number;
  humidity: number;
  co2: number;
  light: number;
}

// Water sensor reading
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

// Generate mock sensor data
export const getMockClimateData = (days = 7): ClimateReading[] => {
  const data: ClimateReading[] = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const timestamp = new Date(now);
    timestamp.setHours(now.getHours() - i);
    
    data.push({
      id: faker.string.uuid(),
      timestamp,
      temperature: faker.number.float({ min: 20, max: 30, fractionDigits: 1 }),
      humidity: faker.number.float({ min: 40, max: 80, fractionDigits: 1 }),
      co2: faker.number.float({ min: 350, max: 1000, fractionDigits: 0 }),
      light: faker.number.float({ min: 0, max: 1000, fractionDigits: 0 }),
    });
  }
  
  return data;
};

// Generate mock water data
export const getMockWaterData = (days = 7): WaterReading[] => {
  const data: WaterReading[] = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const timestamp = new Date(now);
    timestamp.setHours(now.getHours() - i);
    
    data.push({
      id: faker.string.uuid(),
      timestamp,
      ph: faker.number.float({ min: 5.5, max: 7.5, fractionDigits: 1 }),
      ec: faker.number.float({ min: 1.0, max: 3.0, fractionDigits: 2 }),
      tds: faker.number.float({ min: 500, max: 1500, fractionDigits: 0 }),
      do: faker.number.float({ min: 4, max: 8, fractionDigits: 1 }),
      level: faker.number.float({ min: 60, max: 100, fractionDigits: 1 }),
      temperature: faker.number.float({ min: 18, max: 25, fractionDigits: 1 }),
    });
  }
  
  return data;
};

// Generate mock CCTV cameras
export const getMockCCTVCameras = (): CCTVCamera[] => {
  return [
    {
      id: "cam1",
      name: "Main Entrance",
      location: "Jakarta Central Farm",
      status: "online",
      lastMotion: new Date(Date.now() - 1000 * 60 * 15),
      preview: "/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png",
      imageUrl: "/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png", // Added
      lastRecording: new Date(Date.now() - 1000 * 60 * 30) // Added
    },
    {
      id: "cam2",
      name: "Container Farm Interior",
      location: "Jakarta Central Farm",
      status: "online",
      lastMotion: new Date(Date.now() - 1000 * 60 * 45),
      preview: "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png",
      imageUrl: "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png", // Added
      lastRecording: new Date(Date.now() - 1000 * 60 * 60) // Added
    },
    {
      id: "cam3",
      name: "Storage Area",
      location: "Jakarta Central Farm",
      status: "offline",
      lastMotion: new Date(Date.now() - 1000 * 60 * 120),
      preview: "/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png",
      imageUrl: "/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png", // Added
      lastRecording: new Date(Date.now() - 1000 * 60 * 180) // Added
    },
    {
      id: "cam4",
      name: "External Surroundings",
      location: "Jakarta Central Farm",
      status: "online",
      lastMotion: new Date(Date.now() - 1000 * 60 * 10),
      preview: "/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png",
      imageUrl: "/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png", // Added
      lastRecording: new Date(Date.now() - 1000 * 60 * 20) // Added
    }
  ];
};

// Alias function for backward compatibility
export const getMockCameras = getMockCCTVCameras;

// Generate data for container sales
export const getMockContainerSalesData = (): ContainerSalesData[] => {
  const mockContainerSales: ContainerSalesData[] = [
    { month: 'Jan', amount: 2400 },
    { month: 'Feb', amount: 1398 },
    { month: 'Mar', amount: 9800 },
    { month: 'Apr', amount: 3908 },
    { month: 'May', amount: 4800 },
    { month: 'Jun', amount: 3800 },
    { month: 'Jul', amount: 4300 },
    { month: 'Aug', amount: 5300 },
    { month: 'Sep', amount: 4800 },
    { month: 'Oct', amount: 6800 },
    { month: 'Nov', amount: 7300 },
    { month: 'Dec', amount: 9400 }
  ];

  // Add extended container sales data for the dashboard
  const extendedSalesData: ContainerSalesData[] = [
    {
      id: 'sales1',
      containerName: 'Jakarta Central Farm - Container A',
      month: 'Current',
      amount: 8500,
      supermarketClient: {
        name: 'Farm Fresh Supermarket',
        location: 'Jakarta Central',
        contractValue: 250000000,
        imageUrl: '/lovable-uploads/farm-fresh-logo.png'
      },
      priceRange: {
        min: 45000,
        max: 60000
      },
      totalSales: 450,
      totalRevenue: 22500000,
      monthlySales: [
        { month: 'Jan', sales: 320 },
        { month: 'Feb', sales: 380 },
        { month: 'Mar', sales: 420 },
        { month: 'Apr', sales: 450 }
      ],
      recurringCustomers: [
        { id: 'c1', name: 'Hotel Indonesia Kempinski', purchaseFrequency: 'Weekly', imageUrl: '/lovable-uploads/kempinski-logo.png' },
        { id: 'c2', name: 'Grand Hyatt Jakarta', purchaseFrequency: 'Bi-weekly', imageUrl: '/lovable-uploads/hyatt-logo.png' },
        { id: 'c3', name: 'Warung Tekko', purchaseFrequency: 'Daily', imageUrl: '/lovable-uploads/warung-tekko-logo.png' },
        { id: 'c4', name: 'MRT Central Kitchen', purchaseFrequency: 'Weekly', imageUrl: '/lovable-uploads/mrt-logo.png' }
      ]
    }
  ];

  return [...mockContainerSales, ...extendedSalesData];
};

// Fix for CCTV.tsx by updating the cameras type
export const getMockCCTVCameraById = (id: string): CCTVCamera | undefined => {
  return getMockCCTVCameras().find(camera => camera.id === id);
};

// Dashboard stats
export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
}

export const getMockDashboardStats = (): DashboardStat[] => {
  return [
    {
      id: '1',
      title: 'Active Containers',
      value: 24,
      change: 8.1,
      changeType: 'increase',
      icon: 'box'
    },
    {
      id: '2',
      title: 'Crop Yield (kg)',
      value: '1,245',
      change: 12.5,
      changeType: 'increase',
      icon: 'sprout'
    },
    {
      id: '3',
      title: 'Water Usage (L)',
      value: '3,427',
      change: 3.2,
      changeType: 'decrease',
      icon: 'droplet'
    },
    {
      id: '4',
      title: 'Sensors Active',
      value: 156,
      change: 5.4,
      changeType: 'increase',
      icon: 'activity'
    }
  ];
};

// Status for container
export const getMockContainerStatus = (): ContainerStatus[] => {
  return [
    {
      id: '1',
      name: 'Container 001',
      status: 'active',
      currentTemp: 24.5,
      targetTemp: 25.0,
      humidity: 68,
      waterLevel: 87,
      lastHarvest: '2 days ago',
      nextMaintenance: 'In 5 days',
      harvestPerformance: 92
    },
    {
      id: '2',
      name: 'Container 002',
      status: 'maintenance',
      currentTemp: 22.3,
      targetTemp: 25.0,
      humidity: 55,
      waterLevel: 45,
      lastHarvest: '1 week ago',
      nextMaintenance: 'In progress',
      harvestPerformance: 68
    },
    {
      id: '3',
      name: 'Container 003',
      status: 'active',
      currentTemp: 25.2,
      targetTemp: 25.0,
      humidity: 72,
      waterLevel: 92,
      lastHarvest: '4 days ago',
      nextMaintenance: 'In 10 days',
      harvestPerformance: 95
    },
    {
      id: '4',
      name: 'Container 004',
      status: 'inactive',
      currentTemp: 21.0,
      targetTemp: 25.0,
      humidity: 40,
      waterLevel: 10,
      lastHarvest: '3 weeks ago',
      nextMaintenance: 'Scheduled for next week',
      harvestPerformance: 0
    }
  ];
};

// Sensor data interface
export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'error'; // Changed critical to error for consistency
  iconName: string;
  lastUpdated: string;
  minValue: number;
  maxValue: number;
  category?: string; // Added category field
}

// Type alias for backward compatibility
export type SensorStatus = 'normal' | 'warning' | 'error';

// Mock sensor data
export const getMockSensorData = (): SensorData[] => {
  return [
    {
      id: 's1',
      name: 'Temperature',
      value: 27.4,
      unit: '°C',
      status: 'warning',
      iconName: 'thermometer',
      lastUpdated: '2 minutes ago',
      minValue: 20,
      maxValue: 30,
      category: 'climate'
    },
    {
      id: 's2',
      name: 'Humidity',
      value: 68,
      unit: '%',
      status: 'normal',
      iconName: 'droplets',
      lastUpdated: '5 minutes ago',
      minValue: 40,
      maxValue: 80,
      category: 'climate'
    },
    {
      id: 's3',
      name: 'CO2 Level',
      value: 950,
      unit: 'ppm',
      status: 'warning',
      iconName: 'wind',
      lastUpdated: '3 minutes ago',
      minValue: 400,
      maxValue: 1200,
      category: 'climate'
    },
    {
      id: 's4',
      name: 'Light Intensity',
      value: 520,
      unit: 'lux',
      status: 'normal',
      iconName: 'zap',
      lastUpdated: '1 minute ago',
      minValue: 300,
      maxValue: 800,
      category: 'climate'
    },
    {
      id: 's5',
      name: 'Water pH',
      value: 5.8,
      unit: 'pH',
      status: 'normal',
      iconName: 'flask-conical',
      lastUpdated: '7 minutes ago',
      minValue: 5.5,
      maxValue: 6.5,
      category: 'water'
    },
    {
      id: 's6',
      name: 'Nutrient Level',
      value: 680,
      unit: 'ppm',
      status: 'normal',
      iconName: 'droplet',
      lastUpdated: '10 minutes ago',
      minValue: 500,
      maxValue: 1000,
      category: 'water'
    },
    {
      id: 's7',
      name: 'Water Temperature',
      value: 22.8,
      unit: '°C',
      status: 'normal',
      iconName: 'thermometer',
      lastUpdated: '5 minutes ago',
      minValue: 18,
      maxValue: 24,
      category: 'water'
    },
    {
      id: 's8',
      name: 'Dissolved Oxygen',
      value: 5.2,
      unit: 'mg/L',
      status: 'error', // Changed from critical to error
      iconName: 'waves',
      lastUpdated: '2 minutes ago',
      minValue: 6,
      maxValue: 8.5,
      category: 'water'
    },
    {
      id: 's9',
      name: 'Energy Consumption',
      value: 1.2,
      unit: 'kWh',
      status: 'normal',
      iconName: 'zap',
      lastUpdated: '1 minute ago',
      minValue: 0.8,
      maxValue: 2.0,
      category: 'energy'
    },
    {
      id: 's10',
      name: 'Power Output',
      value: 2.4,
      unit: 'kW',
      status: 'normal',
      iconName: 'zap',
      lastUpdated: '3 minutes ago',
      minValue: 1.5,
      maxValue: 3.0,
      category: 'energy'
    },
    {
      id: 's11',
      name: 'Air Quality',
      value: 85,
      unit: 'AQI',
      status: 'normal',
      iconName: 'wind',
      lastUpdated: '6 minutes ago',
      minValue: 0,
      maxValue: 100,
      category: 'environment'
    },
    {
      id: 's12',
      name: 'Soil Moisture',
      value: 42,
      unit: '%',
      status: 'warning',
      iconName: 'droplet',
      lastUpdated: '4 minutes ago',
      minValue: 30,
      maxValue: 60,
      category: 'environment'
    }
  ];
};

// Alert interface
export interface Alert {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error';
  containerNumber: string;
  isRead: boolean;
}

// Mock alerts
export const getMockAlerts = (): Alert[] => {
  return [
    {
      id: 'a1',
      title: 'Temperature Threshold Exceeded',
      message: 'Container 001 temperature has exceeded 28°C. Check cooling systems immediately.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: 'error',
      containerNumber: '001',
      isRead: false
    },
    {
      id: 'a2',
      title: 'Low Water Level',
      message: 'Container 002 water level is at 15%. Refill required within 8 hours.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      type: 'warning',
      containerNumber: '002',
      isRead: false
    },
    {
      id: 'a3',
      title: 'CO2 Level Warning',
      message: 'Container 001 CO2 levels have been above 900ppm for 3 hours.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      type: 'warning',
      containerNumber: '001',
      isRead: true
    },
    {
      id: 'a4',
      title: 'System Update Completed',
      message: 'Automatic system update completed for all container management systems.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      type: 'info',
      containerNumber: 'ALL',
      isRead: true
    },
    {
      id: 'a5',
      title: 'pH Level Critical',
      message: 'Container 003 pH level has dropped to 4.9, below safe threshold. Adjust nutrient mix immediately.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      type: 'error',
      containerNumber: '003',
      isRead: false
    }
  ];
};

// Harvest interface
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

// Mock harvests
export const getMockHarvests = (): Harvest[] => {
  const now = new Date();
  
  return [
    {
      id: 'h1',
      cropName: 'Baby Spinach',
      crop: 'Baby Spinach', // For backward compatibility
      containerNumber: '001',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 20), // 20 days ago
      harvestDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
      status: 'growing',
      estimatedYield: 45,
      notes: 'Growth looks excellent, ahead of schedule',
      quantity: 45, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: '2 days from now' // For backward compatibility
    },
    {
      id: 'h2',
      cropName: 'Kale',
      crop: 'Kale', // For backward compatibility
      containerNumber: '002',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 28), // 28 days ago
      harvestDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1), // Yesterday
      status: 'ready',
      estimatedYield: 38,
      notes: 'Ready for harvest, quality looks outstanding',
      quantity: 38, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: 'Yesterday' // For backward compatibility
    },
    {
      id: 'h3',
      cropName: 'Arugula',
      crop: 'Arugula', // For backward compatibility
      containerNumber: '003',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 35), // 35 days ago
      harvestDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      status: 'harvested',
      estimatedYield: 40,
      actualYield: 42,
      notes: 'Yield exceeded expectations, excellent quality',
      quantity: 40, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: '5 days ago' // For backward compatibility
    },
    {
      id: 'h4',
      cropName: 'Basil',
      crop: 'Basil', // For backward compatibility
      containerNumber: '001',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
      harvestDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 10), // 10 days from now
      status: 'growing',
      estimatedYield: 30,
      notes: 'Growth slightly slower than expected, adjusted nutrients',
      quantity: 30, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: '10 days from now' // For backward compatibility
    },
    {
      id: 'h5',
      cropName: 'Lettuce - Butterhead',
      crop: 'Lettuce - Butterhead', // For backward compatibility
      containerNumber: '002',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 25), // 25 days ago
      harvestDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 0), // Today
      status: 'ready',
      estimatedYield: 50,
      notes: 'Perfect timing, harvest teams notified',
      quantity: 50, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: 'Today' // For backward compatibility
    }
  ];
};

// Tokenization Data interface
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
  // Added properties for compatibility
  totalTokens?: number;
  totalInvestors?: number;
  contractDuration?: number; // Added this property
  recentActivities?: {
    id: string;
    type: 'invested' | 'harvested' | 'other';
    description: string;
    tokenAmount: number;
    date: string;
    transactionHash?: string;
  }[];
  // Add the missing properties needed by TokenOverview
  tokenAllocation: {
    name: string;
    value: number;
  }[];
  investmentPerformance: {
    month: string;
    value: number;
  }[];
}

// Mock tokenization data
export const getMockTokenizationData = (): TokenizationData => {
  return {
    totalValue: 8750000000, // In IDR
    activeContracts: 125,
    averageReturn: 12.5,
    tokenBalance: 5000,
    tokenPrice: 15000, // IDR per token
    tokenChange: 3.2,
    tokenChangeType: 'increase',
    contractDuration: 12, // Added property
    recentTransactions: [
      {
        id: 't1',
        type: 'buy',
        amount: 250,
        value: 3750000,
        date: '2023-11-10',
        status: 'completed'
      },
      {
        id: 't2',
        type: 'sell',
        amount: 100,
        value: 1500000,
        date: '2023-11-09',
        status: 'completed'
      },
      {
        id: 't3',
        type: 'transfer',
        amount: 50,
        value: 750000,
        date: '2023-11-08',
        status: 'completed'
      },
      {
        id: 't4',
        type: 'buy',
        amount: 500,
        value: 7500000,
        date: '2023-11-07',
        status: 'completed'
      },
      {
        id: 't5',
        type: 'buy',
        amount: 1000,
        value: 15000000,
        date: '2023-11-05',
        status: 'completed'
      }
    ],
    tokenHolders: [
      { category: 'Institutional Investors', percentage: 45 },
      { category: 'Retail Investors', percentage: 30 },
      { category: 'Team & Advisors', percentage: 15 },
      { category: 'Community Rewards', percentage: 10 }
    ],
    investments: [
      {
        id: 'i1',
        name: 'Jakarta Central Farm Expansion',
        tokens: 2000,
        value: 30000000,
        returnRate: 14.5,
        startDate: '2023-06-01',
        endDate: '2024-06-01',
        status: 'active'
      },
      {
        id: 'i2',
        name: 'Bali Eco Center Containers',
        tokens: 1500,
        value: 22500000,
        returnRate: 12.0,
        startDate: '2023-08-15',
        endDate: '2024-08-15',
        status: 'active'
      },
      {
        id: 'i3',
        name: 'Surabaya Technology Upgrade',
        tokens: 1000,
        value: 15000000,
        returnRate: 10.5,
        startDate: '2023-09-01',
        endDate: '2024-03-01',
        status: 'active'
      },
      {
        id: 'i4',
        name: 'Yogyakarta Research Initiative',
        tokens: 500,
        value: 7500000,
        returnRate: 11.0,
        startDate: '2023-07-01',
        endDate: '2023-10-01',
        status: 'completed'
      }
    ],
    // Adding missing properties
    totalTokens: 7,
    totalInvestors: 350,
    recentActivities: [
      {
        id: 'a1',
        type: 'invested',
        description: 'New investment in Jakarta Central Farm',
        tokenAmount: 500,
        date: '2023-11-12',
        transactionHash: '0x1a2b3c4d5e6f7g8h9i0j'
      },
      {
        id: 'a2',
        type: 'harvested',
        description: 'Harvest yield distributed as tokens',
        tokenAmount: 250,
        date: '2023-11-10'
      },
      {
        id: 'a3',
        type: 'other',
        description: 'Community rewards distributed',
        tokenAmount: 100,
        date: '2023-11-05',
        transactionHash: '0xabcdef1234567890'
      }
    ],
    tokenAllocation: [
      { name: 'Operations', value: 30 },
      { name: 'Expansion', value: 25 },
      { name: 'Investor Returns', value: 20 },
      { name: 'Technology', value: 15 },
      { name: 'Community', value: 10 }
    ],
    investmentPerformance: [
      { month: 'Jan', value: 8.2 },
      { month: 'Feb', value: 7.8 },
      { month: 'Mar', value: 9.3 },
      { month: 'Apr', value: 10.1 },
      { month: 'May', value: 11.2 },
      { month: 'Jun', value: 12.0 },
      { month: 'Jul', value: 11.5 },
      { month: 'Aug', value: 12.3 },
      { month: 'Sep', value: 13.1 },
      { month: 'Oct', value: 12.8 },
      { month: 'Nov', value: 12.5 },
      { month: 'Dec', value: 13.2 }
    ]
  };
};
