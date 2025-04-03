
import { supabase } from '@/lib/supabase';
import { WalletInfo, WalletType } from '@/lib/web3';
import { 
  connectWallet, 
  getTokenBalance,
  isSupportedChain,
  getChainName
} from '@/services/walletService';

// Update user wallet in database
export const updateUserWallet = async (walletAddress: string): Promise<void> => {
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

// Get AKR token balance
export const getAKRBalance = async (address: string): Promise<string> => {
  if (!address) return "0";
  
  try {
    return await getTokenBalance(address);
  } catch (error) {
    console.error("Error getting AKR balance:", error);
    return "0";
  }
};

// Try to connect wallet
export const tryConnectWallet = async (walletType: WalletType): Promise<WalletInfo | null> => {
  try {
    return await connectWallet(walletType);
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

// Check if wallet is on supported chain and return notification message if not
export const checkChainSupport = (chainId: number): string | null => {
  if (!isSupportedChain(chainId)) {
    return `You're connected to ${getChainName(chainId)}. Some features may not work.`;
  }
  return null;
};
