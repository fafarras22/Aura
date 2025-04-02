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
import { useWallet } from "@/context/WalletContext";
import { useDBSetup } from "@/lib/db-setup";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo/Logo";
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
  DollarSign
} from "lucide-react";
import { Helmet } from "react-helmet";

// Mock featured container data
const FEATURED_CONTAINERS: ContainerProject[] = [
  {
    id: 'container-a',
    name: 'Container A - Premium Herbs',
    description: 'High-yield herb farming in climate-controlled environment',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    totalTokens: 1000,
    filledTokens: 960,
    apy: 12.5,
    runtimeDays: 365,
    status: 'live'
  },
  {
    id: 'container-b',
    name: 'Container B - Exotic Fruits',
    description: 'Specialized container for rare tropical fruits',
    imageUrl: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    totalTokens: 1000,
    filledTokens: 200,
    apy: 18.5,
    runtimeDays: 365,
    status: 'live'
  },
  {
    id: 'container-c',
    name: 'Container C - Organic Greens ICO',
    description: 'Initial container offering for new organic greens project',
    imageUrl: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    totalTokens: 1000,
    filledTokens: 100,
    apy: 15.0,
    runtimeDays: 180,
    status: 'ico'
  }
];

const Home = () => {
  const [language, setLanguage] = useState<'en' | 'id' | 'ko'>('en');
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
        .limit(3);
        
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
          status: item.status as 'live' | 'upcoming' | 'completed' | 'ico' || 'live'
        }));
        
        setFeaturedContainers(transformedData);
      } else {
        // Use mock data if no database data
        setFeaturedContainers(FEATURED_CONTAINERS);
      }
    } catch (error) {
      console.error('Error fetching featured containers:', error);
      // Fallback to mock data
      setFeaturedContainers(FEATURED_CONTAINERS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExploreClick = () => {
    navigate('/projects');
  };

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };
  
  const handleContainerSelect = (containerId: string) => {
    setSelectedContainerId(containerId);
    setShowStakeModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Helmet>
        <title>AKAR FarmWatch - Sustainable Container Farming Investments</title>
        <meta name="description" content="Invest in sustainable container farming with AKAR. Stake AKR tokens and earn rewards from farm produce." />
        <html lang={language} />
      </Helmet>

      {/* Header/Navigation */}
      <header className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-950/90">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="lg" showText={true} />
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/projects" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                Projects
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/tokenization" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                Token
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
                      variant={language === 'ko' ? "default" : "ghost"} 
                      onClick={() => setLanguage('ko')}
                      className="justify-start"
                    >
                      한국어
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

      {/* Hero section with immediate investment focus */}
      <section className="py-12 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/30">
                Sustainable Farming on Blockchain
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gray-900 dark:text-gray-100">Invest in </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Container Farming
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                Stake $AKR tokens, own a share of container farms, and earn consistent returns from real agricultural production.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gap-2 group"
                  onClick={handleExploreClick}
                >
                  Explore Projects
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="text-2xl font-bold">12-20%</div>
                  <div className="text-sm text-muted-foreground">Annual Yield</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Transparent</div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden border shadow-lg">
              <img 
                src={"/lovable-uploads/1fe7dc27-86fd-4951-be87-72e09e824c9b.png"}
                alt="AKAR Container Farming"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured container projects */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <p className="text-muted-foreground">Invest in these high-yield container farming projects</p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleExploreClick}
              className="gap-2"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-md bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredContainers.map((container) => (
                <ContainerCard
                  key={container.id}
                  container={container}
                  onAction={handleContainerSelect}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* AKR Token metrics */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">$AKR Token</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The native token of the AKAR ecosystem, used for staking, governance, and earning yield from container farming projects.
            </p>
          </div>
          
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
      
      {/* How it works */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Investing in container farming with AKAR is simple, transparent, and secure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-muted-foreground">
                Connect your Web3 wallet to get started. We support MetaMask, WalletConnect, and more.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Projects</h3>
              <p className="text-muted-foreground">
                Browse and select from our vetted container farming projects with various APY options.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Terminal className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Stake AKR</h3>
              <p className="text-muted-foreground">
                Stake your AKR tokens in your chosen projects to become a digital farmer.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
              <p className="text-muted-foreground">
                Receive regular returns from real farming operations, with full transparency.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              onClick={handleExploreClick}
              className="gap-2"
            >
              Explore Projects Now
              <ArrowRight className="h-4 w-4" />
            </Button>
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
              <Tabs defaultValue="security" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                  <TabsTrigger value="technology">Technology</TabsTrigger>
                </TabsList>
                
                <div data-state="active" data-value="security" role="tabpanel" className="space-y-6 mt-4" tabIndex={0}>
                  <h2 className="text-3xl font-bold">Secure by Design</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    AKAR's blockchain technology ensures immutable records, transparent transactions, and secure ownership of your farm investments. Every token is backed by real agricultural assets.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Audited Smart Contracts</h4>
                        <p className="text-sm text-muted-foreground">All code audited by security experts</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Asset-Backed Tokens</h4>
                        <p className="text-sm text-muted-foreground">Each token represents real farm assets</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div data-state="inactive" data-value="sustainability" role="tabpanel" className="space-y-6 mt-4 hidden" tabIndex={-1}>
                  <h2 className="text-3xl font-bold">Sustainable Agriculture</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our container farms use 95% less water than traditional farming while producing up to 300% more yield per square meter, creating truly sustainable food production.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Zero Pesticides</h4>
                        <p className="text-sm text-muted-foreground">Clean growing environment eliminates need for chemicals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Carbon Negative</h4>
                        <p className="text-sm text-muted-foreground">Our operations remove more carbon than they emit</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div data-state="inactive" data-value="technology" role="tabpanel" className="space-y-6 mt-4 hidden" tabIndex={-1}>
                  <h2 className="text-3xl font-bold">Cutting-Edge Technology</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced IoT sensors, machine learning algorithms, and blockchain integration create a truly next-generation farming platform.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Terminal className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">AI-Powered Growth</h4>
                        <p className="text-sm text-muted-foreground">Machine learning optimizes growth conditions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Terminal className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Real-Time Monitoring</h4>
                        <p className="text-sm text-muted-foreground">24/7 remote monitoring and control</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-20 bg-primary/10 dark:bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Farming?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of investors already earning sustainable returns from container farming projects
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
                <Logo size="md" showText={true} />
              </div>
              
              <p className="text-muted-foreground">
                Revolutionizing farming through sustainable container technology and blockchain tokenization.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><Link to="/projects" className="text-muted-foreground hover:text-primary">Farm Projects</Link></li>
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
              © 2023 AKAR FarmWatch. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm">Terms</Button>
              <Button variant="ghost" size="sm">Privacy</Button>
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
