
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/context/wallet/WalletContext";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DisconnectWalletButton } from "@/components/wallet/DisconnectWalletButton";

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { wallet, connect, disconnect } = useWallet();
  const { toast } = useToast();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };
  
  // Handle wallet disconnection
  const handleDisconnectWallet = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };
  
  // Handle successful wallet connection
  const handleWalletConnected = async () => {
    if (wallet.connected) {
      toast({
        title: "Wallet Connected",
        description: "You've successfully signed up with your wallet!",
      });
      
      // Navigate to dashboard after successful connection
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  };
  
  // Check if wallet was connected
  React.useEffect(() => {
    if (wallet.connected) {
      handleWalletConnected();
    }
  }, [wallet.connected]);

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sign Up with Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {wallet.connected ? (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                  Your wallet is connected! Address: {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </p>
                
                <div className="flex gap-2 justify-center">
                  <Button 
                    variant="default" 
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                  
                  <DisconnectWalletButton />
                </div>
              </div>
            ) : (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your Web3 wallet to create an account and access AKAR FarmWatch.
                  No email or password required!
                </p>
                
                <Button 
                  variant="default" 
                  size="lg"
                  className="w-full gap-2" 
                  onClick={handleConnectWallet}
                >
                  <Wallet className="h-5 w-5" />
                  Connect Wallet
                </Button>
              </div>
            )}
            
            <div className="text-center text-sm text-muted-foreground">
              <p>By connecting your wallet, you agree to our</p>
              <div className="flex justify-center gap-1 mt-1">
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                <span>and</span>
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <WalletConnectModal
        open={isWalletModalOpen}
        onOpenChange={setIsWalletModalOpen}
      />
    </div>
  );
};
