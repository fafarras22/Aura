
import React from 'react';
import { SectionCard } from "@/components/dashboard/SectionCard";
import { TokenizationOverview } from "@/components/dashboard/TokenizationOverview";
import { FarmLocationsOverview } from "@/components/dashboard/FarmLocationsOverview";
import { FarmLocation } from "@/services/mockDataService";
import { useDeveloperMode } from "@/context/DeveloperModeContext";

interface DashboardSidebarProps {
  isDeveloperMode: boolean;
  expandedSections: {
    sensors: boolean;
    sales: boolean;
    tokenization: boolean;
    locations: boolean;
  };
  toggleSection: (section: string) => void;
  farmLocations: FarmLocation[];
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isDeveloperMode,
  expandedSections,
  toggleSection,
  farmLocations,
}) => {
  const { getContainerData } = useDeveloperMode();
  const tokenData = {
    totalValue: 125000000,
    totalTokens: 12500,
    activeContracts: 3,
    totalInvestors: 18,
    averageReturn: 12.5,
    recentActivities: [
      {
        id: "token-act-1",
        type: "invested",
        description: "New investment",
        tokenAmount: 500,
        date: new Date().toLocaleDateString(),
        transactionHash: "0x1234567890abcdef"
      },
      {
        id: "token-act-2",
        type: "harvested",
        description: "Harvest yield distributed",
        tokenAmount: 250,
        date: new Date().toLocaleDateString(),
        transactionHash: "0x0987654321fedcba"
      }
    ],
    tokenBalance: 5000,
    tokenPrice: 10000,
    tokenChange: 2.5,
    tokenChangeType: "increase" as const,
    tokenHolders: [],
    investments: [],
    recentTransactions: [],
    tokenAllocation: [],
    investmentPerformance: [],
    contractDuration: 12
  };

  return (
    <div className="space-y-6">
      <TokenizationOverview tokenData={tokenData} />
      
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
