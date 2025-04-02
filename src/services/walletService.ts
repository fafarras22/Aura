
import { ethers } from 'ethers';
import { WalletType, WalletInfo } from '@/lib/web3';

// Supported chain IDs
const SUPPORTED_CHAINS = [1, 56, 137, 31337, 11155111]; // Ethereum, BSC, Polygon, Hardhat, Sepolia
const AKAR_TOKEN_ADDRESS = "0x8940fc0B6452AE1FB0C9C3134B9B171965Fb19E2"; // Example token address, replace with actual

// RPC URLs for fallbacks
const RPC_URLS: Record<number, string> = {
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // Public Infura key
  56: "https://bsc-dataseed.binance.org/",
  137: "https://polygon-rpc.com",
  31337: "http://localhost:8545",
  11155111: "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
};

// Chain names for UI
const CHAIN_NAMES: Record<number, string> = {
  1: "Ethereum Mainnet",
  56: "Binance Smart Chain",
  137: "Polygon",
  31337: "Local Network",
  11155111: "Sepolia Testnet"
};

// Get the Ethereum object or provider
export const getProvider = async (): Promise<ethers.providers.Web3Provider | null> => {
  try {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return null;
    
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    return provider;
  } catch (error) {
    console.error("Error getting provider:", error);
    return null;
  }
};

// Connect to wallet and return wallet info
export const connectWallet = async (walletType: WalletType): Promise<WalletInfo | null> => {
  try {
    let provider;
    let accounts: string[] = [];

    switch (walletType) {
      case 'metamask':
        if (!(window as any).ethereum?.isMetaMask) {
          window.open('https://metamask.io/download/', '_blank');
          throw new Error("MetaMask not installed");
        }
        provider = await getProvider();
        if (!provider) throw new Error("Provider not available");
        accounts = await provider.send("eth_requestAccounts", []);
        break;
        
      case 'walletconnect':
        // For production, you would use WalletConnect's package
        // This is a simplified version
        if (!(window as any).ethereum?.isWalletConnect) {
          window.open('https://walletconnect.com/', '_blank');
          throw new Error("WalletConnect not available");
        }
        provider = await getProvider();
        if (!provider) throw new Error("Provider not available");
        accounts = await provider.send("eth_requestAccounts", []);
        break;
        
      case 'coinbase':
        if (!(window as any).ethereum?.isCoinbaseWallet) {
          window.open('https://www.coinbase.com/wallet/downloads', '_blank');
          throw new Error("Coinbase Wallet not installed");
        }
        provider = await getProvider();
        if (!provider) throw new Error("Provider not available");
        accounts = await provider.send("eth_requestAccounts", []);
        break;
        
      default:
        throw new Error("Unsupported wallet type");
    }

    if (!accounts.length) {
      throw new Error("No accounts found");
    }

    // Get network and check if it's supported
    const { chainId } = await provider.getNetwork();
    const decimalChainId = chainId;
    
    // Get ETH balance
    const balance = await provider.getBalance(accounts[0]);
    const ethBalance = ethers.utils.formatEther(balance);

    return {
      address: accounts[0],
      balance: ethBalance,
      chainId: decimalChainId,
      connected: true,
      type: walletType
    };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

// Switch network if needed
export const switchNetwork = async (targetChainId: number): Promise<boolean> => {
  try {
    const provider = await getProvider();
    if (!provider) return false;
    
    const { chainId } = await provider.getNetwork();
    
    if (chainId === targetChainId) {
      return true; // Already on the correct network
    }
    
    // Request network switch
    try {
      await provider.send(
        "wallet_switchEthereumChain",
        [{ chainId: `0x${targetChainId.toString(16)}` }]
      );
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          // Add the network
          await addNetwork(targetChainId);
          return true;
        } catch (addError) {
          console.error("Error adding network:", addError);
          return false;
        }
      }
      console.error("Error switching network:", switchError);
      return false;
    }
  } catch (error) {
    console.error("Error in switchNetwork:", error);
    return false;
  }
};

// Add a network to the wallet
export const addNetwork = async (chainId: number): Promise<boolean> => {
  try {
    const provider = await getProvider();
    if (!provider) return false;
    
    // Network params based on chain ID
    let params;
    switch (chainId) {
      case 1: // Ethereum Mainnet
        params = {
          chainId: `0x1`,
          chainName: 'Ethereum Mainnet',
          nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
          rpcUrls: [RPC_URLS[1]],
          blockExplorerUrls: ['https://etherscan.io/'],
        };
        break;
      case 56: // BSC
        params = {
          chainId: `0x38`,
          chainName: 'Binance Smart Chain',
          nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
          rpcUrls: [RPC_URLS[56]],
          blockExplorerUrls: ['https://bscscan.com/'],
        };
        break;
      case 137: // Polygon
        params = {
          chainId: `0x89`,
          chainName: 'Polygon Mainnet',
          nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
          rpcUrls: [RPC_URLS[137]],
          blockExplorerUrls: ['https://polygonscan.com/'],
        };
        break;
      case 11155111: // Sepolia testnet
        params = {
          chainId: `0xaa36a7`,
          chainName: 'Sepolia Testnet',
          nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
          rpcUrls: [RPC_URLS[11155111]],
          blockExplorerUrls: ['https://sepolia.etherscan.io/'],
        };
        break;
      default:
        return false; // Unsupported chain
    }
    
    await provider.send('wallet_addEthereumChain', [params]);
    return true;
  } catch (error) {
    console.error("Error adding network:", error);
    return false;
  }
};

// Get AKR token balance
export const getTokenBalance = async (address: string): Promise<string> => {
  try {
    const provider = await getProvider();
    if (!provider) return "0";
    
    // Basic ERC20 ABI for balanceOf
    const erc20Abi = [
      {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
      }
    ];
    
    const tokenContract = new ethers.Contract(
      AKAR_TOKEN_ADDRESS,
      erc20Abi,
      provider
    );
    
    const balance = await tokenContract.balanceOf(address);
    return ethers.utils.formatUnits(balance, 18); // Assuming 18 decimals
  } catch (error) {
    console.error("Error getting token balance:", error);
    return "0";
  }
};

// Utility functions
export const getChainName = (chainId: number): string => {
  return CHAIN_NAMES[chainId] || `Unknown Chain (${chainId})`;
};

export const isSupportedChain = (chainId: number): boolean => {
  return SUPPORTED_CHAINS.includes(chainId);
};

export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
};
