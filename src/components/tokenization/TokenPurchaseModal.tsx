
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, Info, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppleButton } from '@/components/ui/apple-button';

interface TokenPurchaseModalProps {
  children?: React.ReactNode;
}

export const TokenPurchaseModal: React.FC<TokenPurchaseModalProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [purchaseMethod, setPurchaseMethod] = useState<string>("credit");
  const [amount, setAmount] = useState<string>("1000");
  const [success, setSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  
  const tokenPrice = 0.10; // USD
  const estimatedTokens = parseFloat(amount) / tokenPrice;
  
  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (purchaseMethod === "credit") {
        setStep(2);
      } else {
        if (!walletConnected) {
          return;
        }
        setStep(3);
      }
    }, 1500);
  };
  
  const handleConfirmPurchase = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 2000);
  };
  
  const copyAddress = () => {
    navigator.clipboard.writeText("0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const connectWallet = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setWalletConnected(true);
    }, 1500);
  };
  
  const resetModal = () => {
    setStep(1);
    setSuccess(false);
    setWalletConnected(false);
  };
  
  return (
    <Dialog onOpenChange={(open) => {
      if (!open) resetModal();
    }}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Buy $AKR Tokens
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {!success ? (
          <>
            <DialogHeader>
              <DialogTitle>Purchase $AKR Tokens</DialogTitle>
              <DialogDescription>
                Invest in sustainable agriculture through AKAR's tokenization platform.
              </DialogDescription>
            </DialogHeader>
            
            {step === 1 && (
              <>
                <Tabs defaultValue={purchaseMethod} onValueChange={(value) => setPurchaseMethod(value)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="credit">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="crypto">
                      <Wallet className="mr-2 h-4 w-4" />
                      Crypto Wallet
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="credit" className="space-y-4">
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Purchase Amount (USD)</Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-medium">$</span>
                          <Input
                            id="amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Minimum purchase: $100
                        </p>
                      </div>
                      
                      <div className="rounded-lg border p-4 bg-muted/50">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Estimated Tokens:</span>
                          <span className="font-medium">{estimatedTokens.toLocaleString()} $AKR</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Token Price:</span>
                          <span className="font-medium">${tokenPrice.toFixed(2)} USD</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Processing Fee:</span>
                          <span className="font-medium">$0.00 USD</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center rounded-md border p-3 text-sm">
                      <Info className="h-4 w-4 mr-2 text-blue-500" />
                      <span>
                        Purchases are subject to a 7-day lockup period before tokens can be transferred.
                      </span>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="crypto" className="space-y-4">
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="cryptoAmount">Purchase Amount (USD)</Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-medium">$</span>
                          <Input
                            id="cryptoAmount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Minimum purchase: $100
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cryptoCurrency">Select Cryptocurrency</Label>
                        <Select defaultValue="usdt">
                          <SelectTrigger id="cryptoCurrency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usdt">USDT (Tether)</SelectItem>
                            <SelectItem value="usdc">USDC</SelectItem>
                            <SelectItem value="matic">MATIC (Polygon)</SelectItem>
                            <SelectItem value="eth">ETH (Ethereum)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="rounded-lg border p-4 bg-muted/50">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Estimated Tokens:</span>
                          <span className="font-medium">{estimatedTokens.toLocaleString()} $AKR</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Token Price:</span>
                          <span className="font-medium">${tokenPrice.toFixed(2)} USD</span>
                        </div>
                      </div>
                      
                      {!walletConnected ? (
                        <Button 
                          onClick={connectWallet} 
                          variant="outline" 
                          className="w-full"
                          disabled={isLoading}
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          {isLoading ? "Connecting..." : "Connect Wallet"}
                        </Button>
                      ) : (
                        <div className="flex items-center rounded-md border p-3 text-sm bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span>Wallet connected: 0x1a2...9s0t</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center rounded-md border p-3 text-sm">
                      <Info className="h-4 w-4 mr-2 text-blue-500" />
                      <span>
                        $AKR tokens will be automatically sent to your connected wallet on the Polygon network.
                      </span>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <DialogFooter>
                  <Button 
                    onClick={handleSubmit} 
                    className="bg-primary text-primary-foreground w-full"
                    disabled={isLoading || (purchaseMethod === "crypto" && !walletConnected)}
                  >
                    {isLoading ? "Processing..." : "Continue to Payment"}
                  </Button>
                </DialogFooter>
              </>
            )}
            
            {step === 2 && (
              <>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiration Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  
                  <div className="rounded-lg border p-4 bg-muted/50">
                    <div className="flex justify-between font-medium mb-2">
                      <span>Total Payment:</span>
                      <span>${parseFloat(amount).toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>You will receive:</span>
                      <span>{estimatedTokens.toLocaleString()} $AKR</span>
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="sm:flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleConfirmPurchase} 
                    className="bg-primary text-primary-foreground sm:flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Complete Purchase"}
                  </Button>
                </DialogFooter>
              </>
            )}
            
            {step === 3 && (
              <>
                <div className="space-y-4 py-4">
                  <div className="text-center space-y-3 py-3">
                    <div className="font-medium">Send payment to this address:</div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-muted p-3 rounded-md text-sm font-mono break-all">
                        0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={copyAddress} 
                        className="flex-shrink-0"
                      >
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Network: Polygon PoS
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4 bg-muted/50">
                    <div className="flex justify-between font-medium mb-2">
                      <span>Send Amount:</span>
                      <span>${parseFloat(amount).toFixed(2)} USD equivalent</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>You will receive:</span>
                      <span>{estimatedTokens.toLocaleString()} $AKR</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center rounded-md border p-3 text-sm">
                    <Info className="h-4 w-4 mr-2 text-blue-500" />
                    <span>
                      After sending payment, click "Confirm" to process your order. Tokens will be sent to your wallet within minutes.
                    </span>
                  </div>
                </div>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="sm:flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleConfirmPurchase} 
                    className="bg-primary text-primary-foreground sm:flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Confirm Payment Sent"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        ) : (
          <div className="py-10 px-4 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Purchase Successful!</h3>
              <p className="text-muted-foreground">
                You have successfully purchased {estimatedTokens.toLocaleString()} $AKR tokens.
              </p>
            </div>
            
            <div className="rounded-lg border p-4 bg-muted/50 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span>Transaction ID:</span>
                <span className="font-mono">txn-{Math.random().toString(36).substring(2, 10)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Amount:</span>
                <span>${parseFloat(amount).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tokens:</span>
                <span>{estimatedTokens.toLocaleString()} $AKR</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button className="w-full" asChild>
                <a href="/tokenization" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View My Tokens
                </a>
              </Button>
              
              <Button variant="outline" className="w-full" onClick={resetModal}>
                Purchase More Tokens
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
