
import React from "react";
import { ChallengesCard } from "@/components/home/indonesia-impact/ChallengesCard";
import { StatsGrid } from "@/components/home/indonesia-impact/StatsGrid";
import { ImpactLocations } from "@/components/home/indonesia-impact/ImpactLocations";

export const IndonesiaImpactSection: React.FC = () => {
  return (
    <section id="indonesia" className="bg-gradient-to-br from-primary/5 to-primary/20 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Impact in Indonesia</h2>
          <p className="text-gray-600 dark:text-gray-400">
            AKAR's container farming technology is uniquely positioned to address Indonesia's agricultural challenges 
            and support sustainable development across the archipelago.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ChallengesCard />
          <StatsGrid />
        </div>
        
        <ImpactLocations />
      </div>
    </section>
  );
};
