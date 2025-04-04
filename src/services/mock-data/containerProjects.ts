
import { faker } from '@faker-js/faker';
import { ContainerProject } from '@/components/containers/ContainerCard';

// Create predictable random data for container projects
export const getMockContainerProjects = (): ContainerProject[] => {
  // Seed the faker to get consistent results
  faker.seed(123);
  
  const projectTypes: Array<'container' | 'fishery' | 'cattle' | 'palm-oil' | 'rice' | 'greenhouse'> = [
    'container', 'fishery', 'cattle', 'palm-oil', 'rice', 'greenhouse'
  ];
  
  const locations = [
    'Jakarta, Indonesia',
    'Bandung, Indonesia', 
    'Surabaya, Indonesia',
    'Bangkok, Thailand',
    'Chiang Mai, Thailand',
    'Ho Chi Minh City, Vietnam', 
    'Manila, Philippines',
    'Kuala Lumpur, Malaysia'
  ];
  
  const statusOptions: Array<'live' | 'upcoming' | 'completed' | 'ico'> = [
    'live', 'upcoming', 'completed', 'ico'
  ];
  
  const containerNames = [
    'Premium Herbs Farm',
    'Organic Vegetable Project',
    'Sustainable Rice Fields',
    'Tilapia Fish Farm',
    'Cattle Raising Initiative', 
    'Palm Oil Plantation',
    'Tomato Greenhouse',
    'Mushroom Production',
    'Fruit Tree Orchard',
    'Coffee Bean Plantation',
    'Aquaponic System'
  ];
  
  const projects: ContainerProject[] = [];
  
  for (let i = 0; i < 15; i++) {
    // Generate appropriate image URL based on type
    const type = projectTypes[Math.floor(Math.random() * projectTypes.length)];
    
    let imageUrl;
    if (type === 'container') {
      imageUrl = 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80';
    } else if (type === 'fishery') {
      imageUrl = 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80';
    } else if (type === 'cattle') {
      imageUrl = 'https://images.unsplash.com/photo-1605599472215-d1b7116657a5?auto=format&fit=crop&w=1000&q=80';
    } else if (type === 'palm-oil') {
      imageUrl = 'https://images.unsplash.com/photo-1591104142242-c5c7126b37c1?auto=format&fit=crop&w=1000&q=80';
    } else if (type === 'rice') {
      imageUrl = 'https://images.unsplash.com/photo-1556680200-f428a6796c8b?auto=format&fit=crop&w=1000&q=80';
    } else {
      imageUrl = 'https://images.unsplash.com/photo-1466779561253-0a08336ba2ab?auto=format&fit=crop&w=1000&q=80';
    }
    
    const id = `container-${i + 1}`;
    const name = `${containerNames[i % containerNames.length]} ${i + 1}`;
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const totalTokens = faker.number.int({ min: 500, max: 10000 });
    const filledTokens = status === 'completed' 
      ? totalTokens 
      : faker.number.int({ min: 0, max: totalTokens });
    
    const project: ContainerProject = {
      id,
      name,
      type,
      description: faker.lorem.paragraph().substring(0, 120),
      imageUrl,
      location: locations[Math.floor(Math.random() * locations.length)],
      totalTokens,
      filledTokens,
      apy: faker.number.float({ min: 8, max: 22, fractionDigits: 1 }),
      runtimeDays: faker.number.int({ min: 90, max: 365 }),
      status
    };
    
    projects.push(project);
  }
  
  return projects;
};
