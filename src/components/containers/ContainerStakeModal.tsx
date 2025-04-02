
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, TrendingUp, Clock, Info, AlertCircle } from "lucide-react";
import { ContainerProject } from '@/components/containers/ContainerCard';
import { supabase } from '@/lib/supabase';
import { useWallet } from '@/context/WalletContext';
import { shortenAddress } from '@/lib/web3';
import { WalletConnectModal } from '@/components/wallet/WalletConnectModal';
import { useToast } from '@/hooks/use-toast';

interface ContainerStakeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  containerId: string | null;
}

export const ContainerStakeModal = ({
  open,
  onOpenChange,
  containerId
}: ContainerStakeModalProps) => {
  const [container, setContainer] = useState<ContainerProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("100");
  const [sliderValue, setSliderValue] = useState([100]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { wallet } = useWallet();
  const { toast } = useToast();

  // Token price in USD
  const tokenPriceUSD = 15; // $15 per AKR token

  // Calculate total cost
  const tokensToStake = Number(stakeAmount);
  const totalCostUSD = tokensToStake * tokenPriceUSD;
  
  // Calculate estimated returns
  const estimatedAnnualReturn = container ? (tokensToStake * (container.apy / 100) * tokenPriceUSD) : 0;

  useEffect(() => {
    if (open && containerId) {
      fetchContainerDetails(containerId);
    }
  }, [open, containerId]);

  const fetchContainerDetails = async (id: string) => {
    setLoading(true);
    try {
      // Try to fetch from database
      const { data, error } = await supabase
        .from('containers')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        // If error or no data, use mock data
        const mockContainer = {
          id: 'container-a',
          name: 'Container A - Premium Herbs',
          description: 'High-yield herb farming in climate-controlled environment',
          imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
          totalTokens: 1000,
          filledTokens: 960,
          apy: 12.5,
          runtimeDays: 365,
          status: 'live' as 'live'
        };
        
        setContainer(mockContainer);
        return;
      }

      // Transform the database data
      const containerData: ContainerProject = {
        id: data.id,
        name: data.name,
        description: data.description || undefined,
        imageUrl: data.image_url || undefined,
        totalTokens: data.total_tokens || 1000,
        filledTokens: data.filled_tokens || 0,
        apy: data.apy || 12.5,
        runtimeDays: data.runtime_days || 365,
        status: data.status as 'live' | 'upcoming' | 'completed' | 'ico' || 'live'
      };

      setContainer(containerData);
    } catch (error) {
      console.error('Error fetching container details:', error);
      toast({
        title: 'Error',
        description: 'Could not load container details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSliderChange = (newValues: number[]) => {
    // Update both slider and input values
    setSliderValue(newValues);
    setStakeAmount(String(newValues[0]));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStakeAmount(value);
    
    // Update slider only for valid numbers
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      setSliderValue([numValue]);
    }
  };
  
  const getMaxTokens = () => {
    if (!container) return 1000;
    return Math.min(container.totalTokens - container.filledTokens, 1000);
  };

  const handleStakeSubmit = async () => {
    if (!wallet.connected) {
      setShowWalletModal(true);
      return;
    }

    if (!container || !containerId) {
      toast({
        title: 'Error',
        description: 'Container information is missing',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // This would be where you'd trigger a real blockchain transaction
      // For now, we'll simulate it and just record it in the database
      
      // Generate a fake transaction hash
      const fakeTransactionHash = `0x${Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      // Record the investment in Supabase
      const { error } = await supabase.from('token_investments').insert({
        wallet_address: wallet.address,
        container_id: containerId,
        amount: totalCostUSD,
        token_amount: tokensToStake,
        status: 'active',
        transaction_hash: fakeTransactionHash
      });
      
      if (error) throw error;
      
      // Update the container's filled tokens
      const { error: updateError } = await supabase
        .from('containers')
        .update({
          filled_tokens: container.filledTokens + tokensToStake,
          updated_at: new Date().toISOString()
        })
        .eq('id', containerId);
        
      if (updateError) throw updateError;
      
      // Show success message
      toast({
        title: 'Stake Successful',
        description: `Successfully staked ${tokensToStake} AKR tokens`,
      });
      
      // Close the modal
      onOpenChange(false);
    } catch (error) {
      console.error('Error staking tokens:', error);
      toast({
        title: 'Staking Failed',
        description: 'There was an error processing your stake. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !container) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Stake AKR Tokens</DialogTitle>
            <DialogDescription>
              Stake your tokens in this container farm project
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between bg-muted p-3 rounded-md">
              <div>
                <h3 className="font-medium text-sm">{container.name}</h3>
                <p className="text-xs text-muted-foreground">{container.description}</p>
              </div>
              <Badge 
                variant={
                  container.status === 'live' ? "default" : 
                  container.status === 'upcoming' ? "outline" : 
                  container.status === 'ico' ? "secondary" : 
                  "destructive"
                }
              >
                {container.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="stake-amount" className="text-sm font-medium">
                  Amount to Stake (AKR)
                </label>
                <span className="text-xs text-muted-foreground">
                  Max: {getMaxTokens()} AKR
                </span>
              </div>
              
              <Input 
                id="stake-amount" 
                type="number"
                value={stakeAmount}
                onChange={handleInputChange}
                min="1"
                max={getMaxTokens()}
              />
              
              <Slider 
                value={sliderValue}
                onValueChange={handleSliderChange}
                max={getMaxTokens()}
                min={1}
                step={1}
                className="my-4"
              />
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Container Progress</div>
              <Progress 
                value={(container.filledTokens / container.totalTokens) * 100} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{container.filledTokens} filled</span>
                <span>{container.totalTokens - container.filledTokens} remaining</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center mb-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium">{container.apy}% APY</span>
                </div>
                <p className="text-xs text-muted-foreground">Annual percentage yield</p>
              </div>
              
              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm font-medium">{container.runtimeDays} days</span>
                </div>
                <p className="text-xs text-muted-foreground">Project duration</p>
              </div>
            </div>
            
            <div className="space-y-3 rounded-md border p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tokens to stake:</span>
                <span className="font-medium">{tokensToStake} AKR</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total cost:</span>
                <span className="font-medium">${totalCostUSD.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated annual return:</span>
                <span className="font-medium text-green-600">${estimatedAnnualReturn.toFixed(2)}</span>
              </div>
            </div>
            
            {wallet.connected ? (
              <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                <div className="text-sm">
                  <span className="text-muted-foreground">Connected wallet: </span>
                  <span className="font-medium">{shortenAddress(wallet.address)}</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Connected
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Connect your wallet to stake tokens</span>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleStakeSubmit} disabled={isSubmitting}>
              {wallet.connected ? (
                isSubmitting ? 'Processing...' : 'Confirm Stake'
              ) : (
                <>Connect Wallet <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <WalletConnectModal 
        open={showWalletModal} 
        onOpenChange={setShowWalletModal}
        onComplete={handleStakeSubmit}
      />
    </>
  );
};
