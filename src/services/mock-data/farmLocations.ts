
import { FarmLocation } from './types';

// Data for container farms
export const getMockFarmLocations = (): FarmLocation[] => {
  return [
    {
      id: '1',
      name: 'Jakarta Central Farm',
      location: { lat: -6.2088, lng: 106.8456 },
      status: 'active',
      containers: 8,
      address: 'Jl. Sudirman No. 123, Jakarta'
    },
    {
      id: '2',
      name: 'Bali Eco Center',
      location: { lat: -8.3405, lng: 115.0920 },
      status: 'active',
      containers: 5,
      address: 'Jl. Sunset Road 45, Kuta, Bali'
    },
    {
      id: '3',
      name: 'Surabaya Hub',
      location: { lat: -7.2575, lng: 112.7521 },
      status: 'maintenance',
      containers: 6,
      address: 'Jl. Pemuda 102, Surabaya'
    },
    {
      id: '4',
      name: 'Medan Center',
      location: { lat: 3.5952, lng: 98.6722 },
      status: 'active',
      containers: 4,
      address: 'Jl. Gatot Subroto 78, Medan'
    },
    {
      id: '5',
      name: 'Makassar Facility',
      location: { lat: -5.1477, lng: 119.4327 },
      status: 'inactive',
      containers: 3,
      address: 'Jl. Pettarani 55, Makassar'
    },
    {
      id: '6',
      name: 'Bandung Research Center',
      location: { lat: -6.9175, lng: 107.6191 },
      status: 'active',
      containers: 7,
      address: 'Jl. Asia Afrika 133, Bandung'
    },
    {
      id: '7',
      name: 'Yogyakarta Innovation Hub',
      location: { lat: -7.8014, lng: 110.3644 },
      status: 'active',
      containers: 4,
      address: 'Jl. Malioboro 42, Yogyakarta'
    }
  ];
};
