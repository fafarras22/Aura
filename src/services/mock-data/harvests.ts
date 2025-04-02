
import { Harvest } from './types';

// Mock harvests
export const getMockHarvests = (): Harvest[] => {
  const now = new Date();
  
  return [
    {
      id: 'h1',
      cropName: 'Baby Spinach',
      crop: 'Baby Spinach', // For backward compatibility
      containerNumber: '001',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 20), // 20 days ago
      harvestDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
      status: 'growing',
      estimatedYield: 45,
      notes: 'Growth looks excellent, ahead of schedule',
      quantity: 45, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: '2 days from now' // For backward compatibility
    },
    {
      id: 'h2',
      cropName: 'Kale',
      crop: 'Kale', // For backward compatibility
      containerNumber: '002',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 28), // 28 days ago
      harvestDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1), // Yesterday
      status: 'ready',
      estimatedYield: 38,
      notes: 'Ready for harvest, quality looks outstanding',
      quantity: 38, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: 'Yesterday' // For backward compatibility
    },
    {
      id: 'h3',
      cropName: 'Arugula',
      crop: 'Arugula', // For backward compatibility
      containerNumber: '003',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 35), // 35 days ago
      harvestDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      status: 'harvested',
      estimatedYield: 40,
      actualYield: 42,
      notes: 'Yield exceeded expectations, excellent quality',
      quantity: 40, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: '5 days ago' // For backward compatibility
    },
    {
      id: 'h4',
      cropName: 'Basil',
      crop: 'Basil', // For backward compatibility
      containerNumber: '001',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
      harvestDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 10), // 10 days from now
      status: 'growing',
      estimatedYield: 30,
      notes: 'Growth slightly slower than expected, adjusted nutrients',
      quantity: 30, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: '10 days from now' // For backward compatibility
    },
    {
      id: 'h5',
      cropName: 'Lettuce - Butterhead',
      crop: 'Lettuce - Butterhead', // For backward compatibility
      containerNumber: '002',
      plantedDate: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 25), // 25 days ago
      harvestDate: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 0), // Today
      status: 'ready',
      estimatedYield: 50,
      notes: 'Perfect timing, harvest teams notified',
      quantity: 50, // For backward compatibility
      unit: 'kg', // For backward compatibility
      date: 'Today' // For backward compatibility
    }
  ];
};

// Create a new function for the Harvest.tsx page which returns data in the format it expects
export const getMockHarvestData = () => {
  return [
    { 
      id: "h1", 
      containerName: "Container 001", 
      cropType: "Lettuce", 
      weight: 42.3, 
      quality: 96, 
      harvestDate: "2024-04-12", 
      batchNumber: "LET-2405-01", 
      assignedTo: "John Doe",
      status: "completed"
    },
    { 
      id: "h2", 
      containerName: "Container 003", 
      cropType: "Basil", 
      weight: 36.8, 
      quality: 92, 
      harvestDate: "2024-04-14", 
      batchNumber: "BAS-2405-01", 
      assignedTo: "Sarah Chen",
      status: "completed"
    },
    { 
      id: "h3", 
      containerName: "Container 005", 
      cropType: "Kale", 
      weight: 29.4, 
      quality: 88, 
      harvestDate: "2024-04-18", 
      batchNumber: "KAL-2405-01", 
      assignedTo: "Mike Johnson",
      status: "scheduled"
    },
    { 
      id: "h4", 
      containerName: "Container 002", 
      cropType: "Spinach", 
      weight: 31.7, 
      quality: 94, 
      harvestDate: "2024-04-20", 
      batchNumber: "SPI-2405-01", 
      assignedTo: "Lisa Wong",
      status: "scheduled"
    },
    { 
      id: "h5", 
      containerName: "Container 007", 
      cropType: "Arugula", 
      weight: 28.2, 
      quality: 91, 
      harvestDate: "2024-04-22", 
      batchNumber: "ARU-2405-01", 
      assignedTo: "David Smith",
      status: "scheduled"
    },
    { 
      id: "h6", 
      containerName: "Container 004", 
      cropType: "Tomatoes", 
      weight: 45.6, 
      quality: 97, 
      harvestDate: "2024-04-08", 
      batchNumber: "TOM-2404-02", 
      assignedTo: "Emma Davis",
      status: "completed"
    }
  ];
};
