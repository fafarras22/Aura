
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

const Dashboard = () => {
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
  const { login, loginAsAdmin, currentUser, isDeveloperMode } = useDeveloperMode();
  const navigate = useNavigate();
  
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
      <DashboardHeader />
      
      <QuickStats />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <SectionCard title="Environmental Sensors">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SensorCard 
                title="Temperature" 
                value={25.3} 
                unit="°C" 
                change={+1.2} 
                status="normal"
              />
              <SensorCard 
                title="Humidity" 
                value={64} 
                unit="%" 
                change={-3.5}
                status="normal"
              />
              <SensorCard 
                title="CO2 Level" 
                value={415} 
                unit="ppm" 
                change={+12}
                status="normal" 
              />
              <SensorCard 
                title="Water pH" 
                value={6.2} 
                unit="pH" 
                change={-0.3}
                status="warning" 
              />
            </div>
          </SectionCard>
          
          {/* Container Management Component (Admin-only) */}
          {isDeveloperMode && <ContainerManagement />}
          
          <SectionCard title="Sales Status">
            <div className="grid grid-cols-1 gap-4">
              <SalesStatusCard />
            </div>
          </SectionCard>
        </div>
        
        <div className="space-y-6">
          <TokenizationOverview />
          
          <SectionCard title="Container Locations">
            <FarmLocationsOverview />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
