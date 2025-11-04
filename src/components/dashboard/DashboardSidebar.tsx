
import React from 'react';
import { SectionCard } from "@/components/dashboard/SectionCard";
import { FarmLocationsOverview } from "@/components/dashboard/FarmLocationsOverview";
import { FarmLocation } from "@/services/mockDataService";
import { useDeveloperMode } from "@/context/DeveloperModeContext";

interface DashboardSidebarProps {
  isDeveloperMode: boolean;
  expandedSections: {
    sensors: boolean;
    sales: boolean;
    locations: boolean;
    climate?: boolean;
    water?: boolean;
  };
  toggleSection: (section: string) => void;
  farmLocations: FarmLocation[];
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isDeveloperMode,
  expandedSections,
  toggleSection,
  farmLocations
}) => {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Container Locations"
        onToggle={() => toggleSection('locations')}
        isExpanded={expandedSections.locations}
        summary={
          <div className="text-sm text-muted-foreground">
            {isDeveloperMode 
              ? `${farmLocations.length} farm locations` 
              : 'Your container locations'}
          </div>
        }
      >
        <FarmLocationsOverview farmLocations={farmLocations} />
      </SectionCard>
    </div>
  );
};
