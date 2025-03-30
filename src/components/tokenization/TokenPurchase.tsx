
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDollarSign, CreditCard, Wallet } from 'lucide-react';

interface TokenPurchaseProps {
  onPurchase: (tokenId: string) => void;
}

export const TokenPurchase: React.FC<TokenPurchaseProps> = ({ onPurchase }) => {
  const [purchaseAmount, setPurchaseAmount] = useState('1000');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  
  const handlePurchaseSubmit = () => {
    // Generate a random token ID for this purchase
    const tokenId = `token-${Date.now()}`;
    onPurchase(tokenId);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Tokens</CardTitle>
        <CardDescription>Invest in farm produce by purchasing tokens</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="buy">Buy Tokens</TabsTrigger>
            <TabsTrigger value="info">Token Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (AKR Tokens)</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  value={purchaseAmount} 
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Estimated cost: IDR {(Number(purchaseAmount) * 15000).toLocaleString()}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {paymentMethod === 'bank' && (
                <div className="space-y-2 p-4 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="h-5 w-5 text-primary" />
                    <span className="font-medium">Bank Transfer Details</span>
                  </div>
                  <p className="text-sm">Transfer to our account and submit proof of payment:</p>
                  <div className="text-sm">
                    <p><span className="font-medium">Bank:</span> Bank Central Asia</p>
                    <p><span className="font-medium">Account Name:</span> PT Akar Farms Indonesia</p>
                    <p><span className="font-medium">Account Number:</span> 5270-3892-1111</p>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'card' && (
                <div className="space-y-2 p-4 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="font-medium">Card Payment</span>
                  </div>
                  <p className="text-sm">Securely pay with your credit or debit card:</p>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'crypto' && (
                <div className="space-y-2 p-4 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span className="font-medium">Cryptocurrency</span>
                  </div>
                  <p className="text-sm">Pay with cryptocurrency:</p>
                  <div className="text-sm">
                    <p><span className="font-medium">Accepted:</span> USDT (ERC-20), BTC, ETH</p>
                    <p><span className="font-medium">Wallet Address:</span> 0x8f7d8b9c1d2e3f4a5b6c7d8e9f0a1b2c</p>
                    <p><span className="font-medium">Network:</span> Ethereum Mainnet</p>
                  </div>
                </div>
              )}
              
              <Button className="w-full" onClick={handlePurchaseSubmit}>
                Proceed to Purchase
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">About AKR Tokens</h3>
                <p className="text-sm text-muted-foreground">
                  AKR Tokens represent ownership in AKAR farm produce and container farms. 
                  Each token is backed by real agricultural assets and gives you the right to 
                  a share of the profits from farming operations.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-md">
                  <h4 className="font-medium">Current Token Price</h4>
                  <p className="text-lg">IDR 15,000</p>
                </div>
                <div className="p-4 bg-muted rounded-md">
                  <h4 className="font-medium">Expected Annual Return</h4>
                  <p className="text-lg">12.5%</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Terms & Conditions</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Minimum purchase: 100 AKR Tokens</li>
                  <li>Lock-up period: 6 months</li>
                  <li>Dividends distributed quarterly</li>
                  <li>Secondary market trading available after lock-up</li>
                  <li>Returns may vary based on harvest results</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
