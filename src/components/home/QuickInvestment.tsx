
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CreditCard, Wallet, BadgeCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickInvestment = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-display">Start Investing Now</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred way to invest in sustainable agriculture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-2 hover:border-primary/40 transition-all hover:shadow-lg">
            <div className="absolute top-0 right-0 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-bl">
              Quickest Method
            </div>
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 font-display">
                <CreditCard className="h-5 w-5" />
                Direct Investment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Invest directly using credit card or bank transfer</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>We automatically convert your investment to $AKR tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Start earning returns immediately</span>
                </li>
              </ul>
              <Button 
                className="w-full gap-2 h-12 text-base" 
                onClick={() => navigate('/farm-projects')}
              >
                Browse Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/40 transition-all hover:shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 font-display">
                <Wallet className="h-5 w-5" />
                DEX/CEX Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Buy $AKR tokens on supported exchanges</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Access additional trading features</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Transfer tokens to your wallet for staking</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full gap-2 h-12 text-base"
                onClick={() => navigate('/tokenization')}
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
