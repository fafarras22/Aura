
import React, { useState, useEffect } from "react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { FarmLocationsOverview } from "@/components/dashboard/FarmLocationsOverview";
import { ContainerUpgrade } from "@/components/dashboard/ContainerUpgrade";
import { TokenizationOverview } from "@/components/dashboard/TokenizationOverview";
import { 
  getMockSensorData, 
  getMockAlerts, 
  getMockHarvests,
  getMockContainerSalesData,
  getMockFarmLocations,
  getMockTokenizationData
} from "@/services/mockDataService";
import { Droplets, ArrowRight, ShieldAlert, Shield } from "lucide-react";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useNavigate } from "react-router-dom";
import { AppleButton } from "@/components/ui/apple-button";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { DeveloperInfoCard } from "@/components/dashboard/DeveloperInfoCard";
import { LoginDialog } from "@/components/dashboard/LoginDialog";
import { AppleSensorCard } from "@/components/dashboard/AppleSensorCard";
import { ContainerPerformanceSection } from "@/components/dashboard/ContainerPerformanceSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesStatusCard } from "@/components/dashboard/SalesStatusCard";

const Dashboard = () => {
  const { 
    isDeveloperMode, 
    loginAsAdmin, 
    isAdminLoggedIn, 
    currentUser, 
    login, 
    suspiciousActivities, 
    canAccessDeveloperMode 
  } = useDeveloperMode();
  
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
  
  const sensorData = getMockSensorData();
  const alerts = getMockAlerts();
  const harvests = getMockHarvests();
  const containerSalesData = getMockContainerSalesData();
  const farmLocations = getMockFarmLocations();
  const tokenizationData = getMockTokenizationData();

  // Check if user is logged in when component mounts
  useEffect(() => {
    if (!currentUser) {
      setShowLoginDialog(true);
    }
  }, [currentUser]);

  // Get upcoming harvests (status === 'ready')
  const upcomingHarvests = harvests.filter(harvest => harvest.status === 'ready');
  
  // Filter for critical alerts
  const criticalAlerts = alerts.filter(alert => alert.type === 'error' && !alert.isRead);

  // Get client's specific container (in a real app, this would come from authentication)
  const clientContainerId = currentUser?.containerId || "CONT-001"; // Use container ID from user or default
  
  // Filter data based on user role
  const userContainers = isDeveloperMode 
    ? containerSalesData // Show all containers for admin/developer
    : containerSalesData.filter(data => data.id === clientContainerId); // Show only client's container
  
  const userFarmLocations = isDeveloperMode
    ? farmLocations // Show all locations for admin/developer
    : farmLocations.filter(loc => loc.id === clientContainerId); // Show only client's location

  // Map icon name to icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'thermometer': return <div className="w-5 h-5" />;
      case 'droplet': return <div className="w-5 h-5" />;
      case 'droplets': return <Droplets className="w-5 h-5" />;
      case 'wind': return <div className="w-5 h-5" />;
      case 'zap': return <div className="w-5 h-5" />;
      case 'flask-conical': return <div className="w-5 h-5" />;
      case 'waves': return <div className="w-5 h-5" />;
      case 'alert-circle': return <div className="w-5 h-5" />;
      default: return <div className="w-5 h-5" />;
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

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

  // If not logged in, show only the login dialog with locked background
  if (!currentUser) {
    return (
      <div className="relative">
        {/* Blurred/Locked Dashboard Background */}
        <div className="filter blur-sm pointer-events-none">
          <div className="space-y-8 opacity-40">
            <DashboardHeader currentUser={null} />
            <div className="p-6 border rounded-lg bg-muted/30">
              <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
              <p>Please log in to view dashboard content</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 border rounded-lg bg-muted/30 h-40"></div>
              <div className="p-6 border rounded-lg bg-muted/30 h-40"></div>
              <div className="p-6 border rounded-lg bg-muted/30 h-40"></div>
            </div>
            
            <div className="p-6 border rounded-lg bg-muted/30 h-60">
              <div className="flex items-center justify-center h-full">
                <ShieldAlert className="w-16 h-16 opacity-10" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Forced Login Dialog */}
        <LoginDialog 
          open={showLoginDialog} 
          onOpenChange={setShowLoginDialog}
          onLogin={handleLoginSubmit}
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <DashboardHeader currentUser={currentUser} />
        
        {/* Welcome message showing current user */}
        <WelcomeCard currentUser={currentUser} />
        
        {/* Quick Stats Summary */}
        <QuickStats 
          criticalAlertsCount={criticalAlerts.length}
          upcomingHarvestsCount={upcomingHarvests.length}
          containerCount={isDeveloperMode ? farmLocations.length : userContainers.length}
        />
        
        {/* Farm Locations Overview - Main Section */}
        <SectionCard
          title="AKAR Farm Container Network"
          description={isDeveloperMode ? "All active container farms in the AKAR ecosystem" : "Your container farms in the AKAR ecosystem"}
          onToggle={() => toggleSection('locations')}
          isExpanded={expandedSection === 'locations'}
          summary={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Active Containers</div>
                <div className="text-xl font-bold">{isDeveloperMode ? farmLocations.length : userContainers.length} units</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Production Capacity</div>
                <div className="text-xl font-bold">84%</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Total Harvest</div>
                <div className="text-xl font-bold">1,450 kg/month</div>
              </div>
            </div>
          }
        >
          <FarmLocationsOverview farmLocations={userFarmLocations} />
        </SectionCard>
        
        {/* Sensor Readings */}
        <SectionCard
          title="Sensor Readings"
          description={isDeveloperMode ? "Live readings from all container farm sensors" : "Live readings from your container farm sensors"}
          onToggle={() => toggleSection('sensors')}
          isExpanded={expandedSection === 'sensors'}
          onFullView={() => navigate('/sensors')}
          summary={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sensorData.filter(s => s.status !== 'normal').slice(0, 4).map((sensor) => (
                <div key={sensor.id} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-muted-foreground">{sensor.name}</div>
                    <div className="text-xs">
                      {sensor.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-xl font-bold">{sensor.value}{sensor.unit}</div>
                </div>
              ))}
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sensorData.slice(0, 8).map((sensor) => (
              <AppleSensorCard
                key={sensor.id}
                title={sensor.name}
                value={sensor.value}
                unit={sensor.unit}
                icon={getIconComponent(sensor.iconName)}
                status={sensor.status}
                progress={(sensor.value - sensor.minValue) / (sensor.maxValue - sensor.minValue) * 100}
                minValue={sensor.minValue}
                maxValue={sensor.maxValue}
                lastUpdated={sensor.lastUpdated}
              />
            ))}
          </div>
        </SectionCard>
        
        {/* Sales Status Section */}
        <SectionCard
          title={isDeveloperMode ? "Sales Status - All Containers" : "Sales Status - Your Container"}
          description={isDeveloperMode 
            ? "Current sales data across all containers and supermarkets" 
            : "Current sales data for your container"}
          onToggle={() => toggleSection('sales')}
          isExpanded={expandedSection === 'sales'}
          summary={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Avg. Price</div>
                <div className="text-xl font-bold">IDR 55,000/kg</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Total Sales</div>
                <div className="text-xl font-bold">{isDeveloperMode ? "1,250" : "375"} kg/month</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Supermarkets</div>
                <div className="text-xl font-bold">{isDeveloperMode ? "10" : "1"} clients</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Customers</div>
                <div className="text-xl font-bold">{isDeveloperMode ? "215" : "42"} recurring</div>
              </div>
            </div>
          }
        >
          <div className="grid gap-6">
            {isDeveloperMode ? (
              // For admin/developer: Show all containers sales
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {containerSalesData.slice(0, 4).map((salesData) => (
                  <SalesStatusCard key={salesData.id} data={salesData} />
                ))}
              </div>
            ) : (
              // For clients: Show only their container sales
              userContainers.length > 0 && (
                <SalesStatusCard data={userContainers[0]} />
              )
            )}

            {isDeveloperMode && (
              <AppleButton variant="outline" onClick={() => navigate('/analytics')}>
                View All Sales Data
              </AppleButton>
            )}
          </div>
        </SectionCard>
        
        {/* Client specific container data if not in developer mode */}
        {!isDeveloperMode && userContainers.length > 0 && (
          <SectionCard
            title="Your Container Performance"
            description="Current performance data for your container farm"
            onToggle={() => toggleSection('performance')}
            isExpanded={expandedSection === 'performance'}
            summary={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Harvest Status</div>
                  <div className="text-xl font-bold">On Schedule</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Efficiency Rating</div>
                  <div className="text-xl font-bold">92%</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Next Maintenance</div>
                  <div className="text-xl font-bold">14 days</div>
                </div>
              </div>
            }
          >
            <ContainerPerformanceSection containerName={userContainers[0].containerName} />
          </SectionCard>
        )}
        
        {/* Container Upgrade Section */}
        <SectionCard
          title="Container Farm Upgrades"
          description="Available container farm upgrades and capacity options"
          onToggle={() => toggleSection('upgrade')}
          isExpanded={expandedSection === 'upgrade'}
          summary={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Available Upgrades</div>
                <div className="text-xl font-bold">3 options</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Current Capacity</div>
                <div className="text-xl font-bold">75%</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Expansion Cost</div>
                <div className="text-xl font-bold">IDR 45M+</div>
              </div>
            </div>
          }
        >
          <ContainerUpgrade />
        </SectionCard>
        
        {/* Tokenization Section */}
        <SectionCard
          title="Tokenization Overview"
          description="ERC-20 tokens on Polygon representing your farm produce"
          onToggle={() => toggleSection('tokenization')}
          isExpanded={expandedSection === 'tokenization'}
          onFullView={() => navigate('/tokenization')}
          summary={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Total Token Value</div>
                <div className="text-xl font-bold">IDR {tokenizationData.totalValue.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Active Contracts</div>
                <div className="text-xl font-bold">{tokenizationData.activeContracts}</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Avg. Return Rate</div>
                <div className="text-xl font-bold">{tokenizationData.averageReturn}%</div>
              </div>
            </div>
          }
        >
          <TokenizationOverview tokenData={tokenizationData} />
        </SectionCard>

        {/* Security Monitoring - Only for Developer/Admin */}
        {isDeveloperMode && (
          <SectionCard
            title="Security Monitoring"
            description="Track and manage security events across the platform"
            onToggle={() => toggleSection('security')}
            isExpanded={expandedSection === 'security'}
            summary={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Security Status</div>
                  <div className="text-xl font-bold text-green-500">Active</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Suspicious Activities</div>
                  <div className="text-xl font-bold">{suspiciousActivities.length}</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">System Integrity</div>
                  <div className="text-xl font-bold">98%</div>
                </div>
              </div>
            }
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Suspicious Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                {suspiciousActivities.length > 0 ? (
                  <div className="space-y-4">
                    {suspiciousActivities.map((activity) => (
                      <div key={activity.id} className="p-3 border rounded-lg bg-red-50 border-red-200">
                        <div className="flex justify-between">
                          <div className="font-medium text-red-700">{activity.action}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm mt-1">IP: {activity.ipAddress}</div>
                        {activity.username && (
                          <div className="text-sm">Username: {activity.username}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 text-gray-500">
                    No suspicious activities detected.
                  </div>
                )}
              </CardContent>
            </Card>
          </SectionCard>
        )}

        {/* Developer Only Section */}
        {isDeveloperMode && <DeveloperInfoCard />}
      </div>

      {/* Login Dialog - will only show if triggered by state */}
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        onLogin={handleLoginSubmit}
      />
    </>
  );
};

export default Dashboard;
