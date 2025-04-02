
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/context/WalletContext";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { shortenAddress } from "@/lib/utils";
import { 
  ChevronLeft, 
  Clock, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  ArrowRight, 
  BarChart3, 
  CircleDollarSign, 
  FileText,
  Leaf
} from "lucide-react";

const FarmProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { wallet } = useWallet();
  
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    // Fetch project details
    const projects = getMockContainerProjects();
    const foundProject = projects.find(p => p.id === id);
    
    if (foundProject) {
      setProject({
        ...foundProject,
        investors: Math.floor(Math.random() * 50) + 5,
        recentUpdates: [
          {
            id: 'update-1',
            date: 'Yesterday',
            title: 'First harvest completed',
            description: 'The first harvest has been completed with yields exceeding initial projections by 15%.'
          },
          {
            id: 'update-2',
            date: 'Last week',
            title: 'Distribution partnerships secured',
            description: 'We\'ve secured three new distribution partnerships with local supermarkets.'
          }
        ],
        riskAssessment: {
          market: 3,
          technical: 2,
          operational: 4
        },
        tokenPrice: 15.00,
        minInvestment: 10
      });
    }
    
    setLoading(false);
  }, [id]);

  const handleStake = () => {
    if (!wallet.connected) {
      setShowWalletModal(true);
      return;
    }

    toast({
      title: "Staking tokens",
      description: "Please confirm the transaction in your wallet",
    });
  };

  if (loading || !project) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const progressPercentage = (project.filledTokens / project.totalTokens) * 100;

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>{project.name} | AKAR Farm</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/farm-projects')}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Farm Projects
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="relative overflow-hidden rounded-xl border">
              <img 
                src={project.imageUrl || 'https://via.placeholder.com/1200x600?text=AKAR+Farm'} 
                alt={project.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant={
                        project.status === 'live' ? "default" : 
                        project.status === 'upcoming' ? "outline" : 
                        project.status === 'ico' ? "secondary" : 
                        "destructive"
                      }
                      className="uppercase text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <h1 className="text-2xl font-bold">{project.name}</h1>
                  <p className="text-gray-200 mt-1">{project.description || "High-yield farm container with advanced climate control technology."}</p>
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
                        <h3 className="text-xl font-bold">{progressPercentage.toFixed(1)}%</h3>
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
                        <h3 className="text-xl font-bold">{project.apy}%</h3>
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
                        <h3 className="text-xl font-bold">{project.runtimeDays}</h3>
                        <p className="text-sm text-muted-foreground">Duration (days)</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Container Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {project.description || 
                        `This container farm project uses advanced hydroponic systems to grow premium produce with minimal water usage and no pesticides. 
                        Located strategically for optimal distribution, this project aims to deliver fresh produce to local markets while generating 
                        stable returns for token holders.
                        
                        The container is equipped with IoT sensors for real-time monitoring and uses AI to optimize growing conditions. Each AKR token 
                        represents fractional ownership in this farm, entitling holders to proportional returns from produce sales.`
                      }
                    </p>
                    
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{progressPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{project.filledTokens} AKR</span>
                          <span>{project.totalTokens} AKR</span>
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
                    <CardDescription>People investing in this farm container</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center py-6 text-center">
                      <div>
                        <div className="flex items-center justify-center rounded-full bg-blue-100 p-6 mx-auto mb-4">
                          <Users className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-3xl font-bold">{project.investors}</h3>
                        <p className="text-muted-foreground">Total investors</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Top Investors</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 rounded-md bg-muted/50">
                          <div className="text-sm">
                            <span className="font-medium">{shortenAddress('0x1a2b3c4d5e6f7g8h9i0j')}</span>
                            <span className="text-muted-foreground ml-2">Since Jun 12, 2023</span>
                          </div>
                          <span className="font-medium">200 AKR</span>
                        </div>
                        <div className="flex justify-between p-2 rounded-md bg-muted/50">
                          <div className="text-sm">
                            <span className="font-medium">{shortenAddress('0xabcdef1234567890abcdef')}</span>
                            <span className="text-muted-foreground ml-2">Since Jun 15, 2023</span>
                          </div>
                          <span className="font-medium">150 AKR</span>
                        </div>
                        <div className="flex justify-between p-2 rounded-md bg-muted/50">
                          <div className="text-sm">
                            <span className="font-medium">{shortenAddress('0x9876543210abcdef123456')}</span>
                            <span className="text-muted-foreground ml-2">Since Jun 18, 2023</span>
                          </div>
                          <span className="font-medium">100 AKR</span>
                        </div>
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
                    {project.status === 'upcoming' ? (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>No updates yet</AlertTitle>
                        <AlertDescription>
                          This project is coming soon. Updates will be posted here once the project goes live.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <>
                        {project.recentUpdates.map((update: any) => (
                          <div key={update.id} className="border-l-2 border-green-500 pl-4 py-2">
                            <p className="text-xs text-muted-foreground">{update.date}</p>
                            <h3 className="font-medium">{update.title}</h3>
                            <p className="text-sm text-muted-foreground">{update.description}</p>
                          </div>
                        ))}
                      </>
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
                    <span>{project.totalTokens - project.filledTokens} AKR</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Token price</span>
                    <span>${project.tokenPrice.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Minimum investment</span>
                    <span>${(project.minInvestment * project.tokenPrice).toFixed(2)} ({project.minInvestment} AKR)</span>
                  </div>
                </div>
                
                <div className="h-px bg-border my-2" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge 
                      variant={
                        project.status === 'live' ? "default" : 
                        project.status === 'upcoming' ? "outline" : 
                        project.status === 'ico' ? "secondary" : 
                        "destructive"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Start date</span>
                    <span>May 1, 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target APY</span>
                    <span className="text-green-600 font-medium">{project.apy}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleStake} 
                  className="w-full gap-2"
                  disabled={project.status === 'completed'}
                >
                  {project.status === 'ico' ? 'Participate in ICO' : 'Stake Now'} 
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
                    {Array(5).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-8 mx-0.5 rounded-sm ${i < project.riskAssessment.market ? 'bg-green-500' : 'bg-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Technical risk</span>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-8 mx-0.5 rounded-sm ${i < project.riskAssessment.technical ? 'bg-green-500' : 'bg-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Operational risk</span>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-8 mx-0.5 rounded-sm ${i < project.riskAssessment.operational ? 'bg-green-500' : 'bg-gray-200'}`} 
                      />
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
      </div>
      
      <WalletConnectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
      />
    </div>
  );
};

export default FarmProjectDetails;
