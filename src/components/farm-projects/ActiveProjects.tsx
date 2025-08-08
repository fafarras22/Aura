
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, Coins, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ActiveProjects: React.FC = () => {
  const { toast } = useToast();
  
  // Mock data for active projects
  const activeProjects = [
    {
      id: "stake-1",
      name: "Container A - Premium Herbs",
      containerNumber: "001",
      stakedAmount: 200,
      stakedDate: "2023-11-01",
      currentApy: 12.5,
      endDate: "2024-11-01",
      timeRemaining: 65, // percentage
      pendingRewards: 8.2,
      imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8"
    },
    {
      id: "stake-2",
      name: "Container D - Microgreens Expansion",
      containerNumber: "004",
      stakedAmount: 100,
      stakedDate: "2023-12-15",
      currentApy: 14.2,
      endDate: "2024-12-15",
      timeRemaining: 72, // percentage
      pendingRewards: 3.5,
      imageUrl: "https://images.unsplash.com/photo-1620654458511-52bb2fc847dc"
    }
  ];
  
  const handleClaim = (projectId: string, amount: number) => {
    toast({
      title: "Claiming rewards",
      description: `Claiming ${amount} UMBI from project ${projectId}`,
    });
  };
  
  const handleUnstake = (projectId: string) => {
    toast({
      title: "Unstaking tokens",
      description: "Please confirm the transaction in your wallet",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Active Stakes</CardTitle>
        </CardHeader>
        <CardContent>
          {activeProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {activeProjects.map(project => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 h-48 md:h-auto">
                      <img 
                        src={project.imageUrl} 
                        alt={project.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold">{project.name}</h3>
                          <p className="text-muted-foreground">Container {project.containerNumber}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="gap-2"
                            onClick={() => handleUnstake(project.id)}
                          >
                            <Coins className="h-4 w-4" />
                            Unstake
                          </Button>
                          
                          <Button 
                            size="sm"
                            className="gap-2"
                            onClick={() => handleClaim(project.id, project.pendingRewards)}
                          >
                            <TrendingUp className="h-4 w-4" />
                            Claim {project.pendingRewards} UMBI
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Staked Amount</p>
                          <p className="text-xl font-bold">{project.stakedAmount} UMBI</p>
                          <p className="text-xs text-muted-foreground">Since {project.stakedDate}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Real-time APY</p>
                          <p className="text-xl font-bold text-green-600">{project.currentApy}%</p>
                          <p className="text-xs text-muted-foreground">Updated daily</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Pending Rewards</p>
                          <p className="text-xl font-bold">{project.pendingRewards} UMBI</p>
                          <p className="text-xs text-muted-foreground">Claimable anytime</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Time Remaining</span>
                          </div>
                          <span className="text-sm">{project.timeRemaining}%</span>
                        </div>
                        <Progress value={project.timeRemaining} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Until {project.endDate}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 text-amber-700 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1">No Active Stakes</h3>
              <p className="text-muted-foreground mb-4">You don't have any active stakes in farm projects.</p>
              <Button onClick={() => window.location.href = "/farm-projects"}>Browse Projects</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
