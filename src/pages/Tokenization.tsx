
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenOverview } from '@/components/tokenization/TokenOverview';
import { TokenAllocation } from '@/components/tokenization/TokenAllocation';
import { TokenInvestments } from '@/components/tokenization/TokenInvestments';
import { TokenTransactions } from '@/components/tokenization/TokenTransactions';
import { TokenPurchase } from '@/components/tokenization/TokenPurchase';
import { TokenPurchaseModal } from '@/components/tokenization/TokenPurchaseModal';
import { getMockTokenizationData } from '@/services/mockDataService';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const Tokenization = () => {
  const { toast } = useToast();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  
  const tokenizationData = getMockTokenizationData();
  
  const handlePurchase = (tokenId: string) => {
    setSelectedToken(tokenId);
    setIsPurchaseModalOpen(true);
  };
  
  const handlePurchaseComplete = () => {
    setIsPurchaseModalOpen(false);
    toast({
      title: "Token Purchase Initiated",
      description: "Your purchase request has been submitted. Check your email for confirmation.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tokenization</h1>
          <p className="text-muted-foreground">
            Manage your farm produce tokens and investments
          </p>
        </div>
        <Button onClick={() => setIsPurchaseModalOpen(true)}>
          Purchase Tokens
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="purchase">Purchase</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <TokenOverview tokenData={tokenizationData} />
        </TabsContent>
        
        <TabsContent value="allocation">
          <TokenAllocation tokenData={tokenizationData} />
        </TabsContent>
        
        <TabsContent value="investments">
          <TokenInvestments tokenData={tokenizationData} />
        </TabsContent>
        
        <TabsContent value="transactions">
          <TokenTransactions tokenData={tokenizationData} />
        </TabsContent>
        
        <TabsContent value="purchase">
          <TokenPurchase onPurchase={handlePurchase} />
        </TabsContent>
      </Tabs>
      
      <TokenPurchaseModal 
        open={isPurchaseModalOpen}
        onOpenChange={setIsPurchaseModalOpen}
        onComplete={handlePurchaseComplete}
        tokenId={selectedToken}
      />
    </div>
  );
};

export default Tokenization;
