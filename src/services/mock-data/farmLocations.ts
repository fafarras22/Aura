
import { FarmLocation } from './types';

export const getMockFarmLocations = (): FarmLocation[] => {
  return [
    { 
      id: "loc-1", 
      name: "Jakarta Farm", 
      status: "active", 
      location: { lat: 106.8456, lng: -6.2088 },
      containers: 5,
      address: "Jl. Sudirman 123, Jakarta"
    },
    { 
      id: "loc-2", 
      name: "Bandung Farm", 
      status: "maintenance", 
      location: { lat: 107.6191, lng: -6.9175 },
      containers: 3,
      address: "Jl. Asia Afrika 45, Bandung"
    },
    { 
      id: "loc-3", 
      name: "Surabaya Farm", 
      status: "active", 
      location: { lat: 112.7378, lng: -7.2575 },
      containers: 4, 
      address: "Jl. Pemuda 88, Surabaya"
    }
  ];
};
