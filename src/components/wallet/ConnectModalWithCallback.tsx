
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Wallet } from "lucide-react";

interface ConnectModalWithCallbackProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export const ConnectModalWithCallback: React.FC<ConnectModalWithCallbackProps> = ({
  open,
  onOpenChange,
  onComplete,
}) => {
  const { connect, isConnecting } = useWallet();

  const handleConnectWallet = async (type: 'metamask' | 'walletconnect' | 'coinbase') => {
    const success = await connect(type);
    if (success && onComplete) {
      onComplete();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to continue with staking.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-center justify-between py-6"
            onClick={() => handleConnectWallet('metamask')}
            disabled={isConnecting}
          >
            <span>MetaMask</span>
            <Wallet className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center justify-between py-6"
            onClick={() => handleConnectWallet('walletconnect')}
            disabled={isConnecting}
          >
            <span>WalletConnect</span>
            <Wallet className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center justify-between py-6"
            onClick={() => handleConnectWallet('coinbase')}
            disabled={isConnecting}
          >
            <span>Coinbase Wallet</span>
            <Wallet className="h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
