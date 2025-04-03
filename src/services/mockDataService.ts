import { format } from 'date-fns';

// Farm location type
export interface FarmLocation {
  id: string;
  name: string;
  status: 'active' | 'maintenance' | 'offline';
  location: { lat: number; lng: number };
  containers: number;
  address: string;
}

// Container sales data type
export interface ContainerSalesData {
  id: string;
  containerName: string;
  totalSales: number;
  totalRevenue: number;
  supermarketClient: {
    name: string;
    imageUrl: string;
    location: string;
    contractValue: number;
  };
  monthlySales: { month: string; sales: number }[];
  recurringCustomers: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  month: string;
  amount: number;
}

// Tokenization data type
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
  tokenChangeType: 'increase' | 'decrease';
  tokenHolders: any[];
  investments: any[];
  recentTransactions: any[];
  tokenAllocation: any[];
  investmentPerformance: any[];
  contractDuration: number;
}

// Water data type
export interface WaterData {
  ph: number;
  ec: number;
  tds: number;
  do: number;
  temperature: number;
  level: number;
  flowRate: number;
  lastUpdated: string;
  history: {
    time: string;
    ph: number;
    ec: number;
    tds: number;
    do: number;
    level: number;
    temperature: number;
  }[];
  status: 'normal' | 'warning' | 'critical';
}

// Climate data type
export interface ClimateData {
  temperature: number;
  humidity: number;
  co2Level: number;
  light: number;
  airflow: number;
  lastUpdated: string;
  history: {
    time: string;
    temperature: number;
    humidity: number;
    co2Level: number;
    light: number;
    airflow: number;
  }[];
  status: 'normal' | 'warning' | 'critical';
}

// Get mock water data
export function getMockWaterData(days: number = 7) {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const date = new Date(now);
    date.setHours(now.getHours() - i);
    
    // Generate data with some variation
    const baseTemp = 23 + Math.sin(i / 12) * 2;
    const basePh = 6.2 + Math.sin(i / 8) * 0.3;
    
    data.push({
      timestamp: date.toISOString(),
      ph: parseFloat(basePh.toFixed(1)),
      ec: parseFloat((1.8 + Math.sin(i / 10) * 0.2).toFixed(1)),
      tds: Math.round(680 + Math.sin(i / 10) * 50),
      do: parseFloat((6.5 + Math.sin(i / 12) * 0.5).toFixed(1)),
      temperature: parseFloat(baseTemp.toFixed(1)),
      level: Math.round(85 + Math.sin(i / 14) * 10),
    });
  }
  
  return data.reverse();
}

// Get mock sensor data
export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  category: 'environmental' | 'water' | 'climate';
  status: string;
  lastUpdated: string;
}

export function getMockSensorData(): SensorData[] {
  return [
    {
      id: 'sensor-1',
      name: 'Temperature',
      value: 25.3,
      unit: '°C',
      category: 'environmental',
      status: 'normal',
      lastUpdated: format(new Date(), 'MMM dd, yyyy HH:mm')
    },
    {
      id: 'sensor-2',
      name: 'Humidity',
      value: 64,
      unit: '%',
      category: 'environmental',
      status: 'normal',
      lastUpdated: format(new Date(), 'MMM dd, yyyy HH:mm')
    },
    {
      id: 'sensor-3',
      name: 'CO2 Level',
      value: 415,
      unit: 'ppm',
      category: 'environmental',
      status: 'normal',
      lastUpdated: format(new Date(), 'MMM dd, yyyy HH:mm')
    },
    {
      id: 'sensor-4',
      name: 'Water pH',
      value: 6.2,
      unit: 'pH',
      category: 'water',
      status: 'warning',
      lastUpdated: format(new Date(), 'MMM dd, yyyy HH:mm')
    },
    {
      id: 'sensor-5',
      name: 'Nutrient Level',
      value: 78,
      unit: '%',
      category: 'water',
      status: 'normal',
      lastUpdated: format(new Date(), 'MMM dd, yyyy HH:mm')
    },
    {
      id: 'sensor-6',
      name: 'Water Temperature',
      value: 23.5,
      unit: '°C',
      category: 'water',
      status: 'normal',
      lastUpdated: format(new Date(), 'MMM dd, yyyy HH:mm')
    },
    {
      id: 'sensor-7',
      name: 'Dissolved Oxygen',
      value: 6.5,
      unit: 'mg/L',
      category: 'water',
      status: 'normal',
      lastUpdated: format(new Date(), 'MMM dd, yyyy HH:mm')
    },
    {
      id: 'sensor-8',
      name: 'Light Intensity',
      value: 12500,
      unit: 'lux',
      category: 'climate',
      status: 'normal',
      lastUpdated: format(new Date(), 'MMM dd, yyyy HH:mm')
    }
  ];
}

export const useDashboardData = () => {
  return {
    criticalAlertsCount: 3,
    upcomingHarvestsCount: 8,
    containerCount: 3,
    salesData: {
      id: "sales-1",
      containerName: "Jakarta Farm Container",
      totalSales: 3250,
      totalRevenue: 220000000,
      supermarketClient: {
        name: "Superindo Market",
        imageUrl: "",
        location: "Jakarta",
        contractValue: 180000000
      },
      monthlySales: [
        { month: "Jan", sales: 320 },
        { month: "Feb", sales: 350 },
        { month: "Mar", sales: 380 },
        { month: "Apr", sales: 410 },
        { month: "May", sales: 450 },
        { month: "Jun", sales: 540 }
      ],
      recurringCustomers: [
        { id: "cust-1", name: "Customer 1", imageUrl: "" },
        { id: "cust-2", name: "Customer 2", imageUrl: "" },
        { id: "cust-3", name: "Customer 3", imageUrl: "" }
      ],
      month: "Current",
      amount: 220000000
    },
    tokenData: {
      totalValue: 325000000,
      totalTokens: 32500,
      activeContracts: 7,
      totalInvestors: 42,
      averageReturn: 14.5,
      recentActivities: [
        {
          id: "token-act-1",
          type: "invested",
          description: "New investment",
          tokenAmount: 1200,
          date: format(new Date(), "dd MMM yyyy"),
          transactionHash: "0x1234567890abcdef"
        },
        {
          id: "token-act-2",
          type: "harvested",
          description: "Harvest yield distributed",
          tokenAmount: 600,
          date: format(new Date(), "dd MMM yyyy"),
          transactionHash: "0x0987654321fedcba"
        }
      ],
      tokenBalance: 12000,
      tokenPrice: 10000,
      tokenChange: 3.5,
      tokenChangeType: "increase",
      tokenHolders: [],
      investments: [],
      recentTransactions: [],
      tokenAllocation: [],
      investmentPerformance: [],
      contractDuration: 12
    },
    waterData: {
      ph: 6.2,
      ec: 1.8,
      tds: 680,
      do: 6.5,
      temperature: 23.5,
      level: 85,
      flowRate: 12.3,
      lastUpdated: format(new Date(), "dd MMM yyyy HH:mm"),
      history: [
        { time: "08:00", ph: 6.1, ec: 1.7, tds: 670, do: 6.3, level: 82, temperature: 22.8 },
        { time: "10:00", ph: 6.2, ec: 1.8, tds: 680, do: 6.5, level: 85, temperature: 23.5 },
        { time: "12:00", ph: 6.2, ec: 1.8, tds: 685, do: 6.6, level: 87, temperature: 24.1 },
        { time: "14:00", ph: 6.3, ec: 1.9, tds: 690, do: 6.4, level: 88, temperature: 24.5 },
        { time: "16:00", ph: 6.2, ec: 1.8, tds: 680, do: 6.2, level: 85, temperature: 24.0 },
      ],
      status: "normal"
    },
    climateData: {
      temperature: 25.3,
      humidity: 64,
      co2Level: 415,
      light: 12500,
      airflow: 2.3,
      lastUpdated: format(new Date(), "dd MMM yyyy HH:mm"),
      history: [
        { time: "08:00", temperature: 24.5, humidity: 62, co2Level: 410, light: 11000, airflow: 2.1 },
        { time: "10:00", temperature: 25.3, humidity: 64, co2Level: 415, light: 12500, airflow: 2.3 },
        { time: "12:00", temperature: 26.1, humidity: 66, co2Level: 420, light: 14000, airflow: 2.4 },
        { time: "14:00", temperature: 26.5, humidity: 65, co2Level: 425, light: 13500, airflow: 2.5 },
        { time: "16:00", temperature: 25.8, humidity: 63, co2Level: 417, light: 12000, airflow: 2.3 },
      ],
      status: "normal"
    },
    farmLocations: [
      {
        id: "loc-1",
        name: "Jakarta Farm",
        status: "active",
        location: { lat: 106.8456, lng: -6.2088 },
        containers: 5,
        address: "Jl. Sudirman 123, Jakarta"
      },
      {
        id: "loc-2",
        name: "Bandung Farm",
        status: "maintenance",
        location: { lat: 107.6191, lng: -6.9175 },
        containers: 3,
        address: "Jl. Asia Afrika 45, Bandung"
      },
      {
        id: "loc-3",
        name: "Surabaya Farm",
        status: "active",
        location: { lat: 112.7378, lng: -7.2575 },
        containers: 4,
        address: "Jl. Pemuda 88, Surabaya"
      }
    ]
  };
};
