
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
      description: 'High-yield herb farming in climate-controlled environment. This container specializes in premium culinary herbs like basil, mint, and rosemary that are supplied to high-end restaurants and specialty food markets. The controlled environment allows year-round production regardless of external climate conditions.',
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
      description: 'Specialized container for rare tropical fruits. This innovative project cultivates exotic fruits like dragon fruit, rambutan, and passion fruit in a precisely controlled tropical microclimate. These high-value crops command premium prices in specialty markets and are typically unavailable locally, creating a unique market position with limited competition.',
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
      description: 'Initial container offering for new organic greens project. This upcoming container will focus on certified organic leafy greens using an advanced hydroponic system. The ICO funding will support setup costs including specialized lighting, water filtration systems, and organic certification processes. Once operational, produce will be distributed to organic grocery chains and health food stores.',
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
      description: 'Expanding our microgreens production capacity. This container is dedicated to high-intensity microgreens cultivation, focusing on specialty varieties like sunflower, pea shoots, and radish microgreens. With a rapid 7-14 day growth cycle, this container achieves exceptional capital efficiency with multiple harvests per month, supplying fresh microgreens to restaurants, juice bars, and health food stores.',
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
      description: 'Next-generation vertical farming technology showcase. This container features our most advanced growing technology, utilizing AI-controlled lighting, automated nutrient delivery, and IoT sensors to maximize crop yields while minimizing resource usage. The container serves as both a production facility and a demonstration of cutting-edge agricultural innovation available for franchise opportunities.',
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
      description: 'Advanced water-based growing system for leafy greens. This container utilizes a state-of-the-art NFT (Nutrient Film Technique) hydroponic system to grow premium lettuces and leafy greens with 95% less water than conventional farming. The closed-loop system recirculates water and nutrients, creating an environmentally sustainable operation that produces clean, pesticide-free greens with consistent quality year-round.',
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
      description: 'Year-round berry cultivation using hydroponics. This specialized container creates ideal growing conditions for strawberries, blueberries, and blackberries using advanced hydroponic techniques. The controlled environment eliminates seasonal limitations, allowing for continuous berry production regardless of outside weather conditions, while significantly reducing pest issues that typically affect berry farms.',
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
      description: 'Specialty mushroom cultivation in controlled environment. This container is dedicated to growing gourmet and medicinal mushrooms including shiitake, lion's mane, and oyster varieties. The precision-controlled environment creates ideal conditions for mushroom cultivation, while the specialized substrate production area allows for complete vertical integration of the growing process, maximizing efficiency and yield.',
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
      description: 'Vertical growing system specialized for tomato varieties. This container features a vertical hydroponic system optimized for vine crops, with specialized trellising and plant support structures. The project focuses on high-value heirloom and specialty tomato varieties, supplying premium produce to restaurants, farmers' markets, and specialty grocers with an emphasis on unique flavor profiles unavailable in conventional supermarkets.',
      imageUrl: 'https://images.unsplash.com/photo-1592967240998-67992fdb95b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      totalTokens: 1500,
      filledTokens: 300,
      apy: 14.8,
      runtimeDays: 365,
      status: 'upcoming'
    }
  ];
};
