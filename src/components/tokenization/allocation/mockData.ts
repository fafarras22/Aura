
import { TokenAllocationData } from './types';

export const allocationData: TokenAllocationData = {
  fundAllocation: [
    { name: 'Operations & Maintenance', value: 30, color: '#0088FE' },
    { name: 'Technology & Innovation', value: 25, color: '#00C49F' },
    { name: 'Farming Materials', value: 20, color: '#FFBB28' },
    { name: 'Investor Returns', value: 15, color: '#FF8042' },
    { name: 'Community Development', value: 10, color: '#8884d8' },
  ],
  containerAllocations: [
    {
      id: 1,
      name: "Container 1",
      allocations: [
        { category: "Seeds & Plants", percentage: 25, amount: 15750000 },
        { category: "Utilities", percentage: 15, amount: 9450000 },
        { category: "Labor", percentage: 30, amount: 18900000 },
        { category: "Technology", percentage: 20, amount: 12600000 },
        { category: "Maintenance", percentage: 10, amount: 6300000 },
      ]
    },
    {
      id: 2,
      name: "Container 2",
      allocations: [
        { category: "Seeds & Plants", percentage: 20, amount: 12600000 },
        { category: "Utilities", percentage: 15, amount: 9450000 },
        { category: "Labor", percentage: 25, amount: 15750000 },
        { category: "Technology", percentage: 30, amount: 18900000 },
        { category: "Maintenance", percentage: 10, amount: 6300000 },
      ]
    },
    {
      id: 3,
      name: "Container 3",
      allocations: [
        { category: "Seeds & Plants", percentage: 30, amount: 18900000 },
        { category: "Utilities", percentage: 10, amount: 6300000 },
        { category: "Labor", percentage: 25, amount: 15750000 },
        { category: "Technology", percentage: 15, amount: 9450000 },
        { category: "Maintenance", percentage: 20, amount: 12600000 },
      ]
    },
  ]
};
