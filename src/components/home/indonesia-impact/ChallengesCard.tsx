
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

export const ChallengesCard: React.FC = () => {
  const challenges = [
    {
      icon: <MapPin className="text-primary w-6 h-6" />,
      title: "Archipelago Distribution",
      description: "Our container farms can be deployed across Indonesia's 17,000+ islands, bringing fresh produce to remote communities."
    },
    {
      icon: <SproutIcon className="text-primary w-6 h-6" />,
      title: "Tropical Climate Adaptation",
      description: "Our systems are specifically calibrated for Indonesia's tropical climate, ensuring optimal growing conditions year-round."
    },
    {
      icon: <LineChart className="text-primary w-6 h-6" />,
      title: "Urban Food Security",
      description: "As Indonesia's cities grow, our urban farming solutions help ensure food security and reduce transportation emissions."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
      <h3 className="text-2xl font-semibold mb-6 text-primary dark:text-primary">
        Addressing Indonesia's Unique Challenges
      </h3>
      
      <div className="space-y-6">
        {challenges.map((challenge, index) => (
          <ChallengeItem 
            key={index}
            icon={challenge.icon}
            title={challenge.title}
            description={challenge.description}
          />
        ))}
      </div>
    </div>
  );
};
