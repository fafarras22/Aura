
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { format } from "date-fns";
import { 
  FarmLocation, 
  ContainerSalesData, 
  TokenizationData 
} from "@/services/mockDataService";

export const useDashboardData = () => {
  const { getContainerData } = useDeveloperMode();

  // Mock data for the dashboard components
  const mockData = {
    criticalAlertsCount: 1,
    upcomingHarvestsCount: 3,
    containerCount: getContainerData().length || 3,
    
    // Sales data
    salesData: {
      id: "sales-1",
      containerName: "Jakarta Farm Container",
      totalSales: 1250,
      totalRevenue: 85000000,
      supermarketClient: {
        name: "Superindo Market",
        imageUrl: "",
        location: "Jakarta",
        contractValue: 75000000
      },
      monthlySales: [
        { month: "Jan", sales: 120 },
        { month: "Feb", sales: 150 },
        { month: "Mar", sales: 180 },
        { month: "Apr", sales: 210 },
        { month: "May", sales: 250 },
        { month: "Jun", sales: 340 }
      ],
      recurringCustomers: [
        { id: "cust-1", name: "Customer 1", imageUrl: "" },
        { id: "cust-2", name: "Customer 2", imageUrl: "" },
        { id: "cust-3", name: "Customer 3", imageUrl: "" }
      ],
      month: "Current",
      amount: 85000000
    } as ContainerSalesData,
    
    // Tokenization data
    tokenData: {
      totalValue: 125000000,
      totalTokens: 12500,
      activeContracts: 3,
      totalInvestors: 18,
      averageReturn: 12.5,
      recentActivities: [
        {
          id: "token-act-1",
          type: "invested",
          description: "New investment",
          tokenAmount: 500,
          date: format(new Date(), "dd MMM yyyy"),
          transactionHash: "0x1234567890abcdef"
        },
        {
          id: "token-act-2",
          type: "harvested",
          description: "Harvest yield distributed",
          tokenAmount: 250,
          date: format(new Date(), "dd MMM yyyy"),
          transactionHash: "0x0987654321fedcba"
        }
      ],
      tokenBalance: 5000,
      tokenPrice: 10000,
      tokenChange: 2.5,
      tokenChangeType: "increase" as const,
      tokenHolders: [],
      investments: [],
      recentTransactions: [],
      tokenAllocation: [],
      investmentPerformance: [],
      contractDuration: 12
    } as TokenizationData,
    
    // Farm locations
    farmLocations: [
      { 
        id: "loc-1", 
        name: "Jakarta Farm", 
        status: "active" as const, 
        location: { lat: 106.8456, lng: -6.2088 },
        containers: 5,
        address: "Jl. Sudirman 123, Jakarta"
      },
      { 
        id: "loc-2", 
        name: "Bandung Farm", 
        status: "maintenance" as const, 
        location: { lat: 107.6191, lng: -6.9175 },
        containers: 3,
        address: "Jl. Asia Afrika 45, Bandung"
      },
      { 
        id: "loc-3", 
        name: "Surabaya Farm", 
        status: "active" as const, 
        location: { lat: 112.7378, lng: -7.2575 },
        containers: 4, 
        address: "Jl. Pemuda 88, Surabaya"
      }
    ] as FarmLocation[]
  };

  return mockData;
};
