
import { ethers } from 'ethers';
import { toast } from '@/components/ui/use-toast';

export type WalletType = 'metamask' | 'walletconnect' | 'coinbase' | null;

export interface WalletInfo {
  address: string;
  balance: string;
  chainId: number;
  connected: boolean;
  type: WalletType;
}

const SUPPORTED_CHAINS = [1, 56, 137]; // Ethereum, BSC, Polygon

// Default initial state
export const initialWalletState: WalletInfo = {
  address: '',
  balance: '0',
  chainId: 0,
  connected: false,
  type: null
};

// Get the ethereum object from window
export const getEthereumObject = () => {
  const ethereum = (window as any).ethereum;
  if (!ethereum) return null;
  return ethereum;
};

// Connect to wallet
export const connectWallet = async (walletType: WalletType): Promise<WalletInfo | null> => {
  try {
    if (!walletType) return null;
    
    const ethereum = getEthereumObject();
    if (!ethereum) {
      toast({
        title: "Wallet not found",
        description: "Please install a wallet extension like MetaMask.",
        variant: "destructive",
      });
      return null;
    }

    // Request accounts
    let accounts: string[] = [];
    try {
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error("User rejected the connection request", error);
      toast({
        title: "Connection rejected",
        description: "You rejected the connection request.",
        variant: "destructive",
      });
      return null;
    }

    if (accounts.length === 0) {
      toast({
        title: "No accounts found",
        description: "Please create an account in your wallet.",
        variant: "destructive",
      });
      return null;
    }

    // Get chain ID
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    const decimalChainId = parseInt(chainId, 16);

    // Check if chain is supported
    if (!SUPPORTED_CHAINS.includes(decimalChainId)) {
      toast({
        title: "Unsupported network",
        description: "Please connect to Ethereum, BSC, or Polygon network.",
        variant: "destructive",
      });
    }

    // Get balance
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balance = await provider.getBalance(accounts[0]);
    const formattedBalance = ethers.utils.formatEther(balance);

    const walletInfo: WalletInfo = {
      address: accounts[0],
      balance: formattedBalance,
      chainId: decimalChainId,
      connected: true,
      type: walletType
    };

    return walletInfo;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    toast({
      title: "Connection error",
      description: "Failed to connect to your wallet. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Get wallet details if already connected
export const getConnectedWallet = async (): Promise<WalletInfo | null> => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) return null;

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length === 0) return null;

    const chainId = await ethereum.request({ method: 'eth_chainId' });
    const decimalChainId = parseInt(chainId, 16);

    // Get balance
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balance = await provider.getBalance(accounts[0]);
    const formattedBalance = ethers.utils.formatEther(balance);

    // Determine wallet type (simplified)
    let walletType: WalletType = 'metamask';
    if (ethereum.isWalletConnect) walletType = 'walletconnect';
    if (ethereum.isCoinbaseWallet) walletType = 'coinbase';

    const walletInfo: WalletInfo = {
      address: accounts[0],
      balance: formattedBalance,
      chainId: decimalChainId,
      connected: true,
      type: walletType
    };

    return walletInfo;
  } catch (error) {
    console.error("Error getting connected wallet:", error);
    return null;
  }
};

// Disconnect wallet
export const disconnectWallet = async (): Promise<void> => {
  // Note: Most wallets don't support programmatic disconnection
  // We just clear the local state
  toast({
    title: "Wallet disconnected",
    description: "Your wallet has been disconnected.",
  });
};

// Utility for displaying addresses
export const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Check if the wallet is connected to the right network
export const ensureCorrectNetwork = async (
  requiredChainId: number = 1 // Default to Ethereum Mainnet
): Promise<boolean> => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) return false;

    const chainId = await ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(chainId, 16);

    if (currentChainId !== requiredChainId) {
      // Request network switch
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${requiredChainId.toString(16)}` }],
        });
        return true;
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (error.code === 4902) {
          toast({
            title: "Network not available",
            description: "Please add the required network to your wallet.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Network switch failed",
            description: "Failed to switch network. Please try manually.",
            variant: "destructive",
          });
        }
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error("Error ensuring correct network:", error);
    return false;
  }
};
