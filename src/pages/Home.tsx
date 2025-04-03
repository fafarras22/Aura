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

const Home = () => {
  const [language, setLanguage] = useState<'en' | 'id' | 'ko' | 'th' | 'vi' | 'ms'>('en');
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
    description: "Our platform connects investors with vetted agricultural projects across Southeast Asia. Using blockchain for transparency and security, we're powering the next generation of farming."
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

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      {/* Header/Navigation */}
      <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-950/90">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="lg" showText={false} />
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/farm-projects" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                Projects
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/tokenization" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                $AKR Token
              </Link>
              <Link to="/analytics" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                Analytics
              </Link>
            </nav>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Languages className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <div className="grid gap-1">
                    <Button 
                      variant={language === 'en' ? "default" : "ghost"} 
                      onClick={() => setLanguage('en')}
                      className="justify-start"
                    >
                      English
                    </Button>
                    <Button 
                      variant={language === 'id' ? "default" : "ghost"} 
                      onClick={() => setLanguage('id')}
                      className="justify-start"
                    >
                      Indonesia
                    </Button>
                    <Button 
                      variant={language === 'th' ? "default" : "ghost"} 
                      onClick={() => setLanguage('th')}
                      className="justify-start"
                    >
                      ไทย
                    </Button>
                    <Button 
                      variant={language === 'vi' ? "default" : "ghost"} 
                      onClick={() => setLanguage('vi')}
                      className="justify-start"
                    >
                      Tiếng Việt
                    </Button>
                    <Button 
                      variant={language === 'ms' ? "default" : "ghost"} 
                      onClick={() => setLanguage('ms')}
                      className="justify-start"
                    >
                      Bahasa Melayu
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              {wallet.connected ? (
                <Button 
                  variant="default" 
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  onClick={handleConnectWallet}
                  className="gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero section with animation */}
      <HeroSection 
        content={heroContent}
        onExploreClick={handleExploreClick}
        onLearnMoreClick={handleConnectWallet}
      />

      {/* Quick Investment Options */}
      <QuickInvestment />
      
      {/* "Why Invest in Agriculture" Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Invest in ASEAN Agriculture?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Agricultural investments provide unique advantages that combine financial returns with real-world impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real Asset Backing</h3>
                <p className="text-muted-foreground">
                  Each project is backed by tangible agricultural assets including land, equipment, and produce, providing stability to your investment.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Consistent Returns</h3>
                <p className="text-muted-foreground">
                  Agricultural projects deliver predictable yields from 12-20% annually, with income directly tied to ongoing harvests and produce sales.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-primary">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Impact</h3>
                <p className="text-muted-foreground">
                  Your investments create jobs, support rural economies, and promote sustainable farming practices across Southeast Asia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <AboutSection content={aboutContent} />
      
      {/* Featured Farmers Section */}
      <FeaturedFarmers />
      
      {/* Available Projects Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          {/* Live Projects */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <div>
                <Badge variant="default" className="mb-2">LIVE</Badge>
                <h2 className="text-3xl font-bold">Available Projects</h2>
                <p className="text-muted-foreground">Ready-to-stake agricultural projects</p>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/farm-projects')}
                className="gap-2"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredContainers
                .filter(c => c.status === 'live')
                .slice(0, 3)
                .map((container) => (
                  <ContainerCard
                    key={container.id}
                    container={container}
                    onAction={handleContainerSelect}
                  />
                ))}
            </div>
          </div>

          {/* ICO Projects */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <Badge variant="secondary" className="mb-2">UPCOMING</Badge>
                <h2 className="text-3xl font-bold">ICO Projects</h2>
                <p className="text-muted-foreground">Pre-launch investment opportunities</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredContainers
                .filter(c => c.status === 'ico' || c.status === 'upcoming')
                .slice(0, 3)
                .map((container) => (
                  <ContainerCard
                    key={container.id}
                    container={container}
                    onAction={handleContainerSelect}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* How AKAR Works */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How AKAR Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes investing in agriculture simple, transparent, and accessible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-x-6">
            <div className="flex flex-col items-center text-center md:items-start md:text-left relative">
              <div className="absolute top-16 left-[calc(50%+1.5rem)] right-0 h-0.5 bg-primary/30 hidden md:block"></div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 z-10">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Projects</h3>
              <p className="text-muted-foreground max-w-xs">
                Explore our vetted selection of agricultural projects across ASEAN. Each project includes details about yield expectations, timelines, and sustainability practices.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center md:items-start md:text-left relative">
              <div className="absolute top-16 left-[calc(50%+1.5rem)] right-0 h-0.5 bg-primary/30 hidden md:block"></div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 z-10">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-muted-foreground max-w-xs">
                Link your Web3 wallet to AKAR. We support MetaMask, WalletConnect, and other popular options for a seamless investing experience.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center md:items-start md:text-left relative">
              <div className="absolute top-16 left-[calc(50%+1.5rem)] right-0 h-0.5 bg-primary/30 hidden md:block"></div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4 z-10">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Fund with $AKR</h3>
              <p className="text-muted-foreground max-w-xs">
                Invest any amount in projects that align with your goals. Your $AKR tokens represent ownership in real agricultural assets with defined return profiles.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Returns</h3>
              <p className="text-muted-foreground max-w-xs">
                Receive regular yield distributions from your investments. All returns come from real agricultural production, transparently tracked on the blockchain.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              onClick={handleExploreClick}
              className="gap-2"
            >
              Start Investing Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* AKR Token metrics */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">$AKR Token</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The native token of the AKAR ecosystem, used for investing in agricultural projects, governance, and earning yield from produce sales.
            </p>
          </div>
          
          {/* Keep existing token metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Token Price
                    </h3>
                    <p className="text-4xl font-bold mt-2">
                      ${tokenMetrics.price.toFixed(2)}
                      <span className={`text-sm ml-2 ${tokenMetrics.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tokenMetrics.change24h >= 0 ? '+' : ''}{tokenMetrics.change24h}%
                      </span>
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Live
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">24h Volume</span>
                    <span>$823,415</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span>${(tokenMetrics.marketCap / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Supply</span>
                    <span>{(tokenMetrics.totalSupply / 1000000).toFixed(1)}M AKR</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Token Allocation
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Staking</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ecosystem</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Team</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Reserve</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-purple-600" />
                      Token Utility
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full px-2">1</Badge>
                      <span>Stake in farm projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full px-2">2</Badge>
                      <span>Earn yield from produce sales</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full px-2">3</Badge>
                      <span>Governance voting rights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full px-2">4</Badge>
                      <span>Access to new project ICOs</span>
                    </li>
                  </ul>
                </div>
                
                <Button className="w-full mt-4" onClick={() => navigate('/tokenization')}>
                  View Token Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
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
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ASEAN Agricultural Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AKAR is helping transform farming across Indonesia, Thailand, Vietnam, Malaysia, and the Philippines
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Tractor className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Sustainable Farming</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our projects implement sustainable farming practices that reduce water usage by up to 90% compared to traditional methods.
              </p>
              <div className="mt-auto pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Impact:</span>
                  <span className="text-sm font-bold text-primary">2.3M Tons CO2 Saved</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Local Employment</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                AKAR projects have created over 15,000 jobs across rural communities in Indonesia, Thailand, and Vietnam.
              </p>
              <div className="mt-auto pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Impact:</span>
                  <span className="text-sm font-bold text-primary">15,300+ Jobs Created</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Economic Growth</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our platform has helped fund over $25M in agricultural projects, increasing farmer income by an average of 35%.
              </p>
              <div className="mt-auto pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Impact:</span>
                  <span className="text-sm font-bold text-primary">$25M+ Invested</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Investment Disclaimer */}
      <InvestmentDisclaimer />

      {/* Call to action */}
      <section className="py-20 bg-primary/10 dark:bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="px-3 py-1 text-sm bg-primary/20 text-primary border-primary/30 mb-4">
            Join 15,000+ Investors
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Fund the Future of ASEAN Agriculture?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Be part of the agricultural revolution while earning sustainable returns
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="default"
              onClick={handleExploreClick}
              className="gap-2"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo size="md" showText={false} />
              </div>
              
              <p className="text-muted-foreground">
                Revolutionizing agriculture across ASEAN through blockchain technology and sustainable farming investments.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><Link to="/farm-projects" className="text-muted-foreground hover:text-primary">Projects</Link></li>
                <li><Link to="/tokenization" className="text-muted-foreground hover:text-primary">$AKR Token</Link></li>
                <li><Link to="/analytics" className="text-muted-foreground hover:text-primary">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">WhitePaper</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">support@akar.farm</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Telegram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2023 AKAR Farm. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm">Terms</Button>
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => navigate('/admin-signup')}
              >
                <Lock className="h-4 w-4" />
                Admin Access
              </Button>
            </div>
          </div>
        </div>
      </footer>
      
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
