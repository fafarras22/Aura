
import React, { useState } from "react";
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
import { Thermometer, Droplet, Wind, Zap, FlaskConical, Waves, AlertCircle, Droplets, ArrowRight } from "lucide-react";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { AppleButton } from "@/components/ui/apple-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
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
          value={farmLocations.length} 
          icon={ArrowRight} 
          color="purple"
        />
      </div>
      
      {/* Container Upgrade Section - Summary */}
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
      
      {/* Tokenization Section - Summary */}
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
      
      {/* Sales Status - Summary */}
      <SectionCard
        title="Sales Status"
        description="Current sales data across supermarkets and recurring customers"
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
                <p className="text-muted-foreground">{salesData.supermarketClient.location}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className="text-xl font-bold">IDR {salesData.priceRange.max.toLocaleString()}/kg</div>
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
                  <div className="text-xl font-bold">{salesData.recurringCustomers.length}</div>
                </div>
              </div>
            </div>
          ))}

          <AppleButton variant="outline">View All Sales Data</AppleButton>
        </div>
      </SectionCard>
      
      {/* Sensor Readings - Summary */}
      <SectionCard
        title="Sensor Readings"
        description="Live readings from all container farm sensors"
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

      {/* Developer Only Section - kept same */}
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
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
