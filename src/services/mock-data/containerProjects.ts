
import { ContainerProject } from '@/components/containers/ContainerCard';

/**
 * Get mock container projects data for demonstration mode
 * @returns Array of mock container projects
 */
export const getMockContainerProjects = (): ContainerProject[] => {
  return [
    {
      id: 'container-a',
      name: 'Container A - Premium Herbs',
      description: 'High-yield herb farming in climate-controlled environment',
      imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 1000,
      filledTokens: 960,
      apy: 12.5,
      runtimeDays: 365,
      status: 'live'
    },
    {
      id: 'container-b',
      name: 'Container B - Exotic Fruits',
      description: 'Specialized container for rare tropical fruits',
      imageUrl: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 1000,
      filledTokens: 200,
      apy: 18.5,
      runtimeDays: 365,
      status: 'live'
    },
    {
      id: 'container-c',
      name: 'Container C - Organic Greens ICO',
      description: 'Initial container offering for new organic greens project',
      imageUrl: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 1000,
      filledTokens: 100,
      apy: 15.0,
      runtimeDays: 180,
      status: 'ico'
    },
    {
      id: 'container-d',
      name: 'Container D - Microgreens Expansion',
      description: 'Expanding our microgreens production capacity',
      imageUrl: 'https://images.unsplash.com/photo-1620654458511-52bb2fc847dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 1500,
      filledTokens: 500,
      apy: 14.2,
      runtimeDays: 365,
      status: 'live'
    },
    {
      id: 'container-e',
      name: 'Container E - Vertical Farm Tech',
      description: 'Next-generation vertical farming technology showcase',
      imageUrl: 'https://images.unsplash.com/photo-1621456941931-cb157a247ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 2000,
      filledTokens: 200,
      apy: 16.8,
      runtimeDays: 730,
      status: 'upcoming'
    },
    {
      id: 'container-f',
      name: 'Container F - Hydroponic System',
      description: 'Advanced water-based growing system for leafy greens',
      imageUrl: 'https://images.unsplash.com/photo-1606224547053-093d2d5cd7fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 1800,
      filledTokens: 1200,
      apy: 13.8,
      runtimeDays: 365,
      status: 'live'
    },
    {
      id: 'container-g',
      name: 'Container G - Berry Farm',
      description: 'Year-round berry cultivation using hydroponics',
      imageUrl: 'https://images.unsplash.com/photo-1626184793609-9c59614ae4a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 1200,
      filledTokens: 800,
      apy: 15.5,
      runtimeDays: 365,
      status: 'live'
    },
    {
      id: 'container-h',
      name: 'Container H - Mushroom Lab',
      description: 'Specialty mushroom cultivation in controlled environment',
      imageUrl: 'https://images.unsplash.com/photo-1607529694761-25412a69b8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 1000,
      filledTokens: 450,
      apy: 17.2,
      runtimeDays: 180,
      status: 'live'
    },
    {
      id: 'container-i',
      name: 'Container I - Tomato Tower',
      description: 'Vertical growing system specialized for tomato varieties',
      imageUrl: 'https://images.unsplash.com/photo-1592967240998-67992fdb95b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 1500,
      filledTokens: 300,
      apy: 14.8,
      runtimeDays: 365,
      status: 'upcoming'
    }
  ];
};
