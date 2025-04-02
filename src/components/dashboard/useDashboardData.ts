
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { format } from "date-fns";
import { 
  FarmLocation, 
  ContainerSalesData, 
  TokenizationData 
} from "@/services/mockDataService";

export const useDashboardData = () => {
  const { isDeveloperMode, getContainerData } = useDeveloperMode();
  
  // Get container data from the developer mode context
  const containers = getContainerData();
  const containerCount = containers.length || 3;

  // Mock data for the dashboard components
  const mockData = {
    criticalAlertsCount: isDeveloperMode ? 3 : 1,
    upcomingHarvestsCount: isDeveloperMode ? 8 : 3,
    containerCount,
    
    // Sales data
    salesData: {
      id: "sales-1",
      containerName: "Jakarta Farm Container",
      totalSales: isDeveloperMode ? 3250 : 1250,
      totalRevenue: isDeveloperMode ? 220000000 : 85000000,
      supermarketClient: {
        name: "Superindo Market",
        imageUrl: "",
        location: "Jakarta",
        contractValue: isDeveloperMode ? 180000000 : 75000000
      },
      monthlySales: [
        { month: "Jan", sales: isDeveloperMode ? 320 : 120 },
        { month: "Feb", sales: isDeveloperMode ? 350 : 150 },
        { month: "Mar", sales: isDeveloperMode ? 380 : 180 },
        { month: "Apr", sales: isDeveloperMode ? 410 : 210 },
        { month: "May", sales: isDeveloperMode ? 450 : 250 },
        { month: "Jun", sales: isDeveloperMode ? 540 : 340 }
      ],
      recurringCustomers: [
        { id: "cust-1", name: "Customer 1", imageUrl: "" },
        { id: "cust-2", name: "Customer 2", imageUrl: "" },
        { id: "cust-3", name: "Customer 3", imageUrl: "" }
      ],
      month: "Current",
      amount: isDeveloperMode ? 220000000 : 85000000
    } as ContainerSalesData,
    
    // Tokenization data
    tokenData: {
      totalValue: isDeveloperMode ? 325000000 : 125000000,
      totalTokens: isDeveloperMode ? 32500 : 12500,
      activeContracts: isDeveloperMode ? 7 : 3,
      totalInvestors: isDeveloperMode ? 42 : 18,
      averageReturn: isDeveloperMode ? 14.5 : 12.5,
      recentActivities: [
        {
          id: "token-act-1",
          type: "invested",
          description: "New investment",
          tokenAmount: isDeveloperMode ? 1200 : 500,
          date: format(new Date(), "dd MMM yyyy"),
          transactionHash: "0x1234567890abcdef"
        },
        {
          id: "token-act-2",
          type: "harvested",
          description: "Harvest yield distributed",
          tokenAmount: isDeveloperMode ? 600 : 250,
          date: format(new Date(), "dd MMM yyyy"),
          transactionHash: "0x0987654321fedcba"
        }
      ],
      tokenBalance: isDeveloperMode ? 12000 : 5000,
      tokenPrice: isDeveloperMode ? 10000 : 10000,
      tokenChange: isDeveloperMode ? 3.5 : 2.5,
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
        containers: isDeveloperMode ? 5 : 1,
        address: "Jl. Sudirman 123, Jakarta"
      },
      { 
        id: "loc-2", 
        name: "Bandung Farm", 
        status: "maintenance" as const, 
        location: { lat: 107.6191, lng: -6.9175 },
        containers: isDeveloperMode ? 3 : 1,
        address: "Jl. Asia Afrika 45, Bandung"
      },
      { 
        id: "loc-3", 
        name: "Surabaya Farm", 
        status: "active" as const, 
        location: { lat: 112.7378, lng: -7.2575 },
        containers: isDeveloperMode ? 4 : 1, 
        address: "Jl. Pemuda 88, Surabaya"
      }
    ] as FarmLocation[]
  };

  return mockData;
};
