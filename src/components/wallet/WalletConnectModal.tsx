
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, Coins, ArrowRight } from "lucide-react";
import { useWallet } from '@/context/WalletContext';
import { WalletType } from '@/lib/web3';

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  open,
  onOpenChange,
  onComplete
}) => {
  const { connect, isConnecting } = useWallet();

  const handleConnect = async (walletType: WalletType) => {
    const success = await connect(walletType);
    if (success) {
      onOpenChange(false);
      if (onComplete) onComplete();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Connect your wallet</DialogTitle>
          <DialogDescription className="text-center">
            Connect your wallet to stake $AKR tokens and earn rewards
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 py-4">
          <Button 
            variant="outline" 
            className="flex justify-between items-center h-16 px-4"
            onClick={() => handleConnect('metamask')}
            disabled={isConnecting}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src="/lovable-uploads/c5b2d24e-f106-4e89-af2d-efaced4463bb.png" alt="MetaMask" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-medium">MetaMask</p>
                <p className="text-xs text-muted-foreground">Connect to your MetaMask wallet</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          <Button 
            variant="outline" 
            className="flex justify-between items-center h-16 px-4"
            onClick={() => handleConnect('walletconnect')}
            disabled={isConnecting}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-800">
                <Wallet className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="font-medium">WalletConnect</p>
                <p className="text-xs text-muted-foreground">Connect using WalletConnect</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          <Button 
            variant="outline" 
            className="flex justify-between items-center h-16 px-4"
            onClick={() => handleConnect('coinbase')}
            disabled={isConnecting}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-800">
                <Coins className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="font-medium">Coinbase Wallet</p>
                <p className="text-xs text-muted-foreground">Connect using Coinbase Wallet</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
};
