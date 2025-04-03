
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';

interface ConnectModalWithCallbackProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export const ConnectModalWithCallback: React.FC<ConnectModalWithCallbackProps> = ({
  open,
  onOpenChange,
  onComplete
}) => {
  const { connect, wallet } = useWallet();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      // Call connect with 'metamask' as the wallet type
      await connect('metamask');
      toast({
        title: 'Wallet Connected',
        description: 'Your wallet has been successfully connected.',
      });
      
      onOpenChange(false);
      
      if (onComplete && wallet.connected) {
        onComplete();
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect your wallet. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to start staking in farm projects.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Button 
            onClick={handleConnect} 
            className="w-full flex items-center justify-center gap-2"
          >
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
