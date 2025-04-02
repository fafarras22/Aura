
import { ContainerData } from './types';

// Mock data for containers when database is not available
export const mockContainers: ContainerData[] = [
  {
    id: 'container-1',
    name: 'Jakarta Farm Container',
    location: 'Jakarta, Indonesia',
    status: 'active',
    sensors: {
      temperature: 25.3,
      humidity: 64,
      co2: 415,
      ph: 6.2
    },
    currentCapacity: 85,
    maxCapacity: 100,
    lastHarvest: '2023-10-15',
    nextHarvest: '2023-11-05',
    owner: 'PT Akar Indonesia',
    client: 'Superindo Market'
  },
  {
    id: 'container-2',
    name: 'Bandung Farm Container',
    location: 'Bandung, Indonesia',
    status: 'maintenance',
    sensors: {
      temperature: 24.8,
      humidity: 60,
      co2: 430,
      ph: 6.5
    },
    currentCapacity: 65,
    maxCapacity: 90,
    lastHarvest: '2023-10-10',
    nextHarvest: '2023-11-10',
    owner: 'PT Akar Indonesia',
    client: 'Hypermart'
  },
  {
    id: 'container-3',
    name: 'Surabaya Farm Container',
    location: 'Surabaya, Indonesia',
    status: 'active',
    sensors: {
      temperature: 26.1,
      humidity: 62,
      co2: 420,
      ph: 6.3
    },
    currentCapacity: 90,
    maxCapacity: 100,
    lastHarvest: '2023-10-20',
    nextHarvest: '2023-11-15',
    owner: 'PT Akar Indonesia',
    client: 'LotteMart'
  }
];
