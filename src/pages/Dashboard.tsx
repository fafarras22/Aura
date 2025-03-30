
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SensorCard } from "@/components/dashboard/SensorCard";
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
import { Thermometer, Droplet, Wind, Zap, FlaskConical, Waves, AlertCircle, Droplets, ArrowRight } from "lucide-react";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const sensorData = getMockSensorData();
  const alerts = getMockAlerts();
  const harvests = getMockHarvests();
  const containerSalesData = getMockContainerSalesData();
  const farmLocations = getMockFarmLocations();
  const tokenizationData = getMockTokenizationData();

  // Get upcoming harvests (status === 'ready')
  const upcomingHarvests = harvests.filter(harvest => harvest.status === 'ready');
  
  // Filter for critical alerts
  const criticalAlerts = alerts.filter(alert => alert.type === 'error' && !alert.isRead);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">AKAR Farm Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Zap className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">System Status</p>
                <h4 className="text-2xl font-bold text-akar-green">Operational</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <h4 className="text-2xl font-bold">{criticalAlerts.length}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <FlaskConical className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Harvests Ready</p>
                <h4 className="text-2xl font-bold">{upcomingHarvests.length}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <ArrowRight className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Container Farms</p>
                <h4 className="text-2xl font-bold">{farmLocations.length}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Container Upgrade Section - Summary */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Container Farm Upgrades</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => toggleSection('upgrade')}>
              {expandedSection === 'upgrade' ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
          <CardDescription>Available container farm upgrades and capacity options</CardDescription>
        </CardHeader>
        {expandedSection === 'upgrade' && (
          <CardContent>
            <ContainerUpgrade />
          </CardContent>
        )}
      </Card>
      
      {/* Tokenization Section - Summary */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Tokenization Overview</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleSection('tokenization')}>
                {expandedSection === 'tokenization' ? 'Hide Details' : 'Show Details'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/tokenization')}>
                Full View
              </Button>
            </div>
          </div>
          <CardDescription>ERC-20 tokens on Polygon representing your farm produce</CardDescription>
        </CardHeader>
        {expandedSection === 'tokenization' ? (
          <CardContent>
            <TokenizationOverview tokenData={tokenizationData} />
          </CardContent>
        ) : (
          <CardContent className="pt-0">
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
          </CardContent>
        )}
      </Card>
      
      {/* Sales Status - Summary */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Sales Status</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => toggleSection('sales')}>
              {expandedSection === 'sales' ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
          <CardDescription>Current sales data across supermarkets and recurring customers</CardDescription>
        </CardHeader>
        {expandedSection === 'sales' ? (
          <CardContent>
            <div className="grid gap-6">
              {containerSalesData.slice(0, 1).map((salesData) => (
                <div key={salesData.id}>
                  <div className="mb-4">
                    <Badge className="mb-1">{salesData.containerName}</Badge>
                    <h3 className="text-lg font-semibold">{salesData.productName}</h3>
                    <p className="text-muted-foreground">{salesData.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Current Price</div>
                      <div className="text-xl font-bold">IDR {salesData.currentPrice.toLocaleString()}/kg</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Monthly Sales</div>
                      <div className="text-xl font-bold">{salesData.monthlySales} kg</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Supermarket Clients</div>
                      <div className="text-xl font-bold">{salesData.supermarketClients}</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Recurring Customers</div>
                      <div className="text-xl font-bold">{salesData.recurringCustomers}</div>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline">View All Sales Data</Button>
            </div>
          </CardContent>
        ) : (
          <CardContent className="pt-0">
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
          </CardContent>
        )}
      </Card>
      
      {/* Sensor Readings - Summary */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Sensor Readings</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleSection('sensors')}>
                {expandedSection === 'sensors' ? 'Hide Details' : 'Show Details'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/sensors')}>
                Full View
              </Button>
            </div>
          </div>
          <CardDescription>Live readings from all container farm sensors</CardDescription>
        </CardHeader>
        {expandedSection === 'sensors' ? (
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sensorData.slice(0, 8).map((sensor) => (
                <SensorCard
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
          </CardContent>
        ) : (
          <CardContent className="pt-0">
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
          </CardContent>
        )}
      </Card>

      {/* Developer Only Section - kept same */}
      {isDeveloperMode && (
        <Card className="border-dashed border-2 border-yellow-300">
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
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
