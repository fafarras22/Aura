
import { Harvest } from './types';

// Generate mock harvests data for demonstration mode
export const getMockHarvests = (): Harvest[] => {
  return [
    {
      id: "harvest-1",
      cropName: "Premium Lettuce",
      containerName: "Container A",
      harvestDate: "2023-09-28",
      amount: 125,
      unit: "kg",
      status: "scheduled"
    },
    {
      id: "harvest-2",
      cropName: "Cherry Tomatoes",
      containerName: "Container B",
      harvestDate: "2023-09-25",
      amount: 80,
      unit: "kg",
      status: "harvested"
    },
    {
      id: "harvest-3",
      cropName: "Baby Spinach",
      containerName: "Container C",
      harvestDate: "2023-09-30",
      amount: 90,
      unit: "kg",
      status: "in-progress"
    },
    {
      id: "harvest-4",
      cropName: "Kale",
      containerName: "Container A",
      harvestDate: "2023-10-05",
      amount: 110,
      unit: "kg",
      status: "scheduled"
    }
  ];
};

// Generate detailed harvest data for a specific harvest
export const getMockHarvestData = (harvestId?: string) => {
  // If no harvestId is provided, return the first harvest data
  const allHarvests = getMockHarvests();
  const harvest = harvestId 
    ? allHarvests.find(h => h.id === harvestId) 
    : allHarvests[0];
  
  if (!harvest) return null;
  
  return {
    ...harvest,
    details: {
      nutrientLevels: {
        nitrogen: 85,
        phosphorus: 70,
        potassium: 92
      },
      growthStats: {
        germination: 95,
        survival: 90,
        maturity: 98
      },
      qualityMetrics: {
        color: "Excellent",
        size: "Above Average",
        taste: "Premium",
        nutritionalValue: "High"
      },
      environmentalData: {
        averageTemperature: 24.5,
        averageHumidity: 68,
        lightExposure: "Optimal",
        waterConsumption: 450 // liters
      }
    }
  };
};
