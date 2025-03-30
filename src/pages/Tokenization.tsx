
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
          <p className="text-muted-foreground">Manage your ERC-20 tokens on Polygon PoC</p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300 flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500"></span> Polygon Network Connected
        </Badge>
      </div>

      {/* Investor community highlight for both mobile and desktop */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800">
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3">
            <Users className="h-5 w-5 text-green-700 dark:text-green-300" />
          </div>
          <div>
            <p className="font-medium">{tokenData.totalInvestors || 2500}+ Investors in AKR Ecosystem</p>
            <p className="text-sm text-muted-foreground">Join our community on Discord and Telegram for exclusive updates</p>
          </div>
          <div className="ml-auto space-x-2">
            <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open('https://discord.gg/akarfarm', '_blank')}>
              Discord
            </Button>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open('https://t.me/akarfarm', '_blank')}>
              Telegram
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Token Platform</CardTitle>
          <CardDescription>
            AKAR uses Polygon PoC (Proof of Concept) blockchain to tokenize farm produce, enabling fractional ownership and transparent value tracking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md mb-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Info className="h-5 w-5 text-amber-700" />
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
                  <span className="text-xs">Purchase</span>
                </TabsTrigger>
                <TabsTrigger value="overview" className="py-3 px-2 data-[state=active]:bg-primary rounded-md">
                  <span className="text-xs">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="investments" className="py-3 px-2 data-[state=active]:bg-primary rounded-md">
                  <span className="text-xs">Invest</span>
                </TabsTrigger>
                <TabsTrigger value="allocation" className="py-3 px-2 data-[state=active]:bg-primary rounded-md">
                  <span className="text-xs">Funds</span>
                </TabsTrigger>
                <TabsTrigger value="transactions" className="py-3 px-2 data-[state=active]:bg-primary rounded-md">
                  <span className="text-xs">Txns</span>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Tokenization;
