
import { getMockHarvests, getMockHarvestData } from './harvests';
import { getMockDashboardStats } from './dashboardStats';
import { getMockTokenizationData } from './tokenization';
import { getMockContainerStatus } from './containerStatus';
import { getMockContainerProjects } from './containerProjects';

// Export all mock data functions
export {
  getMockHarvests,
  getMockDashboardStats,
  getMockTokenizationData,
  getMockContainerStatus,
  getMockContainerProjects,
  getMockHarvestData
};

// Default export for backwards compatibility
export default {
  getMockHarvests,
  getMockDashboardStats,
  getMockTokenizationData,
  getMockContainerStatus,
  getMockContainerProjects,
  getMockHarvestData
};
