
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroContentProps {
  title: string;
  subtitle: string;
  explore: string;
  learnMore: string;
  onExploreClick?: () => void;
  onLearnMoreClick?: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ 
  title, 
  subtitle, 
  explore, 
  learnMore,
  onExploreClick,
  onLearnMoreClick
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 leading-tight">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
        {subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          className="gap-2 px-6" 
          size="lg" 
          onClick={onExploreClick}
        >
          {explore} <ArrowRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          className="gap-2 px-6" 
          size="lg"
          onClick={onLearnMoreClick}
        >
          {learnMore}
        </Button>
      </div>
    </div>
  );
};
