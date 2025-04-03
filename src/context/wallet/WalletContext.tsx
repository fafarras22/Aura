
import React, { createContext, useContext, useState } from 'react';
import { WalletContextProps } from './types';
import { WalletInfo, initialWalletState } from '@/lib/web3';
import { useWalletState } from './useWalletState';
import { useWalletListeners } from './WalletListeners';
import { useWalletAutoConnect } from './useWalletAutoConnect';

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    wallet, 
    setWallet,
    isConnecting, 
    setIsConnecting,
    connect, 
    disconnect, 
    refreshWalletInfo,
    switchToSupportedChain,
    getAKRBalance,
    updateUserWallet
  } = useWalletState();

  // Setup wallet event listeners
  useWalletListeners({ wallet, refreshWalletInfo });
  
  // Setup auto-connect functionality
  useWalletAutoConnect({ 
    setWallet, 
    setIsConnecting, 
    updateUserWallet
  });

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
