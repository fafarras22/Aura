
import { User, ContainerData } from './types';

// Mock admin password - in a real application, this would be securely stored
export const ADMIN_PASSWORD = 'admin123';

// Mock users
export const USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Administrator',
    role: 'admin',
    avatar: '/lovable-uploads/ff02fd5a-28c4-466b-99d9-ea6213beb2c5.png'
  },
  {
    id: 'user-1',
    name: 'Muhammad Farras',
    role: 'client',
    containerId: 'container-1',
    avatar: '/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png'
  },
  {
    id: 'user-2',
    name: 'Guest',
    role: 'client',
    containerId: 'container-2',
    avatar: '/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png'
  }
];

// Mock user passwords - in a real application, passwords would be hashed
export const USER_PASSWORDS: { [key: string]: string } = {
  'Administrator': 'admin123',
  'Muhammad Farras': 'admin123',
  'Guest': 'guest123'
};

// Mock containers data
export const CONTAINERS: ContainerData[] = [
  {
    id: 'container-1',
    name: 'Jakarta Farm Container',
    location: 'Jakarta, Indonesia',
    status: 'active',
    sensors: {
      temperature: 25.3,
      humidity: 64,
      co2: 415,
      ph: 6.2
    },
    currentCapacity: 85,
    maxCapacity: 100,
    lastHarvest: '2023-10-15',
    nextHarvest: '2023-11-05',
    owner: 'PT Akar Indonesia',
    client: 'Superindo Market'
  },
  {
    id: 'container-2',
    name: 'Bandung Farm Container',
    location: 'Bandung, Indonesia',
    status: 'maintenance',
    sensors: {
      temperature: 24.8,
      humidity: 60,
      co2: 430,
      ph: 6.5
    },
    currentCapacity: 65,
    maxCapacity: 90,
    lastHarvest: '2023-10-10',
    nextHarvest: '2023-11-10',
    owner: 'PT Akar Indonesia',
    client: 'Hypermart'
  },
  {
    id: 'container-3',
    name: 'Surabaya Farm Container',
    location: 'Surabaya, Indonesia',
    status: 'active',
    sensors: {
      temperature: 26.1,
      humidity: 62,
      co2: 420,
      ph: 6.3
    },
    currentCapacity: 90,
    maxCapacity: 100,
    lastHarvest: '2023-10-20',
    nextHarvest: '2023-11-15',
    owner: 'PT Akar Indonesia',
    client: 'LotteMart'
  }
];

// Function to add a new user
export const addNewUser = (username: string, password: string): User => {
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: username,
    role: 'client',
    containerId: 'container-1',
    avatar: '/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png'
  };
  
  // In a real app, you would save this to a database
  USERS.push(newUser);
  USER_PASSWORDS[username] = password;
  
  return newUser;
};
