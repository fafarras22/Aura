
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Calculator, CreditCard, Wallet, Users, ExternalLink, TrendingUp, Percent, CircleDollarSign } from 'lucide-react';
import { AppleButton } from '@/components/ui/apple-button';
import { useIsMobile } from '@/hooks/use-mobile';

interface TokenPurchaseProps {
  tokenData: any;
}

export const TokenPurchase = ({ tokenData }: TokenPurchaseProps) => {
  const [tokenAmount, setTokenAmount] = useState<number>(10);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const isMobile = useIsMobile();
  
  const tokenPrice = 20; // Price in MATIC
  const totalCost = tokenAmount * tokenPrice;
  const estimatedReturn = tokenAmount * tokenData.averageReturn / 100;
  
  const handleSliderChange = (value: number[]) => {
    setTokenAmount(value[0]);
  };
  
  const handlePurchase = () => {
    setIsProcessing(true);
    
    // Simulate purchase processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Tokens Purchased Successfully!",
        description: `You have purchased ${tokenAmount} AKR tokens for ${totalCost} MATIC.`,
        variant: "default",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      {/* Community highlight card */}
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

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white shadow-md border-0">
          <CardHeader className="pb-3 space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-bold">Purchase $AKR Tokens</CardTitle>
                <CardDescription>Invest in sustainable farming</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Price: {tokenPrice} MATIC
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* ROI Information Card */}
              <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <TrendingUp className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Average Annual Return: {tokenData.averageReturn}%</p>
                  <p className="text-xs text-green-700">Based on historical performance over 12 months</p>
                </div>
              </div>
            
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Token Amount</span>
                  <span className="font-semibold">{tokenAmount} AKR</span>
                </div>
                <Slider
                  defaultValue={[10]}
                  max={100}
                  min={1}
                  step={1}
                  value={[tokenAmount]}
                  onValueChange={handleSliderChange}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 AKR</span>
                  <span>100 AKR</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Cost</span>
                  </div>
                  <span className="font-semibold">{totalCost} MATIC</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-md">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4" />
                    <span className="text-sm">Est. Return</span>
                  </div>
                  <span className="font-semibold">~{estimatedReturn.toFixed(2)}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 p-3 rounded-md border transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border text-muted-foreground hover:bg-muted'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm font-medium">Credit Card</span>
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 p-3 rounded-md border transition-all ${
                      paymentMethod === 'wallet' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border text-muted-foreground hover:bg-muted'
                    }`}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm font-medium">Crypto Wallet</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <AppleButton 
              className="w-full bg-green-600 hover:bg-green-700 text-white" 
              onClick={handlePurchase}
              disabled={isProcessing}
              variant="green"
              size="lg"
            >
              {isProcessing ? 'Processing...' : `Purchase ${tokenAmount} AKR Tokens`}
            </AppleButton>
          </CardFooter>
        </Card>
        
        <Card className="bg-white shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Your AKR Portfolio</CardTitle>
            <CardDescription>Track your investment performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium">Current Holdings</h4>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {tokenData.userHoldings || '0'} AKR
                  </Badge>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mb-2">
                  <div 
                    className="h-2 bg-green-600 rounded-full"
                    style={{ width: `${Math.min((tokenData.userHoldings || 0) / 100 * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Portfolio Value</span>
                  <span>{((tokenData.userHoldings || 0) * tokenPrice).toLocaleString()} MATIC</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="text-xs text-muted-foreground mb-1">Annual Return</h4>
                  <p className="text-xl font-bold text-green-600">
                    {tokenData.averageReturn}%
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="text-xs text-muted-foreground mb-1">Lock Period</h4>
                  <p className="text-xl font-bold">6 months</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="text-xs text-muted-foreground mb-1">Next Harvest</h4>
                  <p className="text-xl font-bold">24 days</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="text-xs text-muted-foreground mb-1">Rewards Earned</h4>
                  <p className="text-xl font-bold text-green-600">+15.4 MATIC</p>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 text-sm font-medium">
                  Recent Transactions
                </div>
                {/* Transaction history */}
                <div className="divide-y">
                  {(tokenData.recentTransactions || [
                    { id: 1, type: 'Purchase', amount: 10, date: '2023-05-15' },
                    { id: 2, type: 'Reward', amount: 1.5, date: '2023-06-01' },
                  ]).map((transaction: any) => (
                    <div key={transaction.id} className="flex justify-between px-4 py-3 text-sm">
                      <div>
                        <div className="font-medium">{transaction.type}</div>
                        <div className="text-xs text-muted-foreground">{transaction.date}</div>
                      </div>
                      <div className={`font-medium ${transaction.type === 'Reward' ? 'text-green-600' : ''}`}>
                        {transaction.type === 'Reward' ? '+' : ''}{transaction.amount} AKR
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
