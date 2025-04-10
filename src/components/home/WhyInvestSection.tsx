
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, TrendingUp, Users, Shield, Leaf, Wallet } from "lucide-react";

export const WhyInvestSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-display">Why Invest in ASEAN Agriculture?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Agricultural investments provide unique advantages that combine financial returns with real-world impact
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-t-4 border-t-primary hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-display">Real Asset Backing</h3>
              <p className="text-muted-foreground">
                Each project is backed by tangible agricultural assets including land, equipment, and produce, providing stability to your investment.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-primary hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-display">Consistent Returns</h3>
              <p className="text-muted-foreground">
                Agricultural projects deliver predictable yields from 12-20% annually, with income directly tied to ongoing harvests and produce sales.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-primary hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-display">Community Impact</h3>
              <p className="text-muted-foreground">
                Your investments create jobs, support rural economies, and promote sustainable farming practices across Southeast Asia.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <Card className="border hover:shadow-md transition-all bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-display">$AKR Token Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Leaf className="h-4 w-4 text-primary mt-1" />
                      <span>Direct ownership in agricultural assets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="h-4 w-4 text-primary mt-1" />
                      <span>Staking rewards from farm production</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="h-4 w-4 text-primary mt-1" />
                      <span>Governance rights in farm management decisions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border hover:shadow-md transition-all bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-display">AKAR Ecosystem Advantages</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Leaf className="h-4 w-4 text-primary mt-1" />
                      <span>Blockchain transparency for all farm operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="h-4 w-4 text-primary mt-1" />
                      <span>Real-time farm monitoring via IoT sensors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Leaf className="h-4 w-4 text-primary mt-1" />
                      <span>Fractional ownership with low minimum investment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
