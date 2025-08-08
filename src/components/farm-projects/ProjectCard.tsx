
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Timer, Coins } from "lucide-react";
import { ContainerProject } from "@/components/containers/ContainerCard";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: ContainerProject;
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isWalletConnected,
  onConnectWallet 
}) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  
  // Calculate progress percentage
  const progressPercentage = (project.filledTokens / project.totalTokens) * 100;
  
  // Format remaining tokens
  const remainingTokens = project.totalTokens - project.filledTokens;
  
  // Default image if the project image is missing or fails to load
  const displayImage = imgError || !project.imageUrl
    ? 'https://images.unsplash.com/photo-1473187983305-f615310e7daa'
    : project.imageUrl;
    
  const handleViewDetails = () => {
    navigate(`/farm-projects/${project.id}`);
  };
  
  const handleStake = () => {
    if (!isWalletConnected) {
      onConnectWallet();
      return;
    }
    navigate(`/farm-projects/${project.id}`);
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all border border-gray-200 hover:border-primary/40">
      <div className="h-40 overflow-hidden">
        <img 
          src={displayImage} 
          alt={project.name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
      
      <CardContent className="py-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{project.name}</h3>
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
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Staking Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining</span>
            <span className="font-medium">{remainingTokens} / {project.totalTokens} UMBI</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="font-semibold">{project.apy}%</span>
            </div>
            <p className="text-xs text-muted-foreground">APY</p>
          </div>
          
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Clock className="h-4 w-4" />
              <span className="font-semibold">{project.runtimeDays}</span>
            </div>
            <p className="text-xs text-muted-foreground">Duration (days)</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2">
        <Button 
          variant="outline"
          className="flex-1"
          onClick={handleViewDetails}
        >
          Details
        </Button>
        <Button 
          className="flex-1"
          onClick={handleStake}
        >
          Stake
        </Button>
      </CardFooter>
    </Card>
  );
};
