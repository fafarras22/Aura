
import React from 'react';
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertTriangle, FlaskConical, Zap, Box } from "lucide-react";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
      <StatCard 
        title="Harvests Ready" 
        value={upcomingHarvestsCount} 
        icon={FlaskConical} 
        color="blue" 
      />
      <StatCard 
        title="Container Farms" 
        value={containerCount} 
        icon={Box} 
        color="purple"
      />
    </div>
  );
};
