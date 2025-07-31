
import React from "react";
import { useNavigate } from "react-router-dom";
import { ContainerProject, ContainerCard } from "@/components/containers/ContainerCard";
import { Button } from "@/components/ui/button";
import { Leaf, Wheat, Palmtree } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContainerProjectsListProps {
  containerProjects: ContainerProject[];
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

const ContainerProjectsList: React.FC<ContainerProjectsListProps> = ({
  containerProjects,
  isWalletConnected,
  onConnectWallet
}) => {
  const navigate = useNavigate();
  
  // Filter projects by status
  const liveProjects = containerProjects.filter(project => project.status === 'live');
  const upcomingProjects = containerProjects.filter(project => project.status === 'upcoming');
  const icoProjects = containerProjects.filter(project => project.status === 'ico');
  
  // Handle container selection
  const handleSelectContainer = (containerId: string) => {
    if (!isWalletConnected) {
      onConnectWallet();
      return;
    }
    navigate(`/project/${containerId}`);
  };
  
  // Get appropriate icon for container type
  const getContainerTypeIcon = (type: string) => {
    switch(type) {
      case 'leafy-greens':
        return <Leaf className="h-4 w-4" />;
      case 'strawberry':
        return <Palmtree className="h-4 w-4" />;
      default:
        return <Wheat className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Live Projects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="default">LIVE</Badge>
            <h2 className="text-xl font-semibold">Active Container Projects</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {liveProjects.length > 0 ? (
            liveProjects.map(container => (
              <ContainerCard
                key={container.id}
                container={container}
                onAction={handleSelectContainer}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">No active container projects available at the moment.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* ICO Projects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">ICO</Badge>
            <h2 className="text-xl font-semibold">Container ICO Projects</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {icoProjects.length > 0 ? (
            icoProjects.map(container => (
              <ContainerCard
                key={container.id}
                container={container}
                onAction={handleSelectContainer}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">No ICO projects available at the moment.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Upcoming Projects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">UPCOMING</Badge>
            <h2 className="text-xl font-semibold">Coming Soon</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingProjects.length > 0 ? (
            upcomingProjects.map(container => (
              <ContainerCard
                key={container.id}
                container={container}
                onAction={handleSelectContainer}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">No upcoming container projects available at the moment.</p>
            </div>
          )}
        </div>
      </div>
      
      {!isWalletConnected && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Connect your wallet to invest</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To invest in container projects and start earning stAGRI rewards, connect your wallet.
          </p>
          <Button onClick={onConnectWallet}>Connect Wallet</Button>
        </div>
      )}
    </div>
  );
};

export default ContainerProjectsList;
