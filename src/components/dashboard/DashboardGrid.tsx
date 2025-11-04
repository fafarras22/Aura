
import React from 'react';
import { SectionCard } from "@/components/dashboard/SectionCard";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { FarmLocationsOverview } from "@/components/dashboard/FarmLocationsOverview";
import { SalesStatusCard } from "@/components/dashboard/SalesStatusCard";
import { ContainerManagement } from "@/components/dashboard/ContainerManagement";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { WaterMonitoringCard } from "@/components/dashboard/WaterMonitoringCard";
import { ClimateMonitoringCard } from "@/components/dashboard/ClimateMonitoringCard";
import { Thermometer, Droplet, Wind, Activity, Leaf, Cloud } from "lucide-react";
import { 
  FarmLocation, 
  ContainerSalesData,
  WaterData,
  ClimateData,
  TokenizationData
} from "@/services/mockDataService";

interface DashboardGridProps {
  isDeveloperMode: boolean;
  expandedSections: {
    sensors: boolean;
    sales: boolean;
    locations: boolean;
    climate?: boolean;
    water?: boolean;
  };
  toggleSection: (section: string) => void;
  salesData: ContainerSalesData;
  farmLocations: FarmLocation[];
  waterData?: WaterData;
  climateData?: ClimateData;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  isDeveloperMode,
  expandedSections,
  toggleSection,
  salesData,
  farmLocations,
  waterData,
  climateData
}) => {
  return (
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
              name="Temperature" 
              value={climateData?.temperature || 25.3} 
              unit="°C" 
              icon={<Thermometer className="w-5 h-5" />}
              status="normal"
              progress={65}
              minValue={15}
              maxValue={35}
            />
            <SensorCard 
              name="Humidity" 
              value={climateData?.humidity || 64} 
              unit="%" 
              icon={<Droplet className="w-5 h-5" />}
              status="normal"
              progress={64}
              minValue={0}
              maxValue={100}
            />
            <SensorCard 
              name="CO2 Level" 
              value={climateData?.co2Level || 415} 
              unit="ppm" 
              icon={<Wind className="w-5 h-5" />}
              status="normal"
              progress={41.5}
              minValue={0}
              maxValue={1000}
            />
            <SensorCard 
              name="Water pH" 
              value={waterData?.ph || 6.2} 
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
        
        {/* Water Monitoring Section */}
        {waterData && (
          <SectionCard 
            title="Water System Monitoring"
            onToggle={() => toggleSection('water')}
            isExpanded={expandedSections.water}
            summary={<div className="text-sm text-muted-foreground">Water quality and system parameters</div>}
          >
            <WaterMonitoringCard waterData={waterData} />
          </SectionCard>
        )}
        
        {/* Climate Monitoring Section */}
        {climateData && (
          <SectionCard 
            title="Climate Control"
            onToggle={() => toggleSection('climate')}
            isExpanded={expandedSections.climate}
            summary={<div className="text-sm text-muted-foreground">Climate and environment conditions</div>}
          >
            <ClimateMonitoringCard climateData={climateData} />
          </SectionCard>
        )}
        
        <SectionCard 
          title="Sales Status"
          onToggle={() => toggleSection('sales')}
          isExpanded={expandedSections.sales}
          summary={<div className="text-sm text-muted-foreground">Total sales: {salesData.totalSales} units</div>}
        >
          <div className="grid grid-cols-1 gap-4">
            <SalesStatusCard data={salesData} />
          </div>
        </SectionCard>
      </div>
      
        <DashboardSidebar 
          isDeveloperMode={isDeveloperMode}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          farmLocations={farmLocations}
        />
    </div>
  );
}
