
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { ContainerProjectsList } from "@/components/farm-projects/ContainerProjectsList";
import { ActiveProjects } from "@/components/farm-projects/ActiveProjects";
import { RewardsTracker } from "@/components/farm-projects/RewardsTracker";
import { InvestmentHistory } from "@/components/farm-projects/InvestmentHistory";
import { WalletSummary } from "@/components/farm-projects/WalletSummary";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";

const FarmProjects = () => {
  const { wallet } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for the page
  const containerProjects = getMockContainerProjects();
  
  // Mock data for wallet statistics
  const walletStats = {
    akrBalance: wallet.connected ? 1250 : 0,
    stakedAkr: wallet.connected ? 750 : 0,
    claimedRewards: wallet.connected ? 65.5 : 0,
    pendingRewards: wallet.connected ? 12.8 : 0
  };
  
  // Open wallet modal if trying to interact while not connected
  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Farm Projects | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Farm Projects</h1>
            <p className="text-muted-foreground">
              Stake your $AKR tokens in farm containers to earn rewards
            </p>
          </div>
          
          {!wallet.connected && (
            <Button onClick={handleConnectWallet}>
              Connect Wallet
            </Button>
          )}
        </div>
        
        <WalletSummary 
          isConnected={wallet.connected} 
          walletAddress={wallet.address}
          walletBalance={wallet.balance}
          akrBalance={walletStats.akrBalance}
          stakedAkr={walletStats.stakedAkr}
          claimedRewards={walletStats.claimedRewards}
          onConnectWallet={handleConnectWallet}
        />
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="overview">All Projects</TabsTrigger>
            <TabsTrigger value="active">My Stakes</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <ContainerProjectsList 
              containerProjects={containerProjects} 
              isWalletConnected={wallet.connected}
              onConnectWallet={handleConnectWallet}
            />
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            {wallet.connected ? (
              <ActiveProjects />
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground mb-4">Connect your wallet to view your active stakes</p>
                  <Button onClick={handleConnectWallet}>Connect Wallet</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="rewards" className="mt-6">
            {wallet.connected ? (
              <RewardsTracker 
                stakedAkr={walletStats.stakedAkr}
                pendingRewards={walletStats.pendingRewards}
                claimedRewards={walletStats.claimedRewards}
              />
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground mb-4">Connect your wallet to view your rewards</p>
                  <Button onClick={handleConnectWallet}>Connect Wallet</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            {wallet.connected ? (
              <InvestmentHistory />
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground mb-4">Connect your wallet to view your investment history</p>
                  <Button onClick={handleConnectWallet}>Connect Wallet</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <WalletConnectModal
        open={isWalletModalOpen}
        onOpenChange={setIsWalletModalOpen}
      />
    </div>
  );
};

export default FarmProjects;
