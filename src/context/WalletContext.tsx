
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  WalletInfo,
  WalletType,
  initialWalletState 
} from '@/lib/web3';
import { 
  connectWallet, 
  getProvider,
  switchNetwork,
  getTokenBalance,
  isSupportedChain,
  getChainName
} from '@/services/walletService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface WalletContextProps {
  wallet: WalletInfo;
  connect: (walletType: WalletType) => Promise<boolean>;
  disconnect: () => void;
  isConnecting: boolean;
  updateUserWallet: (walletAddress: string) => Promise<void>;
  switchToSupportedChain: (targetChainId?: number) => Promise<boolean>;
  getAKRBalance: () => Promise<string>;
  refreshWalletInfo: () => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo>(initialWalletState);
  const [isConnecting, setIsConnecting] = useState(false);
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
                if (!isSupportedChain(walletInfo.chainId)) {
                  toast({
                    title: "Unsupported Network",
                    description: `You're connected to ${getChainName(walletInfo.chainId)}. Some features may not work.`,
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
  }, [toast]);

  // Setup event listeners for wallet changes
  useEffect(() => {
    const setupWalletListeners = () => {
      const ethereum = (window as any).ethereum;
      if (!ethereum) return;

      // Handle account changes
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setWallet(initialWalletState);
          localStorage.removeItem('akar_wallet');
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
  }, [toast]);

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
        if (!isSupportedChain(walletInfo.chainId)) {
          toast({
            title: "Unsupported Network",
            description: `You're connected to ${getChainName(walletInfo.chainId)}. Some features may not work.`,
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
      const walletInfo = await connectWallet(walletType);
      if (walletInfo) {
        setWallet(walletInfo);
        localStorage.setItem('akar_wallet', JSON.stringify({ 
          connected: true, 
          type: walletType 
        }));
        
        // Check if chain is supported and show a warning if not
        if (!isSupportedChain(walletInfo.chainId)) {
          toast({
            title: "Unsupported Network",
            description: `You're connected to ${getChainName(walletInfo.chainId)}. Please switch to a supported network.`,
            variant: "warning"
          });
        }
        
        // Update user in DB if needed
        await updateUserWallet(walletInfo.address);
        
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
  const disconnect = async () => {
    // Most wallets don't support programmatic disconnection
    // We just clear the local state
    setWallet(initialWalletState);
    localStorage.removeItem('akar_wallet');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };
  
  // Update user wallet in database
  const updateUserWallet = async (walletAddress: string) => {
    try {
      // Check if user exists in the database
      const { data: existingUser, error: queryError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();
        
      if (queryError && queryError.code !== 'PGRST116') {
        console.error("Error querying user:", queryError);
        return;
      }
        
      if (!existingUser) {
        // Create new user if doesn't exist
        const { error: insertError } = await supabase.from('users').insert({
          wallet_address: walletAddress,
          created_at: new Date().toISOString()
        });
        
        if (insertError) {
          console.error("Error creating user:", insertError);
        }
      }
    } catch (error) {
      console.error("Error updating user wallet:", error);
    }
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

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      connect, 
      disconnect, 
      isConnecting,
      updateUserWallet,
      switchToSupportedChain,
      getAKRBalance,
      refreshWalletInfo
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
