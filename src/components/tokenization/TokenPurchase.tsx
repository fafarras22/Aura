
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDollarSign, CreditCard, Wallet, Calculator, ChevronRight, Info, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface TokenPurchaseProps {
  onPurchase: (tokenId: string) => void;
}

export const TokenPurchase: React.FC<TokenPurchaseProps> = ({ onPurchase }) => {
  const [purchaseAmount, setPurchaseAmount] = useState('1000');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [sliderValue, setSliderValue] = useState([1000]);
  const [investmentPlan, setInvestmentPlan] = useState('standard');
  
  const tokenPrice = 15000; // IDR per token
  const totalCost = Number(purchaseAmount) * tokenPrice;
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setPurchaseAmount(String(value[0]));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPurchaseAmount(value);
    setSliderValue([Number(value)]);
  };
  
  const handlePurchaseSubmit = () => {
    // Generate a random token ID for this purchase
    const tokenId = `token-${Date.now()}`;
    onPurchase(tokenId);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const getEstimatedReturn = () => {
    let returnRate = 0;
    switch(investmentPlan) {
      case 'conservative':
        returnRate = 0.08; // 8%
        break;
      case 'standard':
        returnRate = 0.12; // 12%
        break;
      case 'aggressive':
        returnRate = 0.18; // 18%
        break;
      default:
        returnRate = 0.12;
    }
    
    return formatCurrency(totalCost * (1 + returnRate));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Purchase AGRI Tokens</CardTitle>
          <CardDescription>Invest in tokenized farm assets with flexible options</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex justify-between items-center">
              <Label htmlFor="token-amount" className="text-base font-medium">Investment Amount</Label>
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">1 AKR = {formatCurrency(tokenPrice)}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  id="token-amount"
                  type="number"
                  value={purchaseAmount}
                  onChange={handleInputChange}
                  className="text-lg font-medium"
                  min="100"
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Min: 100 tokens</span>
                  <span>Max: 10,000 tokens</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Slider
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                  min={100}
                  max={10000}
                  step={100}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-2 pb-1 border-t">
              <span className="text-muted-foreground">Total Cost:</span>
              <span className="font-bold text-lg">{formatCurrency(totalCost)}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="text-base font-medium">Investment Plan</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Card className={`cursor-pointer border-2 hover:border-primary hover:bg-muted/30 transition-all p-0 ${investmentPlan === 'conservative' ? 'border-primary' : 'border-border'}`}
                    onClick={() => setInvestmentPlan('conservative')}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Conservative</h3>
                    <Badge variant="outline">8% Return</Badge>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Low risk crops</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Established markets</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-amber-600" />
                      <span>6-month lock period</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className={`cursor-pointer border-2 hover:border-primary hover:bg-muted/30 transition-all p-0 ${investmentPlan === 'standard' ? 'border-primary' : 'border-border'}`}
                    onClick={() => setInvestmentPlan('standard')}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Standard</h3>
                    <Badge variant="outline">12% Return</Badge>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Mixed crop portfolio</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Growing markets</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-amber-600" />
                      <span>12-month lock period</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className={`cursor-pointer border-2 hover:border-primary hover:bg-muted/30 transition-all p-0 ${investmentPlan === 'aggressive' ? 'border-primary' : 'border-border'}`}
                    onClick={() => setInvestmentPlan('aggressive')}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Aggressive</h3>
                    <Badge variant="outline">18% Return</Badge>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Premium crops</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span>Emerging markets</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-amber-600" />
                      <span>18-month lock period</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="text-base font-medium">Payment Method</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Card className={`cursor-pointer border-2 hover:border-primary hover:bg-muted/30 transition-all p-0 ${paymentMethod === 'bank' ? 'border-primary' : 'border-border'}`}
                    onClick={() => setPaymentMethod('bank')}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center">
                    <CircleDollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Bank Transfer</h3>
                    <p className="text-xs text-muted-foreground">Process time: 1-3 days</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`cursor-pointer border-2 hover:border-primary hover:bg-muted/30 transition-all p-0 ${paymentMethod === 'card' ? 'border-primary' : 'border-border'}`}
                    onClick={() => setPaymentMethod('card')}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-purple-100 text-purple-700 w-10 h-10 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Credit/Debit Card</h3>
                    <p className="text-xs text-muted-foreground">Process time: Instant</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`cursor-pointer border-2 hover:border-primary hover:bg-muted/30 transition-all p-0 ${paymentMethod === 'crypto' ? 'border-primary' : 'border-border'}`}
                    onClick={() => setPaymentMethod('crypto')}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-700 w-10 h-10 rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Cryptocurrency</h3>
                    <p className="text-xs text-muted-foreground">Process time: 1-2 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline">Save for Later</Button>
          <Button size="lg" onClick={handlePurchaseSubmit} className="gap-2">
            Continue to Payment
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Investment Summary</CardTitle>
          <CardDescription>Details of your token purchase</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between pb-2 border-b">
              <span className="text-muted-foreground">Number of Tokens</span>
              <span className="font-medium">{Number(purchaseAmount).toLocaleString()} AKR</span>
            </div>
            
            <div className="flex justify-between pb-2 border-b">
              <span className="text-muted-foreground">Token Price</span>
              <span className="font-medium">{formatCurrency(tokenPrice)}/AKR</span>
            </div>
            
            <div className="flex justify-between pb-2 border-b">
              <span className="text-muted-foreground">Investment Plan</span>
              <span className="font-medium capitalize">{investmentPlan}</span>
            </div>
            
            <div className="flex justify-between pb-2 border-b">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium capitalize">{paymentMethod}</span>
            </div>
            
            <div className="flex justify-between pb-2 border-b">
              <span className="text-muted-foreground">Transaction Fee</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-base font-medium">Total Cost</span>
              <span className="text-xl font-bold">{formatCurrency(totalCost)}</span>
            </div>
            
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                Estimated Return (1 year)
              </span>
              <span className="text-sm font-medium text-green-600">{getEstimatedReturn()}</span>
            </div>
            
            <div className="mt-6 p-3 bg-muted/50 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  Actual returns may vary based on market conditions and farm performance. Review the full <a href="#" className="text-blue-600 hover:underline inline-flex items-center">investment terms <ExternalLink className="h-3 w-3 ml-0.5" /></a>.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
