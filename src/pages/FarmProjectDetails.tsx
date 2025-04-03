
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  Users,
  Calendar,
  Info,
  AlertCircle
} from "lucide-react";
import { useWallet } from "@/context/wallet";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { useToast } from "@/hooks/use-toast";

const FarmProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { wallet } = useWallet();
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  // Get all container projects
  const allProjects = getMockContainerProjects();
  
  // Find the specific project
  const project = allProjects.find(project => project.id === id);
  
  // Handle stake submit
  const handleStake = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wallet.connected) {
      setIsWalletModalOpen(true);
      return;
    }
    
    // Parse amount
    const amount = parseFloat(stakeAmount);
    
    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Staking Initiated",
      description: `Staking ${amount} AKR in ${project?.name}. Please confirm the transaction in your wallet.`,
    });
  };
  
  // Return to projects list
  const handleBack = () => {
    navigate("/farm-projects");
  };
  
  if (!project) {
    return (
      <div className="container mx-auto p-6">
        <Helmet>
          <title>Project Not Found | AKAR Farm</title>
        </Helmet>
        
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  // Calculate available tokens
  const availableTokens = project.totalTokens - project.filledTokens;
  const progressPercentage = (project.filledTokens / project.totalTokens) * 100;
  
  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>{project.name} | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <Button 
          variant="ghost" 
          className="w-fit" 
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader>
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <CardTitle className="text-2xl">{project.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">{project.description}</p>
                  </div>
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
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-md p-4 flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current APY</p>
                      <p className="text-xl font-bold text-green-600">{project.apy}%</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-md p-4 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-xl font-bold">{project.runtimeDays} days</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-md p-4 flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Investors</p>
                      <p className="text-xl font-bold">{Math.floor(project.filledTokens / 100)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Allocation Progress</span>
                    <span className="font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  
                  <Progress value={progressPercentage} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{availableTokens} / {project.totalTokens} AKR</span>
                    <span className="text-muted-foreground">Remaining</span>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Project Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                      <p className="font-medium">September 15, 2023</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">End Date</p>
                      <p className="font-medium">September 15, 2024</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Reward Distribution</p>
                      <p className="font-medium">Monthly</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Minimum Stake</p>
                      <p className="font-medium">50 AKR</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Stake $AKR</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStake} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="stake-amount" className="text-sm font-medium">
                      Amount to Stake
                    </label>
                    <div className="relative">
                      <Input
                        id="stake-amount"
                        type="number"
                        placeholder="0"
                        min="50"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="pr-12"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-muted-foreground">AKR</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum stake: 50 AKR
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>You will receive</span>
                      <span>{stakeAmount ? parseFloat(stakeAmount) : 0} stAKR</span>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span>Estimated APY</span>
                      <span className="text-green-600">{project.apy}%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span>Duration</span>
                      <span>{project.runtimeDays} days</span>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span>Rewards distribution</span>
                      <span>Monthly</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={!stakeAmount || parseFloat(stakeAmount) < 50 || project.status !== 'live'}
                    >
                      {!wallet.connected ? 'Connect Wallet' : 'Stake Now'}
                    </Button>
                    
                    {project.status !== 'live' && (
                      <p className="text-xs text-center text-amber-500 mt-2">
                        {project.status === 'upcoming' ? 'This project is not yet open for staking' :
                         project.status === 'ico' ? 'This project is in ICO phase' : 
                         'This project is not available for staking'}
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Next Distribution</p>
                      <p className="font-medium">October 15, 2023</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-3">Projected Earnings (100 AKR stake)</p>
                    
                    <table className="w-full text-sm">
                      <tbody>
                        <tr>
                          <td className="py-1">Monthly</td>
                          <td className="py-1 text-right font-medium">{(project.apy / 12).toFixed(2)} AKR</td>
                        </tr>
                        <tr>
                          <td className="py-1">Quarterly</td>
                          <td className="py-1 text-right font-medium">{(project.apy / 4).toFixed(2)} AKR</td>
                        </tr>
                        <tr>
                          <td className="py-1">Yearly</td>
                          <td className="py-1 text-right font-medium">{project.apy.toFixed(2)} AKR</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <WalletConnectModal
        open={isWalletModalOpen}
        onOpenChange={setIsWalletModalOpen}
      />
    </div>
  );
};

export default FarmProjectDetails;
