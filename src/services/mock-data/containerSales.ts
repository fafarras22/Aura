
import { ContainerSalesData } from './types';

export const getMockContainerSalesData = (): ContainerSalesData => {
  return {
    id: "sales-1",
    containerName: "Jakarta Farm Container",
    totalSales: 3250,
    totalRevenue: 220000000,
    supermarketClient: {
      name: "Superindo Market",
      imageUrl: "",
      location: "Jakarta",
      contractValue: 180000000
    },
    monthlySales: [
      { month: "Jan", sales: 320 },
      { month: "Feb", sales: 350 },
      { month: "Mar", sales: 380 },
      { month: "Apr", sales: 410 },
      { month: "May", sales: 450 },
      { month: "Jun", sales: 540 }
    ],
    recurringCustomers: [
      { id: "cust-1", name: "Customer 1", imageUrl: "" },
      { id: "cust-2", name: "Customer 2", imageUrl: "" },
      { id: "cust-3", name: "Customer 3", imageUrl: "" }
    ],
    month: "Current",
    amount: 220000000
  };
};
