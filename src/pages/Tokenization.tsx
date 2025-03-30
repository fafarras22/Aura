
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TokenOverview } from "@/components/tokenization/TokenOverview";
import { TokenInvestments } from "@/components/tokenization/TokenInvestments";
import { TokenAllocation } from "@/components/tokenization/TokenAllocation";
import { TokenTransactions } from "@/components/tokenization/TokenTransactions";
import { TokenPurchase } from "@/components/tokenization/TokenPurchase";
import { getMockTokenizationData } from "@/services/mockDataService";
import { Badge } from "@/components/ui/badge";
import { Info, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Tokenization = () => {
  const [activeTab, setActiveTab] = useState("purchase");
  const tokenData = getMockTokenizationData();
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AKAR Tokenization</h1>
          <p className="text-muted-foreground">Manage your ERC-20 tokens on Polygon PoS</p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300 flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500"></span> Polygon Network Connected
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Token Platform</CardTitle>
          <CardDescription>
            AKAR uses Polygon PoS (Proof of Stake) blockchain to tokenize farm produce, enabling fractional ownership and transparent value tracking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md mb-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                <Info className="h-5 w-5 text-amber-700 dark:text-amber-300" />
              </div>
              <div>
                <h4 className="font-medium text-sm">What are AKAR Tokens?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  AKAR tokens (AKR) represent ownership shares in container farm produce. Each token is backed by real agricultural assets, with value derived from harvest yields.
                </p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {isMobile ? (
              <TabsList className="grid grid-cols-5 mb-6 h-auto p-1 bg-muted/80">
                <TabsTrigger value="purchase" className="py-3 px-2 data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-md">
                  <div className="flex flex-col items-center">
                    <span className="text-xs">Buy</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="overview" className="py-3 px-2 data-[state=active]:bg-primary rounded-md">
                  <div className="flex flex-col items-center">
                    <span className="text-xs">Stats</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="investments" className="py-3 px-2 data-[state=active]:bg-primary rounded-md">
                  <div className="flex flex-col items-center">
                    <span className="text-xs">Invest</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="allocation" className="py-3 px-2 data-[state=active]:bg-primary rounded-md">
                  <div className="flex flex-col items-center">
                    <span className="text-xs">Funds</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="transactions" className="py-3 px-2 data-[state=active]:bg-primary rounded-md">
                  <div className="flex flex-col items-center">
                    <span className="text-xs">Txns</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            ) : (
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="purchase">Purchase</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
                <TabsTrigger value="allocation">Fund Allocation</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
            )}
            <TabsContent value="purchase" className="mt-0">
              <TokenPurchase tokenData={tokenData} />
            </TabsContent>
            <TabsContent value="overview" className="mt-0">
              <TokenOverview tokenData={tokenData} />
            </TabsContent>
            <TabsContent value="investments" className="mt-0">
              <TokenInvestments tokenData={tokenData} />
            </TabsContent>
            <TabsContent value="allocation" className="mt-0">
              <TokenAllocation tokenData={tokenData} />
            </TabsContent>
            <TabsContent value="transactions" className="mt-0">
              <TokenTransactions tokenData={tokenData} />
            </TabsContent>
          </Tabs>
          
          {/* Polygon PoS explanation */}
          <div className="mt-10 p-4 border rounded-lg border-primary/20 bg-primary/5 dark:bg-primary/10">
            <h4 className="font-medium mb-2">About Polygon PoS (Proof of Stake)</h4>
            <p className="text-sm text-muted-foreground mb-3">
              AKAR leverages Polygon's Proof of Stake (PoS) network to provide efficient, low-cost blockchain transactions while maintaining security. 
              This scaling solution enables us to offer tokenized agricultural investments with minimal gas fees and rapid transaction finality.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>99% Lower Carbon Footprint vs PoW</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span>~2 Second Block Time</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                <span>Low Gas Fees</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                <span>EVM Compatible</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tokenization;
