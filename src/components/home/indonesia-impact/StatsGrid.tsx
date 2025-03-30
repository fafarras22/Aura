
import React from "react";

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h4 className="text-4xl font-bold text-primary mb-2">{value}</h4>
      <p className="text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
};

interface StatsGridProps {
  stats: Array<{
    label: string;
    value: string;
  }>;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatItem key={index} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
};
