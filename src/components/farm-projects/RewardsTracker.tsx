
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Gift, ChevronsRight, Clock, Leaf, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTokenAmount } from "@/lib/utils";

interface RewardsTrackerProps {
  stakedAkr: number;
  pendingRewards: number;
  claimedRewards: number;
}

export const RewardsTracker: React.FC<RewardsTrackerProps> = ({
  stakedAkr,
  pendingRewards,
  claimedRewards
}) => {
  const { toast } = useToast();
  const [rewardsTab, setRewardsTab] = useState("overview");
  
  const totalPotentialRewards = stakedAkr * 0.15; // 15% of staked amount
  const rewardsProgress = (pendingRewards / totalPotentialRewards) * 100;
  
  // Mock rewards history
  const rewardsHistory = [
    { id: "r1", amount: 12.5, date: "2023-12-01", status: "Claimed" },
    { id: "r2", amount: 18.3, date: "2023-11-01", status: "Claimed" },
    { id: "r3", amount: 15.2, date: "2023-10-01", status: "Claimed" },
    { id: "r4", amount: 19.5, date: "2023-09-01", status: "Claimed" }
  ];

  // Mock rewards structure data
  const rewardCategories = [
    { 
      id: "base-rewards", 
      name: "Base Staking Rewards", 
      rate: "12% APY", 
      description: "Standard rewards for staking AGRI tokens",
      icon: <Leaf className="h-5 w-5 text-green-600" />
    },
    { 
      id: "bonus-rewards", 
      name: "Long-term Bonus", 
      rate: "+2% APY", 
      description: "Additional rewards for staking > 6 months",
      icon: <Clock className="h-5 w-5 text-blue-600" />
    },
    { 
      id: "referral-rewards", 
      name: "Referral Bonus", 
      rate: "+1% APY", 
      description: "Extra rewards for referring friends",
      icon: <Gift className="h-5 w-5 text-purple-600" />
    }
  ];

  // Mock upcoming rewards
  const upcomingRewards = [
    { date: "2024-05-01", amount: 25, description: "Monthly reward distribution" },
    { date: "2024-06-01", amount: 25, description: "Monthly reward distribution" },
    { date: "2024-07-01", amount: 27.5, description: "Monthly reward + 6-month bonus" }
  ];
  
  const handleClaimAll = () => {
    toast({
      title: "Claiming all rewards",
      description: `Claiming ${pendingRewards} AGRI. Please confirm the transaction in your wallet.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" value={rewardsTab} onValueChange={setRewardsTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="structure">Rewards Structure</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Rewards Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="text-muted-foreground">Rewards Accumulated</span>
                      <span>{pendingRewards} AGRI</span>
                    </div>
                    <Progress value={rewardsProgress} className="h-3" />
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="text-muted-foreground">Current Rewards</span>
                      <span className="text-muted-foreground">Max Potential: {totalPotentialRewards} AGRI</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">stAGRI to AGRI Flow</h4>
                      <span className="text-sm text-green-600 font-medium">+15% APY</span>
                    </div>
                    <div className="flex items-center gap-3 my-4">
                      <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center flex-1">
                        <p className="text-sm text-blue-800">stAGRI</p>
                        <p className="text-xl font-bold">{stakedAkr}</p>
                      </div>
                      <ChevronsRight className="text-muted-foreground" />
                      <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center flex-1">
                        <p className="text-sm text-green-800">Rewards</p>
                        <p className="text-xl font-bold">{pendingRewards} AGRI</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      disabled={pendingRewards <= 0}
                      onClick={handleClaimAll}
                    >
                      Claim All Rewards
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Rewards History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 flex justify-between">
                    <div>
                      <h3 className="font-medium">Total Claimed Rewards</h3>
                      <p className="text-muted-foreground text-sm">All time rewards claimed</p>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {claimedRewards} AGRI
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    {rewardsHistory.map(reward => (
                      <div key={reward.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 text-green-700 p-2 rounded-full">
                            <Gift className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{reward.amount} AGRI</p>
                            <p className="text-xs text-muted-foreground">{reward.date}</p>
                          </div>
                        </div>
                        <span className="text-sm text-green-600 font-medium">{reward.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Rewards Structure</CardTitle>
              <CardDescription>
                How stAGRI generates rewards from container farming operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">How stAGRI Works</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    When you stake your AGRI tokens into farm containers, you receive stAGRI tokens. These tokens represent your stake in the container's operations and entitle you to a portion of the farming profits.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-primary/5 rounded-lg">
                    <div className="flex-1 text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <p className="text-sm font-medium">You Stake</p>
                      <p className="text-xl font-bold">AGRI Tokens</p>
                      <p className="text-xs text-muted-foreground mt-1">Into farm containers</p>
                    </div>
                    <ArrowRight className="rotate-90 sm:rotate-0" />
                    <div className="flex-1 text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <p className="text-sm font-medium">You Receive</p>
                      <p className="text-xl font-bold">stAGRI Tokens</p>
                      <p className="text-xs text-muted-foreground mt-1">Staked position</p>
                    </div>
                    <ArrowRight className="rotate-90 sm:rotate-0" />
                    <div className="flex-1 text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <p className="text-sm font-medium">You Earn</p>
                      <p className="text-xl font-bold">AGRI Rewards</p>
                      <p className="text-xs text-muted-foreground mt-1">From farm produce</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Reward Categories</h3>
                  {rewardCategories.map(category => (
                    <div key={category.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="bg-primary/10 p-3 rounded-full">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      <div className="text-xl font-semibold text-green-600">
                        {category.rate}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-900/50 rounded-lg">
                  <div className="flex gap-2 items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-400">Important Note</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        APY rates are variable and depend on farm productivity. They are updated daily based on actual harvest yields and market prices of the produce.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Rewards</CardTitle>
              <CardDescription>
                Projected rewards based on your current staked positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Projected Earnings</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">+15% Annual Yield</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current stAGRI Balance</span>
                      <span className="font-medium">{formatTokenAmount(stakedAkr)} stAGRI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Yield (est.)</span>
                      <span className="font-medium">{formatTokenAmount(stakedAkr * 0.0125)} AGRI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Yield (est.)</span>
                      <span className="font-medium">{formatTokenAmount(stakedAkr * 0.15)} AGRI</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Scheduled Rewards</h3>
                  <div className="space-y-3">
                    {upcomingRewards.map((reward, index) => (
                      <div key={index} className="flex justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{reward.description}</p>
                          <p className="text-sm text-muted-foreground">{reward.date}</p>
                        </div>
                        <div className="text-xl font-semibold text-green-600">{reward.amount} AGRI</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 dark:text-green-400 mb-2">Maximize Your Rewards</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Increase your staked AGRI to earn more rewards. Long-term stakers (6+ months) receive bonus rewards automatically.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-3 border-green-300 text-green-700 hover:bg-green-100 hover:text-green-800"
                    onClick={() => window.location.href = "/farm-projects"}
                  >
                    Stake More AGRI
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
