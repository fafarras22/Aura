
import { getMockHarvests, getMockHarvestData } from './harvests';
import { getMockDashboardStats } from './dashboardStats';
import { getMockTokenizationData } from './tokenization';
import { getMockContainerStatus } from './containerStatus';
import { getMockContainerProjects } from './containerProjects';
import { getMockClimateData } from './climate';
import { getMockSensorData } from './sensors';
import { getMockWaterData } from './water';
import { getMockFarmLocations } from './farmLocations';
import { getMockContainerSalesData } from './containerSales';
import { getMockAlerts } from './alerts';
import { FarmLocation, ContainerSalesData, TokenizationData, Alert } from './types';

// Export all types
export type { FarmLocation, ContainerSalesData, TokenizationData, Alert };

// Export all mock data functions
export {
  getMockHarvests,
  getMockDashboardStats,
  getMockTokenizationData,
  getMockContainerStatus,
  getMockContainerProjects,
  getMockClimateData,
  getMockSensorData,
  getMockWaterData,
  getMockFarmLocations,
  getMockContainerSalesData,
  getMockAlerts,
  getMockHarvestData
};

// Default export for backwards compatibility
export default {
  getMockHarvests,
  getMockDashboardStats,
  getMockTokenizationData,
  getMockContainerStatus,
  getMockContainerProjects,
  getMockClimateData,
  getMockSensorData,
  getMockWaterData,
  getMockFarmLocations,
  getMockContainerSalesData,
  getMockAlerts,
  getMockHarvestData
};
