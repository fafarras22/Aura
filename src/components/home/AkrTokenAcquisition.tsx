
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Wallet, Globe, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AkrTokenAcquisition: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 px-3 py-1 bg-primary/10 text-primary border-primary/30">
            $UMBI Token
          </Badge>
          <h2 className="text-3xl font-bold mb-4">How to Get UMBI Tokens</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            There are multiple ways to acquire $UMBI tokens and start investing in ASEAN agricultural projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-2 border-primary/20 transition-all hover:border-primary/40">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Participate in ICOs</CardTitle>
              <CardDescription>
                Join Initial Coin Offerings of new agricultural projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-2">
                  <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 shrink-0 mt-0.5">1</Badge>
                  <div>
                    <p className="font-medium">Browse upcoming ICO projects</p>
                    <p className="text-sm text-muted-foreground">Find promising agricultural projects in their early funding stage</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 shrink-0 mt-0.5">2</Badge>
                  <div>
                    <p className="font-medium">Purchase project tokens</p>
                    <p className="text-sm text-muted-foreground">Fund the project with stablecoins and receive $UMBI tokens at project launch</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 shrink-0 mt-0.5">3</Badge>
                  <div>
                    <p className="font-medium">Earn bonus tokens</p>
                    <p className="text-sm text-muted-foreground">ICO participants often receive bonus tokens and early staking opportunities</p>
                  </div>
                </li>
              </ul>
              
              <Button 
                variant="default" 
                className="w-full gap-2" 
                onClick={() => navigate('/farm-projects')}
              >
                Browse ICO Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-primary/20 transition-all hover:border-primary/40">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Buy on Exchanges</CardTitle>
              <CardDescription>
                Purchase $UMBI tokens on decentralized or centralized exchanges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-2">
                  <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 shrink-0 mt-0.5">1</Badge>
                  <div>
                    <p className="font-medium">DEX (Decentralized Exchanges)</p>
                    <p className="text-sm text-muted-foreground">Trade $UMBI on Uniswap, PancakeSwap and other popular DEXs</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 shrink-0 mt-0.5">2</Badge>
                  <div>
                    <p className="font-medium">CEX (Centralized Exchanges)</p>
                    <p className="text-sm text-muted-foreground">Buy $UMBI on major exchanges with fiat currency options</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 shrink-0 mt-0.5">3</Badge>
                  <div>
                    <p className="font-medium">Transfer to your wallet</p>
                    <p className="text-sm text-muted-foreground">Move your $UMBI tokens to a supported Web3 wallet for staking</p>
                  </div>
                </li>
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full gap-2" 
                onClick={() => navigate('/tokenization')}
              >
                View Token Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
