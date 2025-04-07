
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Wallet, Circle, CircleDollarSign } from "lucide-react";

interface AkarTokenSectionProps {
  tokenMetrics: {
    price: number;
    change24h: number;
    totalSupply: number;
    circulatingSupply: number;
    marketCap: number;
    stakedAmount: number;
    stakingAPY: number;
  };
  onNavigate: (path: string) => void;
}

export const AkarTokenSection: React.FC<AkarTokenSectionProps> = ({ tokenMetrics, onNavigate }) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-2">TOKENOMICS</Badge>
          <h2 className="text-3xl font-bold">$AKR Token & stAKR Staking</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            The $AKR token powers the AKAR Farm ecosystem, enabling container farm investments. 
            Stake your $AKR tokens to receive stAKR and earn passive income from our container farm operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold flex items-center">
                    <CircleDollarSign className="h-5 w-5 mr-2 text-green-600" />
                    $AKR Token
                  </h3>
                  <p className="text-muted-foreground">Container farm ownership token</p>
                </div>
                <Badge variant="outline" className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {tokenMetrics.change24h > 0 ? '+' : ''}{tokenMetrics.change24h}%
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-2xl font-bold">${tokenMetrics.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="text-2xl font-bold">${(tokenMetrics.marketCap / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Circulating Supply</p>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{tokenMetrics.circulatingSupply.toLocaleString()}</span>
                    <span>{tokenMetrics.totalSupply.toLocaleString()}</span>
                  </div>
                  <div className="bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full" 
                      style={{ width: `${(tokenMetrics.circulatingSupply / tokenMetrics.totalSupply) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md overflow-hidden bg-emerald-50 dark:bg-emerald-950/20">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-emerald-600" />
                    stAKR Staking
                  </h3>
                  <p className="text-muted-foreground">Earn passive income</p>
                </div>
                <Badge className="bg-emerald-500">APY: {tokenMetrics.stakingAPY}%</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Staked</p>
                    <p className="text-2xl font-bold">{tokenMetrics.stakedAmount.toLocaleString()} $AKR</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">% of Supply</p>
                    <p className="text-2xl font-bold">
                      {((tokenMetrics.stakedAmount / tokenMetrics.totalSupply) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg dark:bg-gray-800">
                  <p className="text-sm font-medium mb-2">Benefits</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Circle className="h-2 w-2 mr-2 fill-current text-emerald-500" />
                      Regular yield from container operations
                    </li>
                    <li className="flex items-center text-sm">
                      <Circle className="h-2 w-2 mr-2 fill-current text-emerald-500" />
                      Voting rights on farm management decisions
                    </li>
                    <li className="flex items-center text-sm">
                      <Circle className="h-2 w-2 mr-2 fill-current text-emerald-500" />
                      Priority access to new container offerings
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={() => onNavigate('/token-purchase')} 
            size="lg"
            className="gap-2"
          >
            Get $AKR Tokens
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
