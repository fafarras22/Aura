
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DashboardLogin } from "@/components/dashboard/DashboardLogin";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useDashboardData } from "@/components/dashboard/useDashboardData";

const Dashboard = () => {
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
  const { login, loginAsAdmin, currentUser, isDeveloperMode } = useDeveloperMode();
  
  // Section card states
  const [expandedSections, setExpandedSections] = useState({
    sensors: true,
    sales: true,
    tokenization: true,
    locations: true
  });
  
  // Get dashboard data
  const mockData = useDashboardData();
  
  // Toggle section expanded state
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
      <DashboardLogin
        showLoginDialog={showLoginDialog}
        setShowLoginDialog={setShowLoginDialog}
        onLogin={handleLoginSubmit}
      />
    );
  }

  // Filter farm locations based on user role
  const filteredFarmLocations = isDeveloperMode 
    ? mockData.farmLocations 
    : mockData.farmLocations.filter(location => {
        if (currentUser?.role === 'client' && currentUser?.containerId) {
          return location.id.includes(currentUser.containerId) || 
                 location.name.includes(currentUser.containerId);
        }
        return true;
      });

  return (
    <div className="space-y-6">
      <DashboardHeader currentUser={currentUser} />
      
      <DashboardContent 
        isDeveloperMode={isDeveloperMode}
        criticalAlertsCount={mockData.criticalAlertsCount}
        upcomingHarvestsCount={mockData.upcomingHarvestsCount}
        containerCount={mockData.containerCount}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        salesData={mockData.salesData}
        tokenData={mockData.tokenData}
        farmLocations={filteredFarmLocations}
      />
    </div>
  );
};

export default Dashboard;
