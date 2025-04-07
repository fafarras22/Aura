
import React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedProjectTypes } from "./AnimatedProjectTypes";

interface HeroContentProps {
  title: string;
  subtitle: string;
  farmTypes: string[];
  explore: string;
  learnMore: string;
  onExploreClick?: () => void;
  onLearnMoreClick?: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  title,
  subtitle,
  farmTypes,
  explore,
  learnMore,
  onExploreClick,
  onLearnMoreClick
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <AnimatedProjectTypes 
          baseText={title}
          projectTypes={farmTypes}
          interval={3000}
          className="mb-4"
        />
        <p className="text-lg text-muted-foreground md:pr-10 leading-relaxed">
          {subtitle}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button onClick={onExploreClick} size="lg" className="gap-2">
          {explore}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33337 8.00004H12.6667M12.6667 8.00004L8.00004 3.33337M12.6667 8.00004L8.00004 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        <Button onClick={onLearnMoreClick} variant="outline" size="lg" className="shadow-sm">
          {learnMore}
        </Button>
      </div>
    </div>
  );
};
