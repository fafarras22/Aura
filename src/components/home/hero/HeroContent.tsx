
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, TrendingUp, ShieldCheck } from "lucide-react";
import { AnimatedProjectTypes } from "./AnimatedProjectTypes";

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
  const projectTypes = [
    "Container Farming",
    "Fishery",
    "Cattle",
    "Palm Oil",
    "Rice Fields",
    "Greenhouse"
  ];

  return (
    <div className="space-y-6 max-w-lg">
      <Badge variant="outline" className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/30">
        ASEAN Agriculture on Blockchain
      </Badge>
      
      <AnimatedProjectTypes 
        baseText={title}
        projectTypes={projectTypes}
      />
      
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        {subtitle}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="gap-2 group"
          onClick={onExploreClick}
        >
          {explore}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          onClick={onLearnMoreClick}
        >
          {learnMore}
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="flex flex-col items-center sm:items-start">
          <div className="text-2xl font-bold">12-20%</div>
          <div className="text-sm text-muted-foreground">Annual Yield</div>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <div className="text-2xl font-bold">24/7</div>
          <div className="text-sm text-muted-foreground">Monitoring</div>
        </div>
        <div className="flex flex-col items-center sm:items-start">
          <div className="text-2xl font-bold">100%</div>
          <div className="text-sm text-muted-foreground">Transparent</div>
        </div>
      </div>
      
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm">15,000+ Investors</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="text-sm">$25M+ Funded</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-sm">Fully Regulated</span>
        </div>
      </div>
    </div>
  );
};
