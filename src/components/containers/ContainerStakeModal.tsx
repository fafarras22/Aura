
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useWallet } from "@/context/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { ContainerProject } from "@/components/containers/ContainerCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ConnectModalWithCallback } from '@/components/wallet/ConnectModalWithCallback';

interface ContainerStakeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  containerId: string | null;
}

export const ContainerStakeModal: React.FC<ContainerStakeModalProps> = ({
  open,
  onOpenChange,
  containerId,
}) => {
  const { wallet } = useWallet();
  const { toast } = useToast();
  const [stakeAmount, setStakeAmount] = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [container, setContainer] = useState<ContainerProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (containerId) {
      fetchContainerDetails(containerId);
    }
  }, [containerId]);

  const fetchContainerDetails = async (containerId: string) => {
    setIsLoading(true);
    try {
      // Mock implementation - replace with actual data fetching
      const allContainers = getMockContainerProjects();
      const mockContainer = allContainers.find(c => c.id === containerId);
      
      if (mockContainer) {
        setContainer(mockContainer);
      } else {
        toast({
          title: "Error",
          description: "Container details not found.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching container details:", error);
      toast({
        title: "Error",
        description: "Failed to load container details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStake = async () => {
    if (!wallet.connected) {
      setShowWalletModal(true);
      return;
    }

    if (!stakeAmount || isNaN(Number(stakeAmount))) {
      toast({
        title: "Error",
        description: "Please enter a valid stake amount.",
        variant: "destructive",
      });
      return;
    }

    const amount = Number(stakeAmount);
    if (amount <= 0) {
      toast({
        title: "Error",
        description: "Stake amount must be greater than zero.",
        variant: "destructive",
      });
      return;
    }

    // Mock staking process
    try {
      // Simulate staking transaction
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Success",
        description: `Successfully staked ${amount} tokens!`,
      });

      onOpenChange(false); // Close the modal after successful staking
    } catch (error) {
      console.error("Staking failed:", error);
      toast({
        title: "Error",
        description: "Failed to stake tokens. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stake in Container Project</DialogTitle>
          <DialogDescription>
            Stake your tokens in this container project to earn rewards.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <Card className="mb-4">
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ) : container ? (
          <Card className="mb-4">
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">{container.name}</h3>
              <p className="text-sm text-muted-foreground">
                {container.description || "No description provided."}
              </p>
              <Progress
                value={(container.filledTokens / container.totalTokens) * 100}
              />
              <p className="text-sm">
                {container.filledTokens} / {container.totalTokens} Tokens Filled
              </p>
            </CardContent>
          </Card>
        ) : (
          <p className="text-red-500">Failed to load container details.</p>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stakeAmount" className="text-right">
              Stake Amount
            </Label>
            <Input
              type="number"
              id="stakeAmount"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <Button onClick={handleStake}>Stake Tokens</Button>

        <ConnectModalWithCallback
          open={showWalletModal}
          onOpenChange={setShowWalletModal}
          onComplete={handleStake}
        />
      </DialogContent>
    </Dialog>
  );
};
