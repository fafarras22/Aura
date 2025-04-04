
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ContainerCard, ContainerProject } from "@/components/containers/ContainerCard";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { useWallet } from "@/context/wallet";
import { useDBSetup } from "@/lib/db-setup";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo/Logo";
import { TabsSection } from "@/components/home/TabsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedFarmers } from "@/components/home/FeaturedFarmers";
import { AkrTokenAcquisition } from "@/components/home/AkrTokenAcquisition";
import { 
  Wallet, 
  Languages, 
  ArrowRight, 
  TrendingUp, 
  RefreshCw, 
  Terminal, 
  Shield, 
  Leaf,
  BarChart,
  DollarSign,
  Clock,
  Gift,
  Lock,
  Tractor,
  Fish,
  Droplets,
  Sun,
  Users,
  Sprout,
  Award
} from "lucide-react";
import { Helmet } from "react-helmet";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { QuickInvestment } from "@/components/home/QuickInvestment";
import { InvestmentDisclaimer } from "@/components/home/InvestmentDisclaimer";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeFooter } from "@/components/home/HomeFooter";
import { HomeProjects } from "@/components/home/HomeProjects";
import { AkarTokenSection } from "@/components/home/AkarTokenSection";
import { HowAkarWorks } from "@/components/home/HowAkarWorks";
import { AseanImpact } from "@/components/home/AseanImpact";
import { WhyInvestSection } from "@/components/home/WhyInvestSection";
import { CallToAction } from "@/components/home/CallToAction";

// Update the type to include all possible language options
type SupportedLanguage = 'en' | 'id' | 'ko' | 'th' | 'vi' | 'ms';

const Home = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const navigate = useNavigate();
  const { wallet } = useWallet();
  const { toast } = useToast();
  const { initializeDB } = useDBSetup();
  
  const [featuredContainers, setFeaturedContainers] = useState<ContainerProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [showStakeModal, setShowStakeModal] = useState(false);
  
  // Token metrics
  const [tokenMetrics, setTokenMetrics] = useState({
    price: 15.00,
    change24h: 5.2,
    totalSupply: 10000000,
    circulatingSupply: 3500000,
    marketCap: 52500000
  });

  const heroContent = {
    title: "Invest in",
    subtitle: "Fund sustainable agriculture across ASEAN with $AKR tokens. Back real-world farms, fisheries, and agricultural projects while earning transparent yield from harvests.",
    explore: "Explore Projects",
    learnMore: "Connect Wallet",
  };
  
  const aboutContent = {
    title: "Sustainable ASEAN Agriculture",
    description: "Our platform connects investors with vetted agricultural projects across Southeast Asia. Using blockchain for transparency and security, we're powering the next generation of farming and food production."
  };

  useEffect(() => {
    // Initialize DB on component mount
    initializeDB();
    
    // Fetch featured containers
    fetchFeaturedContainers();
  }, []);

  const fetchFeaturedContainers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('containers')
        .select('*')
        .order('filled_tokens', { ascending: false })
        .limit(9);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Transform database data
        const transformedData: ContainerProject[] = data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description || undefined,
          imageUrl: item.image_url || undefined,
          totalTokens: item.total_tokens || 1000,
          filledTokens: item.filled_tokens || 0,
          apy: item.apy || 12.5,
          runtimeDays: item.runtime_days || 365,
          status: item.status as 'live' | 'upcoming' | 'completed' | 'ico' || 'live',
          type: item.type as 'container' | 'fishery' | 'cattle' | 'palm-oil' | 'rice' | 'greenhouse' || 'container',
          location: item.location || 'Jakarta, Indonesia'
        }));
        
        setFeaturedContainers(transformedData);
      } else {
        // Use mock data if no database data
        setFeaturedContainers(getMockContainerProjects());
      }
    } catch (error) {
      console.error('Error fetching featured containers:', error);
      // Fallback to mock data
      setFeaturedContainers(getMockContainerProjects());
    } finally {
      setIsLoading(false);
    }
  };

  const handleExploreClick = () => {
    navigate('/farm-projects');
  };

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };
  
  const handleContainerSelect = (containerId: string) => {
    setSelectedContainerId(containerId);
    setShowStakeModal(true);
  };

  // Filter featured containers for separate display
  const liveFeaturedProjects = featuredContainers.filter(c => c.status === 'live').slice(0, 3);
  const icoFeaturedProjects = featuredContainers.filter(c => c.status === 'ico' || c.status === 'upcoming').slice(0, 3);

  // Function to handle language selection that ensures we only use supported languages
  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <HomeHeader 
        language={language} 
        onLanguageSelect={handleLanguageSelect} 
        wallet={wallet} 
        onConnectWallet={handleConnectWallet} 
        onNavigate={navigate} 
      />

      {/* Hero section with animation */}
      <HeroSection 
        content={heroContent}
        onExploreClick={handleExploreClick}
        onLearnMoreClick={handleConnectWallet}
      />

      {/* Quick Investment Options */}
      <QuickInvestment />
      
      {/* "Why Invest in Agriculture" Section */}
      <WhyInvestSection />
      
      {/* About Section */}
      <AboutSection content={aboutContent} />
      
      {/* Featured Farmers Section */}
      <FeaturedFarmers />
      
      {/* Available Projects Section */}
      <HomeProjects 
        featuredContainers={featuredContainers}
        onNavigate={navigate}
        onContainerSelect={handleContainerSelect}
      />

      {/* How AKAR Works */}
      <HowAkarWorks onExploreClick={handleExploreClick} />
      
      {/* AKR Token metrics */}
      <AkarTokenSection tokenMetrics={tokenMetrics} onNavigate={navigate} />
      
      {/* Security and Sustainability */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/lovable-uploads/4a63c228-4631-46e8-98d2-a534c09c4b8b.png" 
                alt="Sustainable Farming"
                className="rounded-xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <TabsSection language={language} />
            </div>
          </div>
        </div>
      </section>
      
      {/* ASEAN Impact */}
      <AseanImpact />
      
      {/* Investment Disclaimer */}
      <InvestmentDisclaimer />

      {/* Call to action */}
      <CallToAction 
        onExploreClick={handleExploreClick} 
        onConnectWallet={handleConnectWallet} 
      />
      
      {/* Footer */}
      <HomeFooter onNavigate={navigate} />
      
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
      />
      
      <ContainerStakeModal
        open={showStakeModal}
        onOpenChange={setShowStakeModal}
        containerId={selectedContainerId}
      />
    </div>
  );
};

export default Home;
