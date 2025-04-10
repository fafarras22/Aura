
import { useState, useEffect, useRef } from 'react';
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
  
  // References to store the initial data to prevent changes on re-renders
  const dataInitializedRef = useRef(false);
  const stableProjectsRef = useRef<ProjectDashboardData[]>([]);

  useEffect(() => {
    // Only load data once to prevent values from changing on re-renders
    if (dataInitializedRef.current) {
      // If we already have data and are requesting a specific project, find that project
      if (projectId && stableProjectsRef.current.length > 0) {
        const project = stableProjectsRef.current.find(p => p.id === projectId);
        if (project) {
          setProjectData(project);
        } else {
          setError(`Project with ID ${projectId} not found`);
        }
      }
      return;
    }
    
    const loadProjectData = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch this data from a database
        // For now, generate mock data for all container projects
        const mockContainers = getMockContainerProjects();
        const mockClimateData = getMockClimateData();
        const mockWaterData = getMockWaterData(7);
        
        // Generate deterministic values by using container ID as seed
        const stableRandom = (min: number, max: number, seed: number) => {
          // Simple deterministic pseudo-random function with seed
          const value = ((Math.sin(seed) + 1) / 2) * (max - min) + min;
          return parseFloat(value.toFixed(1)); // Fixed precision to prevent fluctuation
        };
        
        // Create dashboard data for each project with stable values
        const dashboardData: ProjectDashboardData[] = mockContainers.map((container, index) => {
          // Use container ID as a numeric seed for random values
          const containerSeed = parseInt(container.id.replace(/\D/g, '') || '1', 10);
          
          // Use different climate and water data for each project but ensure values are stable
          const climateIndex = index % mockClimateData.length;
          const waterIndex = index % mockWaterData.length;
          
          // Generate stable dates for harvests
          const now = new Date("2023-01-15T12:00:00Z"); // Fixed date for stability
          const lastHarvestDate = new Date(now);
          lastHarvestDate.setDate(lastHarvestDate.getDate() - (15 + index * 2));
          
          const nextHarvestDate = new Date(now);
          nextHarvestDate.setDate(nextHarvestDate.getDate() + (12 + index));
          
          // Generate stable alerts - same ones each time
          const alertTypes = ['info', 'warning', 'error'] as const;
          const alertMessages = [
            'Nutrient level slightly low',
            'Temperature fluctuation detected',
            'pH level out of optimal range',
            'Water level warning',
            'Humidity out of optimal range',
            'Light intensity warning'
          ];
          
          const alerts = Array(Math.min(index + 1, 3)).fill(null).map((_, i) => {
            const alertDate = new Date(now);
            alertDate.setHours(alertDate.getHours() - (i * 4 + index));
            
            return {
              id: `alert-${container.id}-${i}`,
              type: alertTypes[i % alertTypes.length],
              message: alertMessages[(i + index) % alertMessages.length],
              timestamp: alertDate.toISOString()
            };
          });
          
          // Create the project dashboard data object with stable values
          return {
            id: container.id,
            name: container.name,
            sensors: {
              temperature: parseFloat(mockClimateData[climateIndex].temperature.toFixed(1)),
              humidity: Math.round(mockClimateData[climateIndex].humidity),
              co2Level: Math.round(mockClimateData[climateIndex].co2),
              ph: parseFloat(mockWaterData[waterIndex].ph.toFixed(1)),
              ec: parseFloat(mockWaterData[waterIndex].ec.toFixed(1)),
              tds: Math.round(mockWaterData[waterIndex].tds),
              waterLevel: Math.round(mockWaterData[waterIndex].level),
              lightLevel: Math.round(mockClimateData[climateIndex].light)
            },
            climate: {
              temperature: parseFloat(mockClimateData[climateIndex].temperature.toFixed(1)),
              humidity: Math.round(mockClimateData[climateIndex].humidity),
              co2Level: Math.round(mockClimateData[climateIndex].co2),
              light: Math.round(mockClimateData[climateIndex].light),
              airflow: parseFloat(stableRandom(2.0, 3.0, containerSeed + 5).toFixed(1)),
              lastUpdated: new Date(now).toISOString(),
              status: ['normal', 'normal', 'warning'][index % 3] as 'normal' | 'warning' | 'error'
            },
            water: {
              ph: parseFloat(mockWaterData[waterIndex].ph.toFixed(1)),
              ec: parseFloat(mockWaterData[waterIndex].ec.toFixed(1)),
              tds: Math.round(mockWaterData[waterIndex].tds),
              do: parseFloat(mockWaterData[waterIndex].do.toFixed(1)),
              temperature: parseFloat(mockWaterData[waterIndex].temperature.toFixed(1)),
              level: Math.round(mockWaterData[waterIndex].level),
              flowRate: parseFloat(stableRandom(10.0, 15.0, containerSeed + 10).toFixed(1)),
              lastUpdated: new Date(now).toISOString(),
              status: ['normal', 'normal', 'warning'][index % 3] as 'normal' | 'warning' | 'error'
            },
            location: {
              name: ['Jakarta Farm', 'Bandung Farm', 'Surabaya Farm'][index % 3],
              address: ['Jl. Sudirman 123, Jakarta', 'Jl. Asia Afrika 45, Bandung', 'Jl. Pemuda 88, Surabaya'][index % 3],
              lat: 106.8456 + (index * 0.01),
              lng: -6.2088 + (index * 0.01),
              status: ['active', 'active', 'maintenance'][index % 3] as 'active' | 'maintenance' | 'offline'
            },
            lastHarvest: lastHarvestDate.toISOString(),
            nextHarvest: nextHarvestDate.toISOString(),
            cropType: ['Lettuce', 'Kale', 'Spinach', 'Herbs', 'Microgreens', 'Strawberry'][index % 6],
            alerts
          };
        });
        
        // Store the generated data in refs to ensure stability
        stableProjectsRef.current = dashboardData;
        dataInitializedRef.current = true;
        
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
  
  return { projectData, allProjects: stableProjectsRef.current.length > 0 ? stableProjectsRef.current : allProjects, loading, error };
};
