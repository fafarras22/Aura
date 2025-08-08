
import React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedProjectTypes } from "./AnimatedProjectTypes";
import { ArrowRight, Wallet, LineChart, BarChart4 } from "lucide-react";
import { useTokenPrice } from "@/hooks/useTokenPrice";
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
  const { price, change24h, loading } = useTokenPrice('UMBI');
  const changePositive = change24h >= 0;
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 my-3">
          <AnimatedProjectTypes 
            baseText={title}
            projectTypes={farmTypes}
            interval={3000}
            className="text-2xl sm:text-3xl font-display"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary">
            UMBI ${price.toFixed(2)}
            <span className={changePositive ? "ml-2 text-green-600" : "ml-2 text-red-600"}>
              {changePositive ? '+' : ''}{change24h.toFixed(2)}%
            </span>
          </span>
          <Button size="sm" className="h-9" onClick={() => (window.location.href = "/token-purchase")}>Buy $UMBI</Button>
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
