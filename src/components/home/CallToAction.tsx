
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface CallToActionProps {
  onExploreClick: () => void;
  onConnectWallet: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onExploreClick, onConnectWallet }) => {
  return (
    <section className="py-20 bg-primary/10 dark:bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <Badge variant="outline" className="px-3 py-1 text-sm bg-primary/20 text-primary border-primary/30 mb-4">
          Join 15,000+ Investors
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Fund the Future of ASEAN Agriculture?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Be part of the agricultural revolution while earning sustainable returns
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="default"
            onClick={onExploreClick}
            className="gap-2"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            onClick={onConnectWallet}
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </section>
  );
};
