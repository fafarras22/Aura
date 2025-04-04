
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { ContainerProject } from "@/components/containers/ContainerCard";

interface StakeCardProps {
  container: ContainerProject;
  handleStakeClick: () => void;
}

const StakeCard = ({ container, handleStakeClick }: StakeCardProps) => {
  return (
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
  );
};

export default StakeCard;
