
import { DashboardStat } from './types';

// Dashboard stats
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
