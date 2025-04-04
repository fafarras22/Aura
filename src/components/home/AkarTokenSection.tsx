
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, RefreshCw } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface TokenMetrics {
  price: number;
  change24h: number;
  totalSupply: number;
  circulatingSupply: number;
  marketCap: number;
}

interface AkarTokenSectionProps {
  tokenMetrics: TokenMetrics;
  onNavigate: NavigateFunction;
}

export const AkarTokenSection: React.FC<AkarTokenSectionProps> = ({ tokenMetrics, onNavigate }) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">$AKR Token</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The native token of the AKAR ecosystem, used for investing in agricultural projects, governance, and earning yield from produce sales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Token Price
                  </h3>
                  <p className="text-4xl font-bold mt-2">
                    ${tokenMetrics.price.toFixed(2)}
                    <span className={`text-sm ml-2 ${tokenMetrics.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tokenMetrics.change24h >= 0 ? '+' : ''}{tokenMetrics.change24h}%
                    </span>
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Live
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span>$823,415</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span>${(tokenMetrics.marketCap / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span>{(tokenMetrics.totalSupply / 1000000).toFixed(1)}M AKR</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Token Allocation
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Staking</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ecosystem</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Team</span>
                    <span>15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reserve</span>
                    <span>20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-purple-600" />
                    Token Utility
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-2">1</Badge>
                    <span>Stake in farm projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-2">2</Badge>
                    <span>Earn yield from produce sales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-2">3</Badge>
                    <span>Governance voting rights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-2">4</Badge>
                    <span>Access to new project ICOs</span>
                  </li>
                </ul>
              </div>
              
              <Button className="w-full mt-4" onClick={() => onNavigate('/tokenization')}>
                View Token Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
