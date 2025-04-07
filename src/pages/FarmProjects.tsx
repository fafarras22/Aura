
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/context/wallet";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import ContainerProjectsList from "@/components/farm-projects/ContainerProjectsList";
import { ActiveProjects } from "@/components/farm-projects/ActiveProjects";
import { RewardsTracker } from "@/components/farm-projects/RewardsTracker";
import { InvestmentHistory } from "@/components/farm-projects/InvestmentHistory";
import { WalletSummary } from "@/components/farm-projects/WalletSummary";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { AppHeader } from "@/components/layout/AppHeader";
import { Leaf, Wheat, Palmtree } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEOMetadata } from "@/components/shared/SEOMetadata";

const FarmProjects = () => {
  const { wallet } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const navigate = useNavigate();
  
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

  // Featured categories with icons
  const farmCategories = [
    { name: "All Containers", icon: <Leaf className="h-4 w-4" /> },
    { name: "Leafy Greens", icon: <Leaf className="h-4 w-4" /> },
    { name: "Microgreens", icon: <Wheat className="h-4 w-4" /> },
    { name: "Strawberries", icon: <Palmtree className="h-4 w-4" /> }
  ];

  return (
    <>
      <SEOMetadata 
        title="Container Farm Projects | AKAR Farm Investment Platform"
        description="Explore and invest in our curated collection of container farming projects. Stake your $AKR tokens and earn rewards through sustainable agriculture."
        keywords="container farming projects, agricultural investment, $AKR tokens, stake farming, urban agriculture, sustainable investment"
        canonicalUrl="https://akarfarm.com/farm-projects"
      />
      
      {/* Fixed header */}
      <AppHeader 
        setShowWalletModal={setIsWalletModalOpen}
        language={language}
        setLanguage={setLanguage}
      />
      
      <div className="container mx-auto p-6 mt-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Container Farm Projects</h1>
              <p className="text-muted-foreground">
                Stake your $AKR tokens in container farms to earn stAKR rewards
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {farmCategories.map((category, index) => (
                <button 
                  key={index}
                  className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm whitespace-nowrap border 
                    ${index === 0 ? 'bg-primary text-white' : 'bg-muted/30 hover:bg-muted'}`}
                  onClick={() => {/* Filter logic */}}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
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
                    <button 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2"
                      onClick={() => navigate('/connect-wallet')}
                    >
                      Connect Wallet
                    </button>
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
                    <button 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2"
                      onClick={() => navigate('/connect-wallet')}
                    >
                      Connect Wallet
                    </button>
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
                    <button 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2"
                      onClick={() => navigate('/connect-wallet')}
                    >
                      Connect Wallet
                    </button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <WalletConnectModal
        open={isWalletModalOpen}
        onOpenChange={setIsWalletModalOpen}
      />
    </>
  );
};

export default FarmProjects;
