
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WalletInfo } from '@/lib/web3';

interface WalletListenersProps {
  wallet: WalletInfo;
  refreshWalletInfo: () => Promise<void>;
}

export const useWalletListeners = ({ wallet, refreshWalletInfo }: WalletListenersProps) => {
  const { toast } = useToast();

  // Setup event listeners for wallet changes
  useEffect(() => {
    const setupWalletListeners = () => {
      const ethereum = (window as any).ethereum;
      if (!ethereum) return;

      // Handle account changes
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          toast({
            title: "Wallet disconnected",
            description: "Your wallet has been disconnected.",
          });
        } else {
          // Account switched, update the wallet info
          await refreshWalletInfo();
        }
      };

      // Handle chain changes
      const handleChainChanged = async () => {
        await refreshWalletInfo();
      };

      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);

      // Clean up listeners when component unmounts
      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    };

    return setupWalletListeners();
  }, [refreshWalletInfo, toast]);
};
