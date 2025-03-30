
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-md transition-all">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
