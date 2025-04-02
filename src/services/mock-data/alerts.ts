
import { Alert } from './types';

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
