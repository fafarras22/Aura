
import { ContainerSalesData } from './types';

// Generate data for container sales
export const getMockContainerSalesData = (): ContainerSalesData[] => {
  const mockContainerSales: ContainerSalesData[] = [
    { month: 'Jan', amount: 2400 },
    { month: 'Feb', amount: 1398 },
    { month: 'Mar', amount: 9800 },
    { month: 'Apr', amount: 3908 },
    { month: 'May', amount: 4800 },
    { month: 'Jun', amount: 3800 },
    { month: 'Jul', amount: 4300 },
    { month: 'Aug', amount: 5300 },
    { month: 'Sep', amount: 4800 },
    { month: 'Oct', amount: 6800 },
    { month: 'Nov', amount: 7300 },
    { month: 'Dec', amount: 9400 }
  ];

  // Add extended container sales data for the dashboard
  const extendedSalesData: ContainerSalesData[] = [
    {
      id: 'sales1',
      containerName: 'Jakarta Central Farm - Container A',
      month: 'Current',
      amount: 8500,
      supermarketClient: {
        name: 'Farm Fresh Supermarket',
        location: 'Jakarta Central',
        contractValue: 250000000,
        imageUrl: '/lovable-uploads/farm-fresh-logo.png'
      },
      priceRange: {
        min: 45000,
        max: 60000
      },
      totalSales: 450,
      totalRevenue: 22500000,
      monthlySales: [
        { month: 'Jan', sales: 320 },
        { month: 'Feb', sales: 380 },
        { month: 'Mar', sales: 420 },
        { month: 'Apr', sales: 450 }
      ],
      recurringCustomers: [
        { id: 'c1', name: 'Hotel Indonesia Kempinski', purchaseFrequency: 'Weekly', imageUrl: '/lovable-uploads/kempinski-logo.png' },
        { id: 'c2', name: 'Grand Hyatt Jakarta', purchaseFrequency: 'Bi-weekly', imageUrl: '/lovable-uploads/hyatt-logo.png' },
        { id: 'c3', name: 'Warung Tekko', purchaseFrequency: 'Daily', imageUrl: '/lovable-uploads/warung-tekko-logo.png' },
        { id: 'c4', name: 'MRT Central Kitchen', purchaseFrequency: 'Weekly', imageUrl: '/lovable-uploads/mrt-logo.png' }
      ]
    }
  ];

  return [...mockContainerSales, ...extendedSalesData];
};
