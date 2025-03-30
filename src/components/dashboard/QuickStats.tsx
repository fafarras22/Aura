
import React from 'react';
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertTriangle, FlaskConical, Zap, Box } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

interface QuickStatsProps {
  criticalAlertsCount: number;
  upcomingHarvestsCount: number;
  containerCount: number;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ 
  criticalAlertsCount, 
  upcomingHarvestsCount,
  containerCount
}) => {
  const isMobile = useMobile();
  
  return (
    <div className={`grid gap-5 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
      <StatCard 
        title="System Status" 
        value="Operational" 
        icon={Zap} 
        color="green" 
      />
      <StatCard 
        title="Critical Alerts" 
        value={criticalAlertsCount} 
        icon={AlertTriangle} 
        color="red" 
      />
      {/* On mobile, we'll prioritize these two cards above */}
      
      {/* For mobile, we can conditionally render the less critical stats */}
      {(!isMobile || containerCount > 5) && (
        <StatCard 
          title="Harvests Ready" 
          value={upcomingHarvestsCount} 
          icon={FlaskConical} 
          color="blue" 
        />
      )}
      {(!isMobile || criticalAlertsCount > 0) && (
        <StatCard 
          title="Container Farms" 
          value={containerCount} 
          icon={Box} 
          color="purple"
        />
      )}
    </div>
  );
};
