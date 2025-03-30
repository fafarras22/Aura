
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, ShieldCheck, Leaf } from 'lucide-react';
import { TokenPurchaseModal } from './TokenPurchaseModal';

export const TokenPurchase = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-green-400/10 to-green-600/10">
        <CardTitle>Buy $AKR Tokens</CardTitle>
        <CardDescription>Invest in sustainable agriculture through our blockchain platform</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="font-semibold text-lg">Current Price</h3>
              <p className="text-muted-foreground">Per token</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$0.10 USD</div>
              <div className="text-sm text-muted-foreground">≈ 0.0001 ETH</div>
            </div>
          </div>
          
          <div className="space-y-3 py-3">
            <h3 className="font-semibold">Benefits</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm">Share in container farm revenue</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm">Participate in governance decisions</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm">Secure blockchain-backed ownership</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-primary/5 rounded-lg">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Sales Progress</span>
              <span className="text-sm font-medium">68%</span>
            </div>
            <div className="w-full bg-primary/10 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">0 $AKR</span>
              <span className="text-xs text-muted-foreground">30,000,000 $AKR</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Min. Purchase</div>
              <div className="font-semibold">$100 USD</div>
              <div className="text-xs text-muted-foreground">1,000 $AKR</div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Max. Purchase</div>
              <div className="font-semibold">$50,000 USD</div>
              <div className="text-xs text-muted-foreground">500,000 $AKR</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <TokenPurchaseModal>
          <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
            Buy $AKR Tokens <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </TokenPurchaseModal>
      </CardFooter>
    </Card>
  );
};
