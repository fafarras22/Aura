
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Gift, ChevronsRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  
  const totalPotentialRewards = stakedAkr * 0.15; // 15% of staked amount
  const rewardsProgress = (pendingRewards / totalPotentialRewards) * 100;
  
  // Mock rewards history
  const rewardsHistory = [
    { id: "r1", amount: 12.5, date: "2023-12-01", status: "Claimed" },
    { id: "r2", amount: 18.3, date: "2023-11-01", status: "Claimed" },
    { id: "r3", amount: 15.2, date: "2023-10-01", status: "Claimed" },
    { id: "r4", amount: 19.5, date: "2023-09-01", status: "Claimed" }
  ];
  
  const handleClaimAll = () => {
    toast({
      title: "Claiming all rewards",
      description: `Claiming ${pendingRewards} AKR. Please confirm the transaction in your wallet.`,
    });
  };
  
  return (
    <div className="space-y-6">
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
                  <span>{pendingRewards} AKR</span>
                </div>
                <Progress value={rewardsProgress} className="h-3" />
                <div className="flex justify-between mt-1 text-xs">
                  <span className="text-muted-foreground">Current Rewards</span>
                  <span className="text-muted-foreground">Max Potential: {totalPotentialRewards} AKR</span>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">stAKR to AKR Flow</h4>
                  <span className="text-sm text-green-600 font-medium">+15% APY</span>
                </div>
                <div className="flex items-center gap-3 my-4">
                  <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center flex-1">
                    <p className="text-sm text-blue-800">stAKR</p>
                    <p className="text-xl font-bold">{stakedAkr}</p>
                  </div>
                  <ChevronsRight className="text-muted-foreground" />
                  <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center flex-1">
                    <p className="text-sm text-green-800">Rewards</p>
                    <p className="text-xl font-bold">{pendingRewards} AKR</p>
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
                  {claimedRewards} AKR
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
                        <p className="font-medium">{reward.amount} AKR</p>
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
    </div>
  );
};
