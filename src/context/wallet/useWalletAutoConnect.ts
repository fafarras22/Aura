
import { useEffect } from 'react';
import { connectWallet } from '@/services/walletService';
import { useToast } from '@/hooks/use-toast';
import { WalletInfo, initialWalletState } from '@/lib/web3';
import { checkChainSupport } from './utils';

interface AutoConnectProps {
  setWallet: (wallet: WalletInfo) => void;
  setIsConnecting: (isConnecting: boolean) => void;
  updateUserWallet: (address: string) => Promise<void>;
}

export function useWalletAutoConnect({ 
  setWallet, 
  setIsConnecting, 
  updateUserWallet 
}: AutoConnectProps) {
  const { toast } = useToast();

  // Try to auto-connect on load
  useEffect(() => {
    const checkForExistingWallet = async () => {
      try {
        const storedWallet = localStorage.getItem('akar_wallet');
        if (storedWallet) {
          const walletData = JSON.parse(storedWallet);
          
          if (walletData.connected && walletData.type) {
            setIsConnecting(true);
            
            try {
              // Try to reconnect with the stored wallet type
              const walletInfo = await connectWallet(walletData.type);
              if (walletInfo) {
                setWallet(walletInfo);
                
                // Check if we need to update user data in the database
                if (walletInfo.address) {
                  await updateUserWallet(walletInfo.address);
                }
                
                // Check if the chain is supported
                const unsupportedMessage = checkChainSupport(walletInfo.chainId);
                if (unsupportedMessage) {
                  toast({
                    title: "Unsupported Network",
                    description: unsupportedMessage,
                    variant: "warning"
                  });
                }
              }
            } catch (error) {
              console.error("Failed to reconnect wallet:", error);
              // Clear stored wallet data if auto-connect fails
              localStorage.removeItem('akar_wallet');
            }
          }
        }
      } catch (error) {
        console.error("Error checking for existing wallet:", error);
      } finally {
        setIsConnecting(false);
      }
    };
    
    checkForExistingWallet();
  }, [setWallet, setIsConnecting, updateUserWallet, toast]);
}
