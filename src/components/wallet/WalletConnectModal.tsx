
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { LogOut } from "lucide-react";

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { wallet, connect, disconnect, isConnecting } = useWallet();

  const handleConnectMetamask = async () => {
    const success = await connect("metamask");
    if (success) onOpenChange(false);
  };

  const handleConnectWalletConnect = async () => {
    const success = await connect("walletconnect");
    if (success) onOpenChange(false);
  };

  const handleConnectCoinbase = async () => {
    const success = await connect("coinbase");
    if (success) onOpenChange(false);
  };

  const handleDisconnect = async () => {
    disconnect();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to access AKAR Farm features
          </DialogDescription>
        </DialogHeader>
        
        {wallet.connected ? (
          <div className="p-4 border rounded-md bg-green-50 dark:bg-green-900/20">
            <p className="text-center mb-2">
              Connected to <span className="font-medium">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</span>
            </p>
            <p className="text-center text-sm text-muted-foreground mb-4">
              Balance: {parseFloat(wallet.balance).toFixed(4)} ETH
            </p>
            <Button 
              variant="outline"
              onClick={handleDisconnect}
              className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Button
                onClick={handleConnectMetamask}
                disabled={isConnecting}
                className="flex items-center justify-center gap-3"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                  alt="MetaMask" 
                  className="h-5 w-5" 
                />
                {isConnecting ? "Connecting..." : "Connect MetaMask"}
              </Button>
              
              <Button
                onClick={handleConnectWalletConnect}
                disabled={isConnecting}
                variant="outline"
                className="flex items-center justify-center gap-3"
              >
                <img 
                  src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png" 
                  alt="WalletConnect" 
                  className="h-5 w-5" 
                />
                {isConnecting ? "Connecting..." : "WalletConnect"}
              </Button>
              
              <Button
                onClick={handleConnectCoinbase}
                disabled={isConnecting}
                variant="outline"
                className="flex items-center justify-center gap-3"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/1/17/Coinbase_logo.svg" 
                  alt="Coinbase Wallet" 
                  className="h-5 w-5" 
                />
                {isConnecting ? "Connecting..." : "Coinbase Wallet"}
              </Button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground mt-2">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
