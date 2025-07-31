
import { WalletType, WalletInfo } from '@/lib/web3';

export interface WalletContextProps {
  wallet: WalletInfo;
  connect: (walletType: WalletType) => Promise<boolean>;
  disconnect: () => void;
  isConnecting: boolean;
  updateUserWallet: (walletAddress: string) => Promise<void>;
  switchToSupportedChain: (targetChainId?: number) => Promise<boolean>;
  getAGRIBalance: () => Promise<string>;
  refreshWalletInfo: () => Promise<void>;
}
