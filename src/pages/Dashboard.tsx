
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { useWallet } from "@/context/wallet/WalletContext";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useDashboardData } from "@/components/dashboard/useDashboardData";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WalletSummary } from "@/components/farm-projects/WalletSummary";
import { AppHeader } from "@/components/layout/AppHeader";
import { useAuth } from "@/context/auth";
import { Footer } from "@/components/layout/Footer";
import { useProjectDashboard } from "@/hooks/useProjectDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
  const { wallet, disconnect } = useWallet();
  const { isDeveloperMode, currentUser } = useDeveloperMode();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isAdmin = isDeveloperMode || (currentUser?.role === 'admin');
  
  // Section card states
  const [expandedSections, setExpandedSections] = useState({
    sensors: true,
    sales: true,
    tokenization: true,
    locations: true,
    climate: true,
    water: true
  });
  
  // Get dashboard data
  const mockData = useDashboardData();
  
  // Get project data for navigation
  const { allProjects } = useProjectDashboard();
  
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
    if (!wallet.connected && !isAdmin) {
      setShowWalletModal(true);
    }
  }, [wallet.connected, isAdmin]);
  
  // Content for translations
  const content = {
    en: {
      myProjects: "My Projects",
      viewAll: "View All",
      projectDashboard: "Project Dashboard",
      goToDashboard: "Go to Dashboard",
      active: "Active",
      maintenance: "Maintenance",
      offline: "Offline",
    },
    id: {
      myProjects: "Proyek Saya",
      viewAll: "Lihat Semua",
      projectDashboard: "Dasbor Proyek",
      goToDashboard: "Buka Dasbor",
      active: "Aktif",
      maintenance: "Pemeliharaan",
      offline: "Offline",
    },
    ko: {
      myProjects: "내 프로젝트",
      viewAll: "모두 보기",
      projectDashboard: "프로젝트 대시보드",
      goToDashboard: "대시보드로 이동",
      active: "활성",
      maintenance: "유지보수",
      offline: "오프라인",
    }
  };
  
  // If not logged in or not admin, show connect wallet screen
  if (!wallet.connected && !isAdmin) {
    return (
      <>
        <AppHeader setShowWalletModal={setShowWalletModal} language={language} setLanguage={setLanguage} />
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
          <h2 className="text-2xl font-bold mb-4 mt-16">Connect Wallet to Access Dashboard</h2>
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
        <Footer language={language} />
      </>
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
    <>
      <AppHeader 
        setShowWalletModal={setShowWalletModal} 
        language={language} 
        setLanguage={setLanguage} 
      />
      <div className="container mx-auto space-y-6 p-6">
        <div className="pt-16">
          <DashboardHeader currentUser={currentUser} />
          
          {wallet.connected && (
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
          )}
          
          {/* Projects Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{content[language].myProjects}</h2>
              <Link to="/projects">
                <Button variant="ghost" size="sm">
                  {content[language].viewAll}
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProjects.slice(0, 3).map(project => (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription>{project.cropType}</CardDescription>
                      </div>
                      <Badge 
                        variant={
                          project.location.status === 'active' ? 'default' :
                          project.location.status === 'maintenance' ? 'secondary' : 'outline'
                        }
                      >
                        {content[language][project.location.status]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Temperature:</span>
                        <p className="font-medium">{project.climate.temperature}°C</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Humidity:</span>
                        <p className="font-medium">{project.climate.humidity}%</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Water pH:</span>
                        <p className="font-medium">{project.water.ph}</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Water Level:</span>
                        <p className="font-medium">{project.water.level}%</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate(`/project/${project.id}/dashboard`)}
                    >
                      {content[language].goToDashboard}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
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
            waterData={mockData.waterData}
            climateData={mockData.climateData}
          />
        </div>
      </div>
      
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
      />
      
      <Footer language={language} />
    </>
  );
};

export default Dashboard;
