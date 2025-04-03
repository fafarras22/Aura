
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { useWallet } from "@/context/WalletContext";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useDashboardData } from "@/components/dashboard/useDashboardData";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WalletSummary } from "@/components/farm-projects/WalletSummary";

const Dashboard = () => {
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const { wallet, disconnect } = useWallet();
  const { isDeveloperMode, currentUser } = useDeveloperMode();
  const { toast } = useToast();
  
  // Section card states
  const [expandedSections, setExpandedSections] = useState({
    sensors: true,
    sales: true,
    tokenization: true,
    locations: true
  });
  
  // Get dashboard data
  const mockData = useDashboardData();
  
  // Toggle section expanded state
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Handle wallet disconnection
  const handleDisconnectWallet = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "You have been disconnected from your wallet.",
    });
  };
  
  // Check if wallet is connected when component mounts
  useEffect(() => {
    if (!wallet.connected) {
      setShowWalletModal(true);
    }
  }, [wallet.connected]);
  
  if (!wallet.connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
        <h2 className="text-2xl font-bold mb-4">Connect Wallet to Access Dashboard</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Please connect your wallet to access the AKAR FarmWatch dashboard.
        </p>
        <Button 
          onClick={() => setShowWalletModal(true)}
          size="lg"
          className="gap-2"
        >
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </Button>
        
        <WalletConnectModal
          open={showWalletModal}
          onOpenChange={setShowWalletModal}
        />
      </div>
    );
  }

  // Filter farm locations based on user role
  const filteredFarmLocations = isDeveloperMode 
    ? mockData.farmLocations 
    : mockData.farmLocations.filter(location => {
        if (currentUser?.role === 'client' && currentUser?.containerId) {
          return location.id.includes(currentUser.containerId) || 
                 location.name.includes(currentUser.containerId);
        }
        return true;
      });

  return (
    <div className="space-y-6">
      <DashboardHeader currentUser={currentUser} />
      
      <WalletSummary
        isConnected={wallet.connected}
        walletAddress={wallet.address}
        walletBalance={wallet.balance}
        akrBalance={55}
        stakedAkr={25}
        claimedRewards={5}
        onConnectWallet={() => setShowWalletModal(true)}
        onDisconnectWallet={handleDisconnectWallet}
      />
      
      <DashboardContent 
        isDeveloperMode={isDeveloperMode}
        criticalAlertsCount={mockData.criticalAlertsCount}
        upcomingHarvestsCount={mockData.upcomingHarvestsCount}
        containerCount={mockData.containerCount}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        salesData={mockData.salesData}
        tokenData={mockData.tokenData}
        farmLocations={filteredFarmLocations}
      />
      
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
      />
    </div>
  );
};

export default Dashboard;
