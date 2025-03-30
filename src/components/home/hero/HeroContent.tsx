
import React from "react";
import { AppleButton } from "@/components/ui/apple-button";

interface HeroContentProps {
  title: string;
  subtitle: string;
  explore: string;
  learnMore: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ 
  title, subtitle, explore, learnMore 
}) => {
  return (
    <div className="hero-content">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        {subtitle}
      </p>
      <div className="flex flex-wrap gap-4">
        <AppleButton 
          variant="green" 
          className="px-8 py-3"
          aria-label={explore}
        >
          {explore}
        </AppleButton>
        <AppleButton 
          variant="secondary" 
          className="px-8 py-3"
          aria-label={learnMore}
        >
          {learnMore}
        </AppleButton>
      </div>
    </div>
  );
};
