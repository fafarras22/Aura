import { useState, useEffect } from 'react';
import { useDBSetup } from "@/lib/db-setup";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { getMockClimateData } from "@/services/mock-data";
import { getMockWaterData } from "@/services/mock-data/water";

export interface ProjectDashboardData {
  id: string;
  name: string;
  sensors: {
    temperature: number;
    humidity: number;
    co2Level: number;
    ph: number;
    ec: number;
    tds: number;
    waterLevel: number;
    lightLevel: number;
  };
  climate: {
    temperature: number;
    humidity: number;
    co2Level: number;
    light: number;
    airflow: number;
    lastUpdated: string;
    status: 'normal' | 'warning' | 'error';
  };
  water: {
    ph: number;
    ec: number;
    tds: number;
    do: number;
    temperature: number;
    level: number;
    flowRate: number;
    lastUpdated: string;
    status: 'normal' | 'warning' | 'error';
  };
  location: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    status: 'active' | 'maintenance' | 'offline';
  };
  lastHarvest: string | null;
  nextHarvest: string | null;
  cropType: string;
  alerts: Array<{
    id: string;
    type: 'info' | 'warning' | 'error';
    message: string;
    timestamp: string;
  }>;
}

export const useProjectDashboard = (projectId?: string) => {
  const [projectData, setProjectData] = useState<ProjectDashboardData | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectDashboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { initializeDB } = useDBSetup();

  useEffect(() => {
    const loadProjectData = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch this data from a database
        // For now, generate mock data for all container projects
        const mockContainers = getMockContainerProjects();
        const mockClimateData = getMockClimateData();
        const mockWaterData = getMockWaterData(7);
        
        // Create dashboard data for each project
        const dashboardData: ProjectDashboardData[] = mockContainers.map((container, index) => {
          // Use different climate and water data for each project
          const climateIndex = index % mockClimateData.length;
          const waterIndex = index % mockWaterData.length;
          
          // Generate random dates for harvests
          const now = new Date();
          const lastHarvestDate = new Date(now);
          lastHarvestDate.setDate(lastHarvestDate.getDate() - (15 + index * 2));
          
          const nextHarvestDate = new Date(now);
          nextHarvestDate.setDate(nextHarvestDate.getDate() + (12 + index));
          
          // Generate random alerts
          const alertTypes = ['info', 'warning', 'error'] as const;
          const alertMessages = [
            'Nutrient level slightly low',
            'Temperature fluctuation detected',
            'pH level out of optimal range',
            'Water level warning',
            'Humidity out of optimal range',
            'Light intensity warning'
          ];
          
          const alerts = Array(Math.floor(Math.random() * 3) + 1).fill(null).map((_, i) => {
            const alertDate = new Date(now);
            alertDate.setHours(alertDate.getHours() - (i * 4 + index));
            
            return {
              id: `alert-${container.id}-${i}`,
              type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
              message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
              timestamp: alertDate.toISOString()
            };
          });
          
          // Create the project dashboard data object
          return {
            id: container.id,
            name: container.name,
            sensors: {
              temperature: mockClimateData[climateIndex].temperature,
              humidity: mockClimateData[climateIndex].humidity,
              co2Level: mockClimateData[climateIndex].co2,
              ph: mockWaterData[waterIndex].ph,
              ec: mockWaterData[waterIndex].ec,
              tds: mockWaterData[waterIndex].tds,
              waterLevel: mockWaterData[waterIndex].level,
              lightLevel: mockClimateData[climateIndex].light
            },
            climate: {
              temperature: mockClimateData[climateIndex].temperature,
              humidity: mockClimateData[climateIndex].humidity,
              co2Level: mockClimateData[climateIndex].co2,
              light: mockClimateData[climateIndex].light,
              airflow: 2.3 + (index * 0.1),
              lastUpdated: new Date().toISOString(),
              status: ['normal', 'normal', 'warning'][Math.floor(Math.random() * 3)] as 'normal' | 'warning' | 'error'
            },
            water: {
              ph: mockWaterData[waterIndex].ph,
              ec: mockWaterData[waterIndex].ec,
              tds: mockWaterData[waterIndex].tds,
              do: mockWaterData[waterIndex].do,
              temperature: mockWaterData[waterIndex].temperature,
              level: mockWaterData[waterIndex].level,
              flowRate: 12.3 + (index * 0.2),
              lastUpdated: new Date().toISOString(),
              status: ['normal', 'normal', 'warning'][Math.floor(Math.random() * 3)] as 'normal' | 'warning' | 'error'
            },
            location: {
              name: ['Jakarta Farm', 'Bandung Farm', 'Surabaya Farm'][index % 3],
              address: ['Jl. Sudirman 123, Jakarta', 'Jl. Asia Afrika 45, Bandung', 'Jl. Pemuda 88, Surabaya'][index % 3],
              lat: 106.8456 + (index * 0.01),
              lng: -6.2088 + (index * 0.01),
              status: ['active', 'active', 'maintenance'][Math.floor(Math.random() * 3)] as 'active' | 'maintenance' | 'offline'
            },
            lastHarvest: lastHarvestDate.toISOString(),
            nextHarvest: nextHarvestDate.toISOString(),
            cropType: ['Lettuce', 'Kale', 'Spinach', 'Herbs', 'Microgreens', 'Strawberry'][index % 6],
            alerts
          };
        });
        
        setAllProjects(dashboardData);
        
        // If a specific project ID was requested, find that project
        if (projectId) {
          const project = dashboardData.find(p => p.id === projectId);
          if (project) {
            setProjectData(project);
          } else {
            setError(`Project with ID ${projectId} not found`);
          }
        } else if (dashboardData.length > 0) {
          // Otherwise, use the first project
          setProjectData(dashboardData[0]);
        }
        
      } catch (err) {
        console.error("Error loading project data:", err);
        setError("Failed to load project data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    loadProjectData();
  }, [projectId, initializeDB]);
  
  return { projectData, allProjects, loading, error };
};
