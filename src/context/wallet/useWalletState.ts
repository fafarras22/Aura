
import { useState, useEffect } from 'react';
import { WalletInfo, initialWalletState, WalletType } from '@/lib/web3';
import { useToast } from '@/hooks/use-toast';
import { 
  connectWallet,
  isSupportedChain, 
  getChainName, 
  switchNetwork,
  getTokenBalance 
} from '@/services/walletService';
import { tryConnectWallet, updateUserWallet as updateWalletInDB, checkChainSupport } from './utils';

export function useWalletState() {
  const [wallet, setWallet] = useState<WalletInfo>(initialWalletState);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Refresh wallet info
  const refreshWalletInfo = async (): Promise<void> => {
    try {
      if (!wallet.connected || !wallet.type) return;
      
      const walletInfo = await connectWallet(wallet.type);
      if (walletInfo) {
        setWallet(walletInfo);
        localStorage.setItem('akar_wallet', JSON.stringify({ 
          connected: true, 
          type: walletInfo.type 
        }));
        
        // Check if chain is supported
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
      console.error("Error refreshing wallet info:", error);
    }
  };

  // Connect wallet
  const connect = async (walletType: WalletType): Promise<boolean> => {
    setIsConnecting(true);
    try {
      const walletInfo = await tryConnectWallet(walletType);
      if (walletInfo) {
        setWallet(walletInfo);
        localStorage.setItem('akar_wallet', JSON.stringify({ 
          connected: true, 
          type: walletType 
        }));
        
        // Check if chain is supported and show a warning if not
        const unsupportedMessage = checkChainSupport(walletInfo.chainId);
        if (unsupportedMessage) {
          toast({
            title: "Unsupported Network",
            description: `${unsupportedMessage} Please switch to a supported network.`,
            variant: "warning"
          });
        }
        
        // Update user in DB if needed
        await updateWalletInDB(walletInfo.address);
        
        toast({
          title: "Wallet Connected",
          description: `Successfully connected to ${walletType}`,
        });
        
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    // Most wallets don't support programmatic disconnection
    // We just clear the local state
    setWallet(initialWalletState);
    localStorage.removeItem('akar_wallet');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  // Switch to a supported chain
  const switchToSupportedChain = async (targetChainId: number = 1): Promise<boolean> => {
    try {
      if (!wallet.connected) {
        toast({
          title: "Wallet Not Connected",
          description: "Please connect your wallet first.",
          variant: "warning"
        });
        return false;
      }
      
      const success = await switchNetwork(targetChainId);
      
      if (success) {
        await refreshWalletInfo();
        
        toast({
          title: "Network Switched",
          description: `Successfully switched to ${getChainName(targetChainId)}`,
        });
        
        return true;
      } else {
        toast({
          title: "Network Switch Failed",
          description: "Failed to switch network. Please try manually.",
          variant: "destructive"
        });
        
        return false;
      }
    } catch (error: any) {
      console.error("Error switching network:", error);
      
      toast({
        title: "Network Switch Failed",
        description: error.message || "Failed to switch network. Please try manually.",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  // Get AKR token balance
  const getAKRBalance = async (): Promise<string> => {
    if (!wallet.connected || !wallet.address) return "0";
    
    try {
      return await getTokenBalance(wallet.address);
    } catch (error) {
      console.error("Error getting AKR balance:", error);
      return "0";
    }
  };

  return {
    wallet,
    setWallet,
    isConnecting,
    setIsConnecting,
    connect,
    disconnect,
    refreshWalletInfo,
    switchToSupportedChain,
    getAKRBalance,
    updateUserWallet: updateWalletInDB
  };
}
