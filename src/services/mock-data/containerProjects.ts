
import { ContainerProject } from '@/components/containers/ContainerCard';
import { faker } from '@faker-js/faker';

export const getMockContainerProjects = (): ContainerProject[] => {
  const projectTypes: Array<'container' | 'fishery' | 'cattle' | 'palm-oil' | 'rice' | 'greenhouse'> = [
    'container', 'fishery', 'cattle', 'palm-oil', 'rice', 'greenhouse'
  ];
  
  const locations = [
    'Bandung, Indonesia', 
    'Jakarta, Indonesia', 
    'Bangkok, Thailand', 
    'Hanoi, Vietnam', 
    'Kuala Lumpur, Malaysia', 
    'Cebu, Philippines', 
    'Singapore'
  ];

  const containerImages = [
    '/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png',
    '/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png',
    '/lovable-uploads/1fe7dc27-86fd-4951-be87-72e09e824c9b.png',
    '/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png',
    '/lovable-uploads/532be948-74b8-4d14-a726-8fa51d204cf7.png',
    '/lovable-uploads/b795ce5f-6c21-4dec-8060-90844a893974.png',
    '/lovable-uploads/c5b2d24e-f106-4e89-af2d-efaced4463bb.png',
    '/lovable-uploads/e60ccc9b-594d-461b-9ef9-2b157e19b0a1.png',
    '/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png',
  ];

  const getProjectName = (type: string) => {
    const projectPrefixes: Record<string, string[]> = {
      container: ['Smart', 'Urban', 'Vertical', 'Tech', 'Eco'],
      fishery: ['Sustainable', 'Ocean', 'Reef', 'Coastal', 'Aqua'],
      cattle: ['Free Range', 'Natural', 'Organic', 'Family', 'Healthy'],
      'palm-oil': ['Sustainable', 'Eco', 'Responsible', 'Fair Trade', 'Green'],
      rice: ['Traditional', 'Paddy', 'Organic', 'Terraced', 'Sustainable'],
      greenhouse: ['Hydroponic', 'Solar', 'Smart', 'Climate', 'Tech']
    };

    const projectSuffixes: Record<string, string[]> = {
      container: ['Container Farm', 'Urban Farm', 'Grow System', 'Vertical Garden', 'Food Hub'],
      fishery: ['Fishery', 'Aquaculture', 'Fish Farm', 'Marine Farm', 'Seafood Production'],
      cattle: ['Cattle Ranch', 'Beef Farm', 'Livestock Project', 'Dairy Farm', 'Organic Ranch'],
      'palm-oil': ['Palm Plantation', 'Oil Production', 'Palm Oil Project', 'Sustainable Palms', 'Eco Plantation'],
      rice: ['Rice Fields', 'Paddy Project', 'Rice Farm', 'Rice Production', 'Rice Harvest'],
      greenhouse: ['Greenhouse', 'Growing System', 'Produce Farm', 'Fresh Greens', 'Food Production']
    };

    const prefixes = projectPrefixes[type] || projectPrefixes.container;
    const suffixes = projectSuffixes[type] || projectSuffixes.container;
    
    return `${faker.helpers.arrayElement(prefixes)} ${faker.helpers.arrayElement(suffixes)}`;
  };

  const getProjectDescription = (type: string) => {
    const descriptions: Record<string, string[]> = {
      container: [
        'High-tech vertical farming in shipping containers, growing leafy greens and herbs using hydroponics.',
        'Urban container farm producing fresh vegetables year-round in a controlled environment.',
        'Scalable container farming system growing microgreens for local restaurants.'
      ],
      fishery: [
        'Sustainable fish farming operation using recirculating aquaculture systems to reduce environmental impact.',
        'Coastal fish farm raising tilapia and catfish using innovative feeding techniques.',
        'Marine aquaculture project growing high-value seafood species with low environmental footprint.'
      ],
      cattle: [
        'Grass-fed cattle ranch using rotational grazing to improve soil health and carbon sequestration.',
        'Family-owned livestock operation raising heritage cattle breeds on natural pastures.',
        'Organic beef production facility with complete traceability from birth to market.'
      ],
      'palm-oil': [
        'Sustainable palm oil plantation certified for environmental and social responsibility.',
        'Small-scale palm oil production that protects forest habitats and supports local communities.',
        'RSPO-certified palm plantation with zero deforestation commitment and fair labor practices.'
      ],
      rice: [
        'Traditional rice terraces using ancient farming methods combined with modern monitoring technology.',
        'Organic rice production using natural pest control and water conservation techniques.',
        'Community-based rice farming cooperative supporting multiple small-holder farmers.'
      ],
      greenhouse: [
        'Advanced greenhouse using hydroponics to grow tomatoes, cucumbers and peppers year-round.',
        'Solar-powered greenhouse operation producing premium vegetables with minimal carbon footprint.',
        'Climate-controlled greenhouse facility cultivating exotic fruits and specialty crops.'
      ]
    };
    
    const options = descriptions[type] || descriptions.container;
    return faker.helpers.arrayElement(options);
  };

  return Array.from({ length: 9 }, (_, i) => {
    const type = faker.helpers.arrayElement(projectTypes);
    const totalTokens = faker.number.int({ min: 10000, max: 1000000 });
    const filledTokens = faker.number.int({ min: 0, max: totalTokens });
    const status: 'live' | 'upcoming' | 'completed' | 'ico' = faker.helpers.arrayElement(['live', 'upcoming', 'completed', 'ico']);
    
    return {
      id: `proj-${i + 1}`,
      name: getProjectName(type),
      description: getProjectDescription(type),
      imageUrl: faker.helpers.arrayElement(containerImages),
      totalTokens,
      filledTokens,
      apy: faker.number.float({ min: 8, max: 22, precision: 0.1 }),
      runtimeDays: faker.helpers.arrayElement([180, 365, 730, 1095]),
      status,
      type,
      location: faker.helpers.arrayElement(locations)
    };
  });
};
