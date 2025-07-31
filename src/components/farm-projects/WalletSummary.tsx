
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "@/lib/utils";
import { Wallet, CopyIcon, ExternalLink, LogOut } from "lucide-react";

interface WalletSummaryProps {
  isConnected: boolean;
  walletAddress: string;
  walletBalance: string;
  akrBalance: number;
  stakedAkr: number;
  claimedRewards: number;
  onConnectWallet: () => void;
  onDisconnectWallet?: () => void;
}

export const WalletSummary: React.FC<WalletSummaryProps> = ({
  isConnected,
  walletAddress,
  walletBalance,
  akrBalance,
  stakedAkr,
  claimedRewards,
  onConnectWallet,
  onDisconnectWallet
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Wallet Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="outline" className="py-1.5 pl-1.5 pr-2.5 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Connected
              </Badge>
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium">{shortenAddress(walletAddress)}</p>
                <button 
                  onClick={() => copyToClipboard(walletAddress)}
                  className="text-muted-foreground hover:text-primary"
                  title="Copy address"
                >
                  <CopyIcon size={14} />
                </button>
                <a 
                  href={`https://etherscan.io/address/${walletAddress}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                  title="View on Etherscan"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <Badge variant="outline" className="ml-auto">
                {parseFloat(walletBalance).toFixed(4)} ETH
              </Badge>
              {onDisconnectWallet && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-auto gap-1 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                  onClick={onDisconnectWallet}
                >
                  <LogOut size={14} />
                  Disconnect
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-muted p-4 rounded-md">
                <div className="text-muted-foreground text-sm mb-1">$AGRI Balance</div>
                <div className="text-2xl font-bold">{akrBalance}</div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="text-muted-foreground text-sm mb-1">stAGRI (Staked)</div>
                <div className="text-2xl font-bold">{stakedAkr}</div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="text-muted-foreground text-sm mb-1">Claimed Rewards</div>
                <div className="text-2xl font-bold">{claimedRewards}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between py-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="bg-muted p-3 rounded-full">
                <Wallet className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium">Wallet Not Connected</h4>
                <p className="text-sm text-muted-foreground">Connect your wallet to view your farm investments</p>
              </div>
            </div>
            <Button onClick={onConnectWallet}>Connect Wallet</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
