
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Leaf, Clock, TrendingUp, Users, ArrowRight, ChevronLeft, AlertCircle } from "lucide-react";
import { ContainerProject } from "@/components/containers/ContainerCard";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { useWallet } from "@/context/WalletContext";
import { useNavigate } from "react-router-dom";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { wallet } = useWallet();
  const { toast } = useToast();
  
  const [container, setContainer] = useState<ContainerProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  // Mock data for charts and stats
  const [investors, setInvestors] = useState<number>(0);

  useEffect(() => {
    if (id) {
      fetchContainerDetails(id);
      fetchInvestors(id);
    }
  }, [id]);
  
  const fetchContainerDetails = async (containerId: string) => {
    setLoading(true);
    try {
      // Try to fetch from database
      const { data, error } = await supabase
        .from('containers')
        .select('*')
        .eq('id', containerId)
        .single();

      if (error || !data) {
        // If error or no data, use mock data
        const mockContainer = {
          id: containerId,
          name: 'Container A - Premium Herbs',
          description: 'High-yield herb farming in climate-controlled environment',
          imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
          totalTokens: 1000,
          filledTokens: 960,
          apy: 12.5,
          runtimeDays: 365,
          status: 'live' as 'live'
        };
        
        setContainer(mockContainer);
        return;
      }

      // Transform the database data
      const containerData: ContainerProject = {
        id: data.id,
        name: data.name,
        description: data.description || undefined,
        imageUrl: data.image_url || undefined,
        totalTokens: data.total_tokens || 1000,
        filledTokens: data.filled_tokens || 0,
        apy: data.apy || 12.5,
        runtimeDays: data.runtime_days || 365,
        status: data.status as 'live' | 'upcoming' | 'completed' | 'ico' || 'live'
      };

      setContainer(containerData);
    } catch (error) {
      console.error('Error fetching container details:', error);
      toast({
        title: 'Error',
        description: 'Could not load container details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchInvestors = async (containerId: string) => {
    try {
      const { data, error, count } = await supabase
        .from('token_investments')
        .select('*', { count: 'exact' })
        .eq('container_id', containerId);
        
      if (error) throw error;
      
      setInvestors(count || Math.floor(Math.random() * 50) + 5);
    } catch (error) {
      console.error('Error fetching investors:', error);
      // Set fallback value
      setInvestors(Math.floor(Math.random() * 50) + 5);
    }
  };

  const handleStakeClick = () => {
    if (!wallet.connected) {
      setShowWalletModal(true);
      return;
    }
    
    setShowStakeModal(true);
  };

  if (loading || !container) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const progressPercentage = (container.filledTokens / container.totalTokens) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/projects')}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Projects
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="relative overflow-hidden rounded-xl border">
            <img 
              src={container.imageUrl || 'https://via.placeholder.com/1200x600?text=AKAR+Farm'} 
              alt={container.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant={
                      container.status === 'live' ? "default" : 
                      container.status === 'upcoming' ? "outline" : 
                      container.status === 'ico' ? "secondary" : 
                      "destructive"
                    }
                    className="uppercase text-xs"
                  >
                    {container.status}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold">{container.name}</h1>
                <p className="text-gray-200 mt-1">{container.description}</p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="investors">Investors</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center rounded-full border-4 border-green-100 p-2 mb-2">
                        <Leaf className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold">{container.status === 'completed' ? '100%' : progressPercentage.toFixed(1) + '%'}</h3>
                      <p className="text-sm text-muted-foreground">Funded</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center rounded-full border-4 border-blue-100 p-2 mb-2">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold">{container.apy}%</h3>
                      <p className="text-sm text-muted-foreground">Target APY</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center rounded-full border-4 border-purple-100 p-2 mb-2">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold">{container.runtimeDays}</h3>
                      <p className="text-sm text-muted-foreground">Duration (days)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {container.description || `This container farm project uses advanced hydroponic systems to grow premium produce with minimal water usage and no pesticides. Located strategically for optimal distribution, this project aims to deliver fresh produce to local markets while generating stable returns for token holders.
                    
                    The container is equipped with IoT sensors for real-time monitoring and uses AI to optimize growing conditions. Each AKR token represents fractional ownership in this farm, entitling holders to proportional returns from produce sales.`}
                  </p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span>{progressPercentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{container.filledTokens} AKR</span>
                        <span>{container.totalTokens} AKR</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="investors" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Investors</CardTitle>
                  <CardDescription>People investing in this farm project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-6 text-center">
                    <div>
                      <div className="flex items-center justify-center rounded-full bg-blue-100 p-6 mx-auto mb-4">
                        <Users className="h-12 w-12 text-blue-600" />
                      </div>
                      <h3 className="text-3xl font-bold">{investors}</h3>
                      <p className="text-muted-foreground">Total investors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="updates" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Updates</CardTitle>
                  <CardDescription>Latest news from the farm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {container.status === 'upcoming' ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>No updates yet</AlertTitle>
                      <AlertDescription>
                        This project is coming soon. Updates will be posted here once the project goes live.
                      </AlertDescription>
                    </Alert>
                  ) : container.status === 'live' ? (
                    <>
                      <div className="border-l-2 border-green-500 pl-4 py-2">
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                        <h3 className="font-medium">First harvest completed</h3>
                        <p className="text-sm text-muted-foreground">
                          The first harvest has been completed with yields exceeding initial projections by 15%.
                        </p>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-4 py-2">
                        <p className="text-xs text-muted-foreground">Last week</p>
                        <h3 className="font-medium">Distribution partnerships secured</h3>
                        <p className="text-sm text-muted-foreground">
                          We've secured three new distribution partnerships with local supermarkets.
                        </p>
                      </div>
                    </>
                  ) : container.status === 'ico' ? (
                    <div className="border-l-2 border-purple-500 pl-4 py-2">
                      <p className="text-xs text-muted-foreground">Today</p>
                      <h3 className="font-medium">ICO now live</h3>
                      <p className="text-sm text-muted-foreground">
                        The Initial Container Offering is now live. Be among the first to participate in this exciting project.
                      </p>
                    </div>
                  ) : (
                    <div className="border-l-2 border-green-500 pl-4 py-2">
                      <p className="text-xs text-muted-foreground">Last month</p>
                      <h3 className="font-medium">Project completed successfully</h3>
                      <p className="text-sm text-muted-foreground">
                        This container farm project has completed its full cycle with an average return of {container.apy}% APY for investors.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stake in this Project</CardTitle>
              <CardDescription>Secure your AKR tokens allocation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available tokens</span>
                  <span>{container.totalTokens - container.filledTokens} AKR</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Token price</span>
                  <span>$15.00 USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minimum investment</span>
                  <span>$150.00 (10 AKR)</span>
                </div>
              </div>
              
              <div className="h-px bg-border my-2" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge 
                    variant={
                      container.status === 'live' ? "default" : 
                      container.status === 'upcoming' ? "outline" : 
                      container.status === 'ico' ? "secondary" : 
                      "destructive"
                    }
                  >
                    {container.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Start date</span>
                  <span>May 1, 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target APY</span>
                  <span className="text-green-600 font-medium">{container.apy}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleStakeClick} 
                className="w-full gap-2"
                disabled={container.status === 'completed'}
              >
                {container.status === 'ico' ? 'Participate in ICO' : 'Stake Now'} 
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Market risk</span>
                <div className="flex">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-2 h-8 bg-green-500 mx-0.5 rounded-sm" />
                  ))}
                  {[4, 5].map((i) => (
                    <div key={i} className="w-2 h-8 bg-gray-200 mx-0.5 rounded-sm" />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Technical risk</span>
                <div className="flex">
                  {[1, 2].map((i) => (
                    <div key={i} className="w-2 h-8 bg-green-500 mx-0.5 rounded-sm" />
                  ))}
                  {[3, 4, 5].map((i) => (
                    <div key={i} className="w-2 h-8 bg-gray-200 mx-0.5 rounded-sm" />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Operational risk</span>
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-2 h-8 bg-green-500 mx-0.5 rounded-sm" />
                  ))}
                  {[5].map((i) => (
                    <div key={i} className="w-2 h-8 bg-gray-200 mx-0.5 rounded-sm" />
                  ))}
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                This project has been vetted by the AKAR team and is considered to have a low to moderate risk profile.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <ContainerStakeModal
        open={showStakeModal}
        onOpenChange={setShowStakeModal}
        containerId={id || null}
      />
      
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
      />
    </div>
  );
};

export default ProjectDetails;
