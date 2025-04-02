
import { ContainerStatus } from './types';

// Generate status data for containers
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
