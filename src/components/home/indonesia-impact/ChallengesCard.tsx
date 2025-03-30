
import React from "react";
import { MapPin, SproutIcon, LineChart } from "lucide-react";

interface ChallengeItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ChallengeItem: React.FC<ChallengeItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-medium mb-1 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

interface ChallengesCardProps {
  title: string;
  challenges: string[];
  isPositive?: boolean;
}

export const ChallengesCard: React.FC<ChallengesCardProps> = ({ title, challenges, isPositive = false }) => {
  const baseIconClass = isPositive ? "text-green-600" : "text-primary";
  const icons = [
    <MapPin className={`${baseIconClass} w-6 h-6`} key="map" />,
    <SproutIcon className={`${baseIconClass} w-6 h-6`} key="sprout" />,
    <LineChart className={`${baseIconClass} w-6 h-6`} key="chart" />
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
      <h3 className="text-2xl font-semibold mb-6 text-primary dark:text-primary">
        {title}
      </h3>
      
      <div className="space-y-6">
        {challenges.map((challenge, index) => (
          <ChallengeItem 
            key={index}
            icon={icons[index % icons.length]}
            title={`${isPositive ? "Solution" : "Challenge"} ${index + 1}`}
            description={challenge}
          />
        ))}
      </div>
    </div>
  );
};
