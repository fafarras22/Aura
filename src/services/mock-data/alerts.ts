
import { Alert } from './types';

export const getMockAlerts = (): Alert[] => {
  return [
    {
      id: "alert-1",
      title: "High Temperature Warning",
      message: "Container JKT-001 temperature exceeds 30°C",
      type: "warning",
      containerNumber: "JKT-001",
      isRead: false,
      timestamp: new Date().toISOString()
    },
    {
      id: "alert-2",
      title: "Low Water Level",
      message: "Container BDG-003 water level below 20%",
      type: "error",
      containerNumber: "BDG-003",
      isRead: false,
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: "alert-3",
      title: "Nutrient Level Optimal",
      message: "Container SBY-002 nutrient levels normalized",
      type: "info",
      containerNumber: "SBY-002",
      isRead: true,
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "alert-4",
      title: "Power Fluctuation",
      message: "Container JKT-001 experiencing power fluctuations",
      type: "warning",
      containerNumber: "JKT-001",
      isRead: false,
      timestamp: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: "alert-5",
      title: "CO2 Level High",
      message: "Container SBY-002 CO2 level above normal",
      type: "warning",
      containerNumber: "SBY-002",
      isRead: true,
      timestamp: new Date(Date.now() - 259200000).toISOString()
    }
  ];
};
