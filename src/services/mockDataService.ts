// Mock data service for demonstration purposes
// In a real application, this would be replaced with actual API calls

import { ReactNode } from "react";

export type SensorStatus = 'normal' | 'warning' | 'error';

export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: SensorStatus;
  minValue: number;
  maxValue: number;
  iconName: string;
  lastUpdated: string;
  category: 'climate' | 'water' | 'nutrient' | 'system';
}

export interface AlertData {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
  isRead: boolean;
  category: string;
}

export interface CameraData {
  id: string;
  name: string;
  location: string;
  isOnline: boolean;
  lastSnapshot: string;
  streamUrl: string;
}

export interface HarvestData {
  id: string;
  plantName: string;
  plantType: string;
  plantedDate: string;
  estimatedHarvestDate: string;
  actualHarvestDate?: string;
  status: 'growing' | 'ready' | 'harvested';
  harvestWeight?: number;
  images: string[];
  container: string;
  notes?: string;
}

export interface ClientData {
  id: string;
  name: string;
  type: 'supermarket' | 'individual';
  location: string;
  imageUrl: string;
}

export interface ContainerSalesData {
  id: string;
  containerName: string;
  supermarketClient: ClientData;
  recurringCustomers: ClientData[];
  priceRange: {
    min: number;
    max: number;
  };
  monthlySales: {
    month: string;
    sales: number;
    revenue: number;
  }[];
  totalSales: number;
  totalRevenue: number;
}

// Generate sensor data
export const getMockSensorData = (): SensorData[] => {
  return [
    {
      id: 'temp-air',
      name: 'Air Temperature',
      value: 24.5,
      unit: '°C',
      status: 'normal',
      minValue: 18,
      maxValue: 30,
      iconName: 'thermometer',
      lastUpdated: new Date().toLocaleTimeString(),
      category: 'climate'
    },
    {
      id: 'temp-water',
      name: 'Water Temperature',
      value: 22.1,
      unit: '°C',
      status: 'normal',
      minValue: 18,
      maxValue: 26,
      iconName: 'droplet',
      lastUpdated: new Date().toLocaleTimeString(),
      category: 'water'
    },
    {
      id: 'humidity',
      name: 'Humidity',
      value: 65,
      unit: '%',
      status: 'normal',
      minValue: 40,
      maxValue: 80,
      iconName: 'droplets',
      lastUpdated: new Date().toLocaleTimeString(),
      category: 'climate'
    },
    {
      id: 'co2',
      name: 'CO2 Level',
      value: 850,
      unit: 'ppm',
      status: 'warning',
      minValue: 400,
      maxValue: 1200,
      iconName: 'wind',
      lastUpdated: new Date().toLocaleTimeString(),
      category: 'climate'
    },
    {
      id: 'tds',
      name: 'TDS',
      value: 780,
      unit: 'ppm',
      status: 'normal',
      minValue: 500,
      maxValue: 1000,
      iconName: 'flask-conical',
      lastUpdated: new Date().toLocaleTimeString(),
      category: 'nutrient'
    },
    {
      id: 'ec',
      name: 'Electrical Conductivity',
      value: 1.8,
      unit: 'mS/cm',
      status: 'normal',
      minValue: 1.0,
      maxValue: 3.0,
      iconName: 'zap',
      lastUpdated: new Date().toLocaleTimeString(),
      category: 'nutrient'
    },
    {
      id: 'water-level',
      name: 'Water Level',
      value: 78,
      unit: '%',
      status: 'normal',
      minValue: 0,
      maxValue: 100,
      iconName: 'waves',
      lastUpdated: new Date().toLocaleTimeString(),
      category: 'water'
    },
    {
      id: 'leakage',
      name: 'Leakage Sensor',
      value: 0,
      unit: 'detections',
      status: 'normal',
      minValue: 0,
      maxValue: 10,
      iconName: 'alert-circle',
      lastUpdated: new Date().toLocaleTimeString(),
      category: 'system'
    }
  ];
};

// Generate alerts data
export const getMockAlerts = (): AlertData[] => {
  return [
    {
      id: '1',
      title: 'High CO2 Level',
      message: 'CO2 levels have exceeded 900ppm in Container 1',
      timestamp: '2023-07-15T08:30:00',
      type: 'warning',
      isRead: false,
      category: 'climate'
    },
    {
      id: '2',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tomorrow at 10:00 AM',
      timestamp: '2023-07-14T12:15:00',
      type: 'info',
      isRead: true,
      category: 'system'
    },
    {
      id: '3',
      title: 'Water Pump Malfunction',
      message: 'Water pump #2 has stopped working in Container 1',
      timestamp: '2023-07-13T23:05:00',
      type: 'error',
      isRead: false,
      category: 'water'
    }
  ];
};

// Generate camera data
export const getMockCameras = (): CameraData[] => {
  return [
    {
      id: 'cam1',
      name: 'Front View',
      location: 'Container Entrance',
      isOnline: true,
      lastSnapshot: 'https://source.unsplash.com/random/300x200/?farm,container',
      streamUrl: '#'
    },
    {
      id: 'cam2',
      name: 'Rear View',
      location: 'Container Back',
      isOnline: true,
      lastSnapshot: 'https://source.unsplash.com/random/300x200/?plants,indoor',
      streamUrl: '#'
    },
    {
      id: 'cam3',
      name: 'Inside Left',
      location: 'Container Inside Left',
      isOnline: true,
      lastSnapshot: 'https://source.unsplash.com/random/300x200/?hydroponics',
      streamUrl: '#'
    },
    {
      id: 'cam4',
      name: 'Inside Right',
      location: 'Container Inside Right',
      isOnline: false,
      lastSnapshot: 'https://source.unsplash.com/random/300x200/?vertical,farming',
      streamUrl: '#'
    }
  ];
};

// Generate harvest data
export const getMockHarvests = (): HarvestData[] => {
  return [
    {
      id: 'h1',
      plantName: 'Lettuce (Romaine)',
      plantType: 'Leafy Green',
      plantedDate: '2023-06-01',
      estimatedHarvestDate: '2023-07-20',
      status: 'ready',
      container: 'Container 1',
      images: [
        'https://source.unsplash.com/random/400x300/?lettuce,romaine',
        'https://source.unsplash.com/random/400x300/?lettuce,harvest'
      ],
      notes: 'Ready for harvest. Excellent growth observed.'
    },
    {
      id: 'h2',
      plantName: 'Spinach',
      plantType: 'Leafy Green',
      plantedDate: '2023-06-15',
      estimatedHarvestDate: '2023-07-25',
      status: 'growing',
      container: 'Container 1',
      images: [
        'https://source.unsplash.com/random/400x300/?spinach,growing'
      ],
      notes: 'Growing well. No issues detected.'
    },
    {
      id: 'h3',
      plantName: 'Kale',
      plantType: 'Leafy Green',
      plantedDate: '2023-05-10',
      estimatedHarvestDate: '2023-07-01',
      actualHarvestDate: '2023-07-03',
      harvestWeight: 12.5,
      status: 'harvested',
      container: 'Container 1',
      images: [
        'https://source.unsplash.com/random/400x300/?kale,harvest',
        'https://source.unsplash.com/random/400x300/?kale,farm'
      ],
      notes: 'Successfully harvested. 12.5kg total weight.'
    },
    {
      id: 'h4',
      plantName: 'Basil',
      plantType: 'Herb',
      plantedDate: '2023-06-20',
      estimatedHarvestDate: '2023-08-05',
      status: 'growing',
      container: 'Container 1',
      images: [
        'https://source.unsplash.com/random/400x300/?basil,growing'
      ],
      notes: 'Growing as expected.'
    }
  ];
};

// Generate mock clients
export const getMockClients = (): ClientData[] => {
  return [
    {
      id: 'c1',
      name: 'SuperFresh Market',
      type: 'supermarket',
      location: 'Jakarta Selatan',
      imageUrl: 'https://source.unsplash.com/random/100x100/?supermarket,store'
    },
    {
      id: 'c2',
      name: 'GreenGrocers',
      type: 'supermarket',
      location: 'Jakarta Pusat',
      imageUrl: 'https://source.unsplash.com/random/100x100/?grocery,shop'
    },
    {
      id: 'c3',
      name: 'Health Basket',
      type: 'supermarket',
      location: 'Bandung',
      imageUrl: 'https://source.unsplash.com/random/100x100/?organic,store'
    },
    {
      id: 'c4',
      name: 'Aditya Wijaya',
      type: 'individual',
      location: 'Jakarta Selatan',
      imageUrl: 'https://source.unsplash.com/random/100x100/?man,profile'
    },
    {
      id: 'c5',
      name: 'Siti Rahayu',
      type: 'individual',
      location: 'Jakarta Timur',
      imageUrl: 'https://source.unsplash.com/random/100x100/?woman,profile'
    },
    {
      id: 'c6',
      name: 'Budi Santoso',
      type: 'individual',
      location: 'Jakarta Barat',
      imageUrl: 'https://source.unsplash.com/random/100x100/?man,indonesian'
    }
  ];
};

// Generate container sales data
export const getMockContainerSalesData = (): ContainerSalesData[] => {
  const clients = getMockClients();
  
  return [
    {
      id: 'sales1',
      containerName: 'AKAR Farm #1',
      supermarketClient: clients[0],
      recurringCustomers: clients.filter(c => c.type === 'individual').slice(0, 20),
      priceRange: {
        min: 40000,
        max: 55000
      },
      monthlySales: [
        { month: 'Jan', sales: 250, revenue: 250 * 47500 },
        { month: 'Feb', sales: 280, revenue: 280 * 48000 },
        { month: 'Mar', sales: 300, revenue: 300 * 50000 },
        { month: 'Apr', sales: 320, revenue: 320 * 51000 },
        { month: 'May', sales: 350, revenue: 350 * 52000 },
        { month: 'Jun', sales: 370, revenue: 370 * 53000 }
      ],
      totalSales: 1870,
      totalRevenue: 94535000
    },
    {
      id: 'sales2',
      containerName: 'AKAR Farm #2',
      supermarketClient: clients[1],
      recurringCustomers: clients.filter(c => c.type === 'individual').slice(0, 20),
      priceRange: {
        min: 45000,
        max: 60000
      },
      monthlySales: [
        { month: 'Jan', sales: 220, revenue: 220 * 52500 },
        { month: 'Feb', sales: 240, revenue: 240 * 53000 },
        { month: 'Mar', sales: 270, revenue: 270 * 54000 },
        { month: 'Apr', sales: 290, revenue: 290 * 55000 },
        { month: 'May', sales: 310, revenue: 310 * 56000 },
        { month: 'Jun', sales: 340, revenue: 340 * 57000 }
      ],
      totalSales: 1670,
      totalRevenue: 89500000
    },
    {
      id: 'sales3',
      containerName: 'AKAR Farm #3',
      supermarketClient: clients[2],
      recurringCustomers: clients.filter(c => c.type === 'individual').slice(0, 20),
      priceRange: {
        min: 50000,
        max: 70000
      },
      monthlySales: [
        { month: 'Jan', sales: 300, revenue: 300 * 60000 },
        { month: 'Feb', sales: 320, revenue: 320 * 62000 },
        { month: 'Mar', sales: 350, revenue: 350 * 63000 },
        { month: 'Apr', sales: 380, revenue: 380 * 65000 },
        { month: 'May', sales: 400, revenue: 400 * 67000 },
        { month: 'Jun', sales: 420, revenue: 420 * 69000 }
      ],
      totalSales: 2170,
      totalRevenue: 134340000
    }
  ];
};
