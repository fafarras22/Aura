
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { TokenizationOverview } from "@/components/dashboard/TokenizationOverview";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { FarmLocationsOverview } from "@/components/dashboard/FarmLocationsOverview";
import { SalesStatusCard } from "@/components/dashboard/SalesStatusCard";
import { LoginDialog } from "@/components/dashboard/LoginDialog";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useNavigate } from "react-router-dom";
import { ContainerManagement } from "@/components/dashboard/ContainerManagement";
import { Thermometer, Droplet, Wind, Activity } from "lucide-react";
import { format } from "date-fns";
import { 
  FarmLocation, 
  ContainerSalesData, 
  TokenizationData 
} from "@/services/mockDataService";

const Dashboard = () => {
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
  const { login, loginAsAdmin, currentUser, isDeveloperMode, getContainerData } = useDeveloperMode();
  const navigate = useNavigate();
  
  // Section card states
  const [expandedSections, setExpandedSections] = useState({
    sensors: true,
    sales: true,
    tokenization: true,
    locations: true
  });
  
  // Toggle section expanded state
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
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
        imageUrl: ""
      },
      monthlySales: [120, 150, 180, 210, 250, 340],
      recurringCustomers: [
        { id: "cust-1", name: "Customer 1", imageUrl: "" },
        { id: "cust-2", name: "Customer 2", imageUrl: "" },
        { id: "cust-3", name: "Customer 3", imageUrl: "" }
      ],
      // Add missing required properties from ContainerSalesData
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
      // Add missing required properties from TokenizationData
      tokenBalance: 5000,
      tokenPrice: 10000,
      tokenChange: 2.5,
      tokenChangeType: "increase" as const,
      tokenHolders: [],
      investments: [],
      recentTransactions: [],
      tokenAllocation: [],
      investmentPerformance: []
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
  
  // Check if user is logged in when component mounts
  useEffect(() => {
    if (!currentUser) {
      setShowLoginDialog(true);
    }
  }, [currentUser]);
  
  const handleLoginSubmit = (type: 'admin' | 'user', username: string, password: string) => {
    let success = false;
    
    if (type === 'admin') {
      success = loginAsAdmin(password);
    } else {
      success = login(username, password);
    }
    
    if (success) {
      setShowLoginDialog(false);
    }
    
    return success;
  };

  if (!currentUser) {
    return (
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="text-center my-20 opacity-50">
          <h1 className="text-3xl font-bold tracking-tight">AKAR Farm Dashboard</h1>
          <p className="mt-2">Please login to access the dashboard</p>
        </div>
        
        <LoginDialog 
          open={showLoginDialog} 
          onOpenChange={setShowLoginDialog}
          onLogin={handleLoginSubmit}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader currentUser={currentUser} />
      
      <QuickStats 
        criticalAlertsCount={mockData.criticalAlertsCount}
        upcomingHarvestsCount={mockData.upcomingHarvestsCount}
        containerCount={mockData.containerCount}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <SectionCard 
            title="Environmental Sensors" 
            onToggle={() => toggleSection('sensors')}
            isExpanded={expandedSections.sensors}
            summary={<div className="text-sm text-muted-foreground">4 active sensors monitoring your farm</div>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SensorCard 
                title="Temperature" 
                value={25.3} 
                unit="°C" 
                icon={<Thermometer className="w-5 h-5" />}
                status="normal"
                progress={65}
                minValue={15}
                maxValue={35}
              />
              <SensorCard 
                title="Humidity" 
                value={64} 
                unit="%" 
                icon={<Droplet className="w-5 h-5" />}
                status="normal"
                progress={64}
                minValue={0}
                maxValue={100}
              />
              <SensorCard 
                title="CO2 Level" 
                value={415} 
                unit="ppm" 
                icon={<Wind className="w-5 h-5" />}
                status="normal"
                progress={41.5}
                minValue={0}
                maxValue={1000}
              />
              <SensorCard 
                title="Water pH" 
                value={6.2} 
                unit="pH" 
                icon={<Activity className="w-5 h-5" />}
                status="warning"
                progress={62}
                minValue={0}
                maxValue={10}
              />
            </div>
          </SectionCard>
          
          {/* Container Management Component (Admin-only) */}
          {isDeveloperMode && <ContainerManagement />}
          
          <SectionCard 
            title="Sales Status"
            onToggle={() => toggleSection('sales')}
            isExpanded={expandedSections.sales}
            summary={<div className="text-sm text-muted-foreground">Total sales: {mockData.salesData.totalSales} units</div>}
          >
            <div className="grid grid-cols-1 gap-4">
              <SalesStatusCard data={mockData.salesData} />
            </div>
          </SectionCard>
        </div>
        
        <div className="space-y-6">
          <TokenizationOverview tokenData={mockData.tokenData} />
          
          <SectionCard 
            title="Container Locations"
            onToggle={() => toggleSection('locations')}
            isExpanded={expandedSections.locations}
            summary={<div className="text-sm text-muted-foreground">{mockData.farmLocations.length} farm locations</div>}
          >
            <FarmLocationsOverview farmLocations={mockData.farmLocations} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
