
import React from "react";
import { Tractor, Users, DollarSign } from "lucide-react";

export const AseanImpact = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">ASEAN Agricultural Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AKAR is helping transform farming across Indonesia, Thailand, Vietnam, Malaysia, and the Philippines
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Tractor className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Sustainable Farming</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Our projects implement sustainable farming practices that reduce water usage by up to 90% compared to traditional methods.
            </p>
            <div className="mt-auto pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Impact:</span>
                <span className="text-sm font-bold text-primary">2.3M Tons CO2 Saved</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Local Employment</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              AKAR projects have created over 15,000 jobs across rural communities in Indonesia, Thailand, and Vietnam.
            </p>
            <div className="mt-auto pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Impact:</span>
                <span className="text-sm font-bold text-primary">15,300+ Jobs Created</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Economic Growth</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Our platform has helped fund over $25M in agricultural projects, increasing farmer income by an average of 35%.
            </p>
            <div className="mt-auto pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Impact:</span>
                <span className="text-sm font-bold text-primary">$25M+ Invested</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
