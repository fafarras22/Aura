
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
}

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
      temperature: faker.number.float({ min: 20, max: 30, precision: 0.1 }),
      humidity: faker.number.float({ min: 40, max: 80, precision: 0.1 }),
      co2: faker.number.float({ min: 350, max: 1000, precision: 1 }),
      light: faker.number.float({ min: 0, max: 1000, precision: 1 }),
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
      ph: faker.number.float({ min: 5.5, max: 7.5, precision: 0.1 }),
      ec: faker.number.float({ min: 1.0, max: 3.0, precision: 0.01 }),
      tds: faker.number.float({ min: 500, max: 1500, precision: 1 }),
      do: faker.number.float({ min: 4, max: 8, precision: 0.1 }),
      level: faker.number.float({ min: 60, max: 100, precision: 0.1 }),
      temperature: faker.number.float({ min: 18, max: 25, precision: 0.1 }),
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
      preview: "/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png"
    },
    {
      id: "cam2",
      name: "Container Farm Interior",
      location: "Jakarta Central Farm",
      status: "online",
      lastMotion: new Date(Date.now() - 1000 * 60 * 45),
      preview: "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png"
    },
    {
      id: "cam3",
      name: "Storage Area",
      location: "Jakarta Central Farm",
      status: "offline",
      lastMotion: new Date(Date.now() - 1000 * 60 * 120),
      preview: "/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png"
    },
    {
      id: "cam4",
      name: "External Surroundings",
      location: "Jakarta Central Farm",
      status: "online",
      lastMotion: new Date(Date.now() - 1000 * 60 * 10),
      preview: "/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png"
    }
  ];
};

// Generate data for container sales
export const getMockContainerSalesData = (): ContainerSalesData[] => {
  return [
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
