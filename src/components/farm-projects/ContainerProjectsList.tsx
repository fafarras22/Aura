import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { InfoIcon, TrendingUp, Leaf, Fish, Tractor, Sun, Droplets } from "lucide-react";
import { ContainerProject } from '@/components/containers/ContainerCard';

interface ContainerProjectsListProps {
  containerProjects: ContainerProject[];
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

const getActionLabel = (status: string) => {
  switch (status) {
    case 'live': return 'Stake Now';
    case 'ico': return 'Join ICO';
    case 'upcoming': return 'Set Reminder';
    case 'completed': return 'View Details';
    default: return 'View Details';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'live': return 'LIVE';
    case 'ico': return 'ICO';
    case 'upcoming': return 'UPCOMING';
    case 'completed': return 'COMPLETED';
    default: return 'UNKNOWN';
  }
};

const getProjectTypeIcon = (type: string | undefined) => {
  switch (type) {
    case 'fishery': return <Fish className="h-4 w-4 text-blue-500" />;
    case 'cattle': return <Tractor className="h-4 w-4 text-amber-600" />;
    case 'palm-oil': return <Sun className="h-4 w-4 text-yellow-500" />;
    case 'rice': return <Droplets className="h-4 w-4 text-teal-500" />;
    case 'greenhouse':
    case 'container':
    default: return <Leaf className="h-4 w-4 text-green-600" />;
  }
};

const ProjectCard: React.FC<{ container: ContainerProject; onAction: (containerId: string) => void }> = ({ container, onAction }) => {
  const percentFilled = (container.filledTokens / container.totalTokens) * 100;
  const availableTokens = container.totalTokens - container.filledTokens;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={container.imageUrl || '/placeholder-image.jpg'} 
          alt={container.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge 
            variant={
              container.status === 'live' ? "default" : 
              container.status === 'ico' ? "secondary" : 
              container.status === 'upcoming' ? "outline" : 
              "destructive"
            }
          >
            {getStatusLabel(container.status)}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg leading-tight">{container.name}</h3>
            <div className="flex items-center gap-1">
              {getProjectTypeIcon(container.type)}
              <span className="text-xs text-muted-foreground">{container.type || 'Container'}</span>
            </div>
          </div>
          {container.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{container.description}</p>
          )}
          {container.location && (
            <div className="text-xs text-muted-foreground">
              Location: {container.location}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-muted-foreground">APY</div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="font-bold text-green-600">{container.apy.toFixed(1)}%</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Runtime</div>
            <div className="font-bold">{container.runtimeDays} days</div>
          </div>
        </div>

        <div className="space-y-1">
          {(container.status === 'ico' || container.status === 'upcoming') ? (
            <>
              <div className="flex justify-between text-sm">
                <span>Funding Progress</span>
                <span className="font-medium">{percentFilled.toFixed(1)}%</span>
              </div>
              <Progress value={percentFilled} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{container.filledTokens.toLocaleString()} AKR</span>
                <span>{container.totalTokens.toLocaleString()} AKR</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between text-sm">
                <span>Available Slots</span>
                <span className="font-medium">{availableTokens.toLocaleString()} / {container.totalTokens.toLocaleString()} AKR</span>
              </div>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={() => onAction(container.id)} 
          className="w-full"
          variant={container.status === 'completed' ? "outline" : "default"}
        >
          {getActionLabel(container.status)}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ContainerProjectsList: React.FC<ContainerProjectsListProps> = ({ 
  containerProjects, 
  isWalletConnected, 
  onConnectWallet 
}) => {
  const handleContainerSelect = (containerId: string) => {
    console.log(`Container ${containerId} selected`);
    // Handle container selection logic here
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {containerProjects.map((project) => (
        <ProjectCard key={project.id} container={project} onAction={handleContainerSelect} />
      ))}
    </div>
  );
};
