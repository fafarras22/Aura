
import React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedProjectTypes } from "./AnimatedProjectTypes";
import { ArrowRight, Wallet, LineChart, BarChart4 } from "lucide-react";

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
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-display">
          AKAR Farm
        </h1>
        
        <div className="flex items-center gap-2 my-3">
          <AnimatedProjectTypes 
            baseText={title}
            projectTypes={farmTypes}
            interval={3000}
            className="text-2xl sm:text-3xl font-display"
          />
        </div>
        
        <p className="text-lg text-muted-foreground md:pr-6 leading-relaxed">
          {subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <Button onClick={onExploreClick} size="lg" className="gap-2 h-14 text-base font-medium">
          {explore}
          <ArrowRight className="w-5 h-5" />
        </Button>
        <Button onClick={onLearnMoreClick} variant="outline" size="lg" className="shadow-sm gap-2 h-14 text-base font-medium">
          {learnMore}
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Asset-Backed Tokens</span>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
          <LineChart className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">12-20% Annual Yield</span>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
          <BarChart4 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Sustainable Impact</span>
        </div>
      </div>
    </div>
  );
};
