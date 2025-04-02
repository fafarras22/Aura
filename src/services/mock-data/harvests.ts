
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
