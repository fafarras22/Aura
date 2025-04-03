
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CreditCard, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InvestmentDisclaimer } from "@/components/home/InvestmentDisclaimer";

const TokenPurchase = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Get AKR Tokens</h1>
          <p className="text-xl text-muted-foreground mb-8">Choose your preferred method to acquire $AKR tokens</p>

          <Tabs defaultValue="direct" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="direct">Direct Purchase</TabsTrigger>
              <TabsTrigger value="exchange">Exchange</TabsTrigger>
            </TabsList>

            <TabsContent value="direct">
              <Card>
                <CardHeader>
                  <CardTitle>Direct Purchase</CardTitle>
                  <CardDescription>
                    Quickest way to start investing in agricultural projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    <Button 
                      size="lg" 
                      className="w-full gap-2"
                      onClick={() => navigate('/farm-projects')}
                    >
                      Browse Investment Opportunities
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exchange">
              <Card>
                <CardHeader>
                  <CardTitle>Exchange Purchase</CardTitle>
                  <CardDescription>
                    Buy $AKR tokens from supported exchanges
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => window.open('#', '_blank')}
                    >
                      <span>Binance</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => window.open('#', '_blank')}
                    >
                      <span>Uniswap</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => window.open('#', '_blank')}
                    >
                      <span>PancakeSwap</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <InvestmentDisclaimer />
        </div>
      </div>
    </div>
  );
};

export default TokenPurchase;
