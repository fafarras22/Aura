
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HowAkarWorksProps {
  onExploreClick: () => void;
}

export const HowAkarWorks: React.FC<HowAkarWorksProps> = ({ onExploreClick }) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How AKAR Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform makes investing in agriculture simple, transparent, and accessible
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-x-6">
          <div className="flex flex-col items-center text-center md:items-start md:text-left relative">
            <div className="absolute top-16 left-[calc(50%+1.5rem)] right-0 h-0.5 bg-primary/30 hidden md:block"></div>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 z-10">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Browse Projects</h3>
            <p className="text-muted-foreground max-w-xs">
              Explore our vetted selection of agricultural projects across ASEAN. Each project includes details about yield expectations, timelines, and sustainability practices.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center md:items-start md:text-left relative">
            <div className="absolute top-16 left-[calc(50%+1.5rem)] right-0 h-0.5 bg-primary/30 hidden md:block"></div>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 z-10">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Connect Arbitrum Wallet</h3>
            <p className="text-muted-foreground max-w-xs">
              Link your Web3 wallet to AKAR on Arbitrum network. We support MetaMask, WalletConnect, and other popular options for a seamless, cost-effective investing experience.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center md:items-start md:text-left relative">
            <div className="absolute top-16 left-[calc(50%+1.5rem)] right-0 h-0.5 bg-primary/30 hidden md:block"></div>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 z-10">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Fund with $AGRI</h3>
            <p className="text-muted-foreground max-w-xs">
              Invest any amount in projects that align with your goals. Your $AGRI tokens represent ownership in real agricultural assets with defined return profiles.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4">
              4
            </div>
            <h3 className="text-xl font-bold mb-2">Earn Returns</h3>
            <p className="text-muted-foreground max-w-xs">
              Receive regular yield distributions from your investments. All returns come from real agricultural production, transparently tracked on the Arbitrum blockchain.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            size="lg" 
            onClick={onExploreClick}
            className="gap-2"
          >
            Start Investing Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
