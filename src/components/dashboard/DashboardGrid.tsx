
import React from 'react';
import { SectionCard } from "@/components/dashboard/SectionCard";
import { SensorCard } from "@/components/dashboard/SensorCard";
import { FarmLocationsOverview } from "@/components/dashboard/FarmLocationsOverview";
import { SalesStatusCard } from "@/components/dashboard/SalesStatusCard";
import { ContainerManagement } from "@/components/dashboard/ContainerManagement";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Thermometer, Droplet, Wind, Activity } from "lucide-react";
import { 
  FarmLocation, 
  ContainerSalesData 
} from "@/services/mockDataService";

interface DashboardGridProps {
  isDeveloperMode: boolean;
  expandedSections: {
    sensors: boolean;
    sales: boolean;
    tokenization: boolean;
    locations: boolean;
  };
  toggleSection: (section: string) => void;
  salesData: ContainerSalesData;
  farmLocations: FarmLocation[];
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  isDeveloperMode,
  expandedSections,
  toggleSection,
  salesData,
  farmLocations,
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
};
