
import { faker } from '@faker-js/faker';
import { ClimateReading, WaterReading, SensorData } from './types';

// Generate mock climate data
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
      status: 'error',
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
