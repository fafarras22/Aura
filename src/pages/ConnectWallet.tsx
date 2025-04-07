
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/wallet";
import { AppHeader } from "@/components/layout/AppHeader";
import { Wallet, AlertTriangle, Check, Loader2 } from "lucide-react";

const ConnectWallet = () => {
  const { wallet, connect } = useWallet();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  // Redirect to dashboard if wallet is connected
  useEffect(() => {
    if (wallet.connected) {
      navigate("/dashboard");
    }
  }, [wallet.connected, navigate]);
  
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setConnectError(null);
    
    try {
      await connect();
      // If successful, the useEffect above will handle navigation
    } catch (error) {
      setConnectError("Failed to connect wallet. Please try again.");
      console.error("Wallet connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Connect Wallet | AKAR Farm</title>
      </Helmet>
      
      <AppHeader 
        setShowWalletModal={setIsWalletModalOpen}
        language={language}
        setLanguage={setLanguage}
      />
      
      <div className="container mx-auto p-6 mt-16 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Connect Your Wallet</h1>
            <p className="text-muted-foreground mt-2">
              Connect your wallet to access the AKAR Farm platform, view your container investments, and monitor live sensor data
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Wallet Connection</CardTitle>
              <CardDescription>
                Connect your Web3 wallet to access AKAR Farm
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {connectError && (
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md flex items-start gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{connectError}</p>
                </div>
              )}
              
              {wallet.connected ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Check className="h-5 w-5" />
                    <p className="font-medium">Wallet Connected</p>
                  </div>
                  <p className="text-sm mt-2">
                    Wallet: {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </p>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <Button 
                  size="lg" 
                  className="w-full py-6 flex items-center justify-center gap-2"
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="h-5 w-5" />
                      Connect Wallet
                    </>
                  )}
                </Button>
              )}
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2 text-sm">Supported Wallets</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <img src="/img/metamask-logo.svg" alt="MetaMask" className="h-10 w-10" />
                    <span className="text-xs mt-1">MetaMask</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="/img/walletconnect-logo.svg" alt="WalletConnect" className="h-10 w-10" />
                    <span className="text-xs mt-1">WalletConnect</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="/img/coinbase-logo.svg" alt="Coinbase" className="h-10 w-10" />
                    <span className="text-xs mt-1">Coinbase</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ConnectWallet;
