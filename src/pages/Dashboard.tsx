
import React, { useState, useEffect } from "react";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { AppleSensorCard } from "@/components/dashboard/AppleSensorCard";
import { StatCard } from "@/components/dashboard/StatCard";
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
import { Thermometer, Droplet, Wind, Zap, FlaskConical, Waves, AlertCircle, Droplets, ArrowRight, Lock } from "lucide-react";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { AppleButton } from "@/components/ui/apple-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmLocationsOverview } from "@/components/dashboard/FarmLocationsOverview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";

const Dashboard = () => {
  const { isDeveloperMode, loginAsAdmin, isAdminLoggedIn, currentUser, login } = useDeveloperMode();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<'admin' | 'user'>('user');
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
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
  const clientSpecificContainers = isDeveloperMode ? containerSalesData : 
    containerSalesData.filter(data => data.id === clientContainerId);

  // Map icon name to icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'thermometer': return <Thermometer className="w-5 h-5" />;
      case 'droplet': return <Droplet className="w-5 h-5" />;
      case 'droplets': return <Droplets className="w-5 h-5" />;
      case 'wind': return <Wind className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'flask-conical': return <FlaskConical className="w-5 h-5" />;
      case 'waves': return <Waves className="w-5 h-5" />;
      case 'alert-circle': return <AlertCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleLogin = () => {
    let success = false;
    
    if (loginType === 'admin') {
      success = loginAsAdmin(password);
    } else {
      success = login(username, password);
    }
    
    if (success) {
      setShowLoginDialog(false);
      // Reset the form
      setUsername("");
      setPassword("");
    }
  };

  const handleLoginTypeChange = (type: 'admin' | 'user') => {
    setLoginType(type);
    // Reset form when switching login types
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        {/* Welcome message showing current user */}
        {currentUser && (
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Welcome, {currentUser.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {currentUser.role === 'admin' ? 'Administrator Access' : 'Client Access'}
                </p>
              </div>
              {currentUser.role === 'admin' && (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  Developer Mode Active
                </Badge>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard 
            title="System Status" 
            value="Operational" 
            icon={Zap} 
            color="green" 
          />
          <StatCard 
            title="Critical Alerts" 
            value={criticalAlerts.length} 
            icon={AlertCircle} 
            color="red" 
          />
          <StatCard 
            title="Harvests Ready" 
            value={upcomingHarvests.length} 
            icon={FlaskConical} 
            color="blue" 
          />
          <StatCard 
            title="Container Farms" 
            value={isDeveloperMode ? farmLocations.length : clientSpecificContainers.length} 
            icon={ArrowRight} 
            color="purple"
          />
        </div>
        
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
                <div className="text-xl font-bold">{isDeveloperMode ? farmLocations.length : clientSpecificContainers.length} units</div>
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
          <FarmLocationsOverview farmLocations={isDeveloperMode ? farmLocations : farmLocations.filter(loc => loc.id === clientContainerId)} />
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
                    <Badge variant={sensor.status === 'warning' ? 'outline' : 'destructive'} className="text-xs">
                      {sensor.status.toUpperCase()}
                    </Badge>
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
        
        {/* Sales Status - Only for Developer Mode */}
        {isDeveloperMode && (
          <SectionCard
            title="Sales Status"
            description="Current sales data across all supermarkets and recurring customers"
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
                  <div className="text-xl font-bold">1,250 kg/month</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Supermarkets</div>
                  <div className="text-xl font-bold">10 clients</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Customers</div>
                  <div className="text-xl font-bold">215 recurring</div>
                </div>
              </div>
            }
          >
            <div className="grid gap-6">
              {containerSalesData.slice(0, 1).map((salesData) => (
                <div key={salesData.id}>
                  <div className="mb-4">
                    <Badge className="mb-1">{salesData.containerName}</Badge>
                    <h3 className="text-lg font-semibold">{salesData.containerName} Produce</h3>
                    <p className="text-muted-foreground">{salesData.supermarketClient?.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Current Price</div>
                      <div className="text-xl font-bold">IDR {salesData.priceRange?.max.toLocaleString()}/kg</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Monthly Sales</div>
                      <div className="text-xl font-bold">{salesData.totalSales} kg</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Supermarket Clients</div>
                      <div className="text-xl font-bold">1</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Recurring Customers</div>
                      <div className="text-xl font-bold">{salesData.recurringCustomers?.length}</div>
                    </div>
                  </div>
                </div>
              ))}

              <AppleButton variant="outline" onClick={() => navigate('/analytics')}>View All Sales Data</AppleButton>
            </div>
          </SectionCard>
        )}
        
        {/* Client specific container data if not in developer mode */}
        {!isDeveloperMode && clientSpecificContainers.length > 0 && (
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Container Farm: {clientSpecificContainers[0].containerName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium mb-2">Current Crops</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Lettuce</span>
                      <span>70% Ready</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Kale</span>
                      <span>45% Ready</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Spinach</span>
                      <span>90% Ready</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-2">Resource Usage</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Water</span>
                      <span>32L/day</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Electricity</span>
                      <span>14kWh/day</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Nutrients</span>
                      <span>0.8kg/day</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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

        {/* Developer Only Section */}
        {isDeveloperMode && (
          <Card className="border-dashed border-2 border-yellow-300 rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle>Developer Information</CardTitle>
              <CardDescription>Additional information for AKAR technicians</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">System Uptime:</div>
                  <div>124 days, 7 hours, 32 minutes</div>
                  <div className="font-medium">Last Maintenance:</div>
                  <div>2023-06-15</div>
                  <div className="font-medium">Next Scheduled Maintenance:</div>
                  <div>2023-08-15</div>
                  <div className="font-medium">Container ID:</div>
                  <div>AKAR-40-001-JAK</div>
                  <div className="font-medium">Firmware Version:</div>
                  <div>v2.3.1</div>
                  <div className="font-medium">Security Status:</div>
                  <div className="flex items-center text-green-600">
                    <Lock className="w-4 h-4 mr-1" /> Secured
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login to Dashboard</DialogTitle>
            <DialogDescription>
              Please sign in to access your AKAR dashboard.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center space-x-4 mb-4">
            <Button 
              variant={loginType === 'user' ? "default" : "outline"} 
              onClick={() => handleLoginTypeChange('user')}
            >
              Client Login
            </Button>
            <Button 
              variant={loginType === 'admin' ? "default" : "outline"} 
              onClick={() => handleLoginTypeChange('admin')}
            >
              Admin Login
            </Button>
          </div>
          
          <div className="space-y-4 py-2">
            {loginType === 'user' ? (
              <>
                <div className="space-y-2">
                  <div className="text-sm mb-1">Username</div>
                  <Input 
                    placeholder="Enter your username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm mb-1">Password</div>
                  <Input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Try "Guest" with password "guest123" or "Muhammad Farras" with password "admin123"
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="text-sm mb-1">Admin Password</div>
                  <Input 
                    type="password" 
                    placeholder="Enter admin password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Try "akar@admin2023" for admin access
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={handleLogin}>Sign In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;
