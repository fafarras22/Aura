
import React from "react";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { DeveloperModeAlert } from "@/components/dashboard/DeveloperModeAlert";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { 
  FarmLocation, 
  ContainerSalesData, 
  TokenizationData,
  WaterData,
  ClimateData
} from "@/services/mockDataService";

interface DashboardContentProps {
  isDeveloperMode: boolean;
  criticalAlertsCount: number;
  upcomingHarvestsCount: number;
  containerCount: number;
  expandedSections: {
    sensors: boolean;
    sales: boolean;
    tokenization: boolean;
    locations: boolean;
    climate?: boolean;
    water?: boolean;
  };
  toggleSection: (section: string) => void;
  salesData: ContainerSalesData;
  tokenData: TokenizationData;
  farmLocations: FarmLocation[];
  waterData?: WaterData;
  climateData?: ClimateData;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  isDeveloperMode,
  criticalAlertsCount,
  upcomingHarvestsCount,
  containerCount,
  expandedSections,
  toggleSection,
  salesData,
  tokenData,
  farmLocations,
  waterData,
  climateData
}) => {
  return (
    <div className="space-y-6">
      <DeveloperModeAlert isDeveloperMode={isDeveloperMode} />
      
      <QuickStats 
        criticalAlertsCount={criticalAlertsCount}
        upcomingHarvestsCount={upcomingHarvestsCount}
        containerCount={isDeveloperMode ? containerCount : 1}
      />
      
      <DashboardGrid 
        isDeveloperMode={isDeveloperMode}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        salesData={salesData}
        farmLocations={farmLocations}
        waterData={waterData}
        climateData={climateData}
        tokenData={tokenData}
      />
    </div>
  );
};
