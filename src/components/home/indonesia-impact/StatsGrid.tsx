
import React from "react";

interface StatItemProps {
  value: string;
  description: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h4 className="text-4xl font-bold text-primary mb-2">{value}</h4>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export const StatsGrid: React.FC = () => {
  const stats = [
    {
      value: "70%",
      description: "Reduction in water usage compared to traditional farming in Indonesia"
    },
    {
      value: "5x",
      description: "More produce per square meter than conventional Indonesian farms"
    },
    {
      value: "24/7",
      description: "Monitoring with Indonesian-developed IoT technology"
    },
    {
      value: "12+",
      description: "Indonesian provinces where our containers are currently deployed"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <StatItem key={index} value={stat.value} description={stat.description} />
      ))}
    </div>
  );
};
