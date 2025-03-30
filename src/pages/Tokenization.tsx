import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenOverview } from '@/components/tokenization/TokenOverview';
import { TokenAllocation } from '@/components/tokenization/TokenAllocation';
import TokenInvestments from '@/components/tokenization/TokenInvestments';
import { TokenTransactions } from '@/components/tokenization/TokenTransactions';
import { TokenPurchase } from '@/components/tokenization/TokenPurchase';
import { TokenPurchaseModal } from '@/components/tokenization/TokenPurchaseModal';
import { SalesDetailsCard } from '@/components/dashboard/SalesDetailsCard';
import { getMockTokenizationData } from '@/services/mockDataService';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useDeveloperMode } from '@/context/DeveloperModeContext';
import { Lock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Tokenization = () => {
  const { toast } = useToast();
  const { isDeveloperMode, currentUser } = useDeveloperMode();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  
  const tokenizationData = getMockTokenizationData();
  
  const handlePurchase = (tokenId: string) => {
    if (isDeveloperMode) {
      toast({
        title: "Access Denied",
        description: "Token purchases are not allowed in Developer mode",
        variant: "destructive"
      });
      return;
    }
    
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
          <h1 className="text-2xl font-bold tracking-tight">Tokenization</h1>
          <p className="text-sm text-muted-foreground">
            Manage your farm produce tokens and investments
          </p>
        </div>
        {!isDeveloperMode && (
          <Button onClick={() => setIsPurchaseModalOpen(true)}>
            Purchase Tokens
          </Button>
        )}
      </div>
      
      {isDeveloperMode && (
        <Alert variant="default" className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900 dark:text-amber-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-sm font-medium">Developer Mode Active</AlertTitle>
          <AlertDescription className="text-xs">
            You are viewing all tokenization data across all containers. Token purchases are disabled in Developer mode.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-6 text-xs">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          {!isDeveloperMode && <TabsTrigger value="purchase">Purchase</TabsTrigger>}
          <TabsTrigger value="sales">Sales Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <TokenOverview tokenData={tokenizationData} />
        </TabsContent>
        
        <TabsContent value="allocation">
          <TokenAllocation tokenData={tokenizationData} />
        </TabsContent>
        
        <TabsContent value="investments">
          <TokenInvestments isDeveloperMode={isDeveloperMode} />
        </TabsContent>
        
        <TabsContent value="transactions">
          <TokenTransactions tokenData={tokenizationData} />
        </TabsContent>
        
        {!isDeveloperMode && (
          <TabsContent value="purchase">
            <TokenPurchase onPurchase={handlePurchase} />
          </TabsContent>
        )}
        
        <TabsContent value="sales">
          <SalesDetailsCard />
        </TabsContent>
      </Tabs>
      
      {!isDeveloperMode && (
        <TokenPurchaseModal 
          open={isPurchaseModalOpen}
          onOpenChange={setIsPurchaseModalOpen}
          onComplete={handlePurchaseComplete}
          tokenId={selectedToken}
        />
      )}
    </div>
  );
};

export default Tokenization;
