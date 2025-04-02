
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  connectWallet, 
  disconnectWallet, 
  getConnectedWallet, 
  initialWalletState,
  WalletInfo,
  WalletType,
  ensureCorrectNetwork
} from '@/lib/web3';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface WalletContextProps {
  wallet: WalletInfo;
  connect: (walletType: WalletType) => Promise<boolean>;
  disconnect: () => void;
  isConnecting: boolean;
  updateUserWallet: (walletAddress: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo>(initialWalletState);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Try to auto-connect on load
  useEffect(() => {
    const checkForExistingWallet = async () => {
      const storedWallet = localStorage.getItem('akar_wallet');
      if (storedWallet) {
        const walletInfo = await getConnectedWallet();
        if (walletInfo) {
          setWallet(walletInfo);
        }
      }
    };
    
    checkForExistingWallet();
  }, []);

  // Setup event listeners for wallet changes
  useEffect(() => {
    const setupWalletListeners = () => {
      const ethereum = (window as any).ethereum;
      if (!ethereum) return;

      // Handle account changes
      ethereum.on('accountsChanged', async (accounts: string[]) => {
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
          const walletInfo = await getConnectedWallet();
          if (walletInfo) {
            setWallet(walletInfo);
            localStorage.setItem('akar_wallet', JSON.stringify({ connected: true, type: walletInfo.type }));
          }
        }
      });

      // Handle chain changes
      ethereum.on('chainChanged', async () => {
        const walletInfo = await getConnectedWallet();
        if (walletInfo) {
          setWallet(walletInfo);
        }
      });
    };

    setupWalletListeners();

    // Clean up listeners when component unmounts
    return () => {
      const ethereum = (window as any).ethereum;
      if (!ethereum) return;
      ethereum.removeAllListeners('accountsChanged');
      ethereum.removeAllListeners('chainChanged');
    };
  }, [toast]);

  // Connect wallet
  const connect = async (walletType: WalletType): Promise<boolean> => {
    setIsConnecting(true);
    try {
      const walletInfo = await connectWallet(walletType);
      if (walletInfo) {
        setWallet(walletInfo);
        localStorage.setItem('akar_wallet', JSON.stringify({ connected: true, type: walletType }));
        
        // Make sure we're on the correct network
        await ensureCorrectNetwork();
        
        // Update user in DB if needed
        await updateUserWallet(walletInfo.address);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnect = async () => {
    await disconnectWallet();
    setWallet(initialWalletState);
    localStorage.removeItem('akar_wallet');
  };
  
  // Update user wallet in database
  const updateUserWallet = async (walletAddress: string) => {
    try {
      // Check if user exists in the database
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();
        
      if (!existingUser) {
        // Create new user if doesn't exist
        await supabase.from('users').insert({
          wallet_address: walletAddress,
          created_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error updating user wallet:", error);
    }
  };

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      connect, 
      disconnect, 
      isConnecting,
      updateUserWallet
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
