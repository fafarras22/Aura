
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, TrendingUp, Users } from "lucide-react";

export const WhyInvestSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Invest in ASEAN Agriculture?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Agricultural investments provide unique advantages that combine financial returns with real-world impact
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-t-4 border-t-primary">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real Asset Backing</h3>
              <p className="text-muted-foreground">
                Each project is backed by tangible agricultural assets including land, equipment, and produce, providing stability to your investment.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-primary">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Consistent Returns</h3>
              <p className="text-muted-foreground">
                Agricultural projects deliver predictable yields from 12-20% annually, with income directly tied to ongoing harvests and produce sales.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-primary">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Impact</h3>
              <p className="text-muted-foreground">
                Your investments create jobs, support rural economies, and promote sustainable farming practices across Southeast Asia.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
