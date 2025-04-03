
import React, { useState } from "react";
import { ContainerCard } from "@/components/containers/ContainerCard";
import { ContainerDetailsCard } from "@/components/containers/ContainerDetailsCard";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Wallet, Info, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContainerProjectsListProps {
  containerProjects: any[];
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

export const ContainerProjectsList: React.FC<ContainerProjectsListProps> = ({
  containerProjects,
  isWalletConnected,
  onConnectWallet
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "details">("grid");
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  const filteredProjects = selectedFilter === "all" 
    ? containerProjects 
    : containerProjects.filter(container => container.status === selectedFilter);
  
  const handleContainerAction = (containerId: string) => {
    const container = containerProjects.find(c => c.id === containerId);
    
    if (container.status === 'completed') {
      // Just show details for completed projects
      setSelectedContainerId(containerId);
      setIsDetailsModalOpen(true);
      return;
    }
    
    if (!isWalletConnected) {
      onConnectWallet();
      return;
    }
    
    setSelectedContainerId(containerId);
    setIsStakeModalOpen(true);
  };

  const handleDetailsView = (containerId: string) => {
    setSelectedContainerId(containerId);
    setIsDetailsModalOpen(true);
  };
  
  const selectedContainer = containerProjects.find(c => c.id === selectedContainerId);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="ico">ICO</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              Grid
            </Button>
            <Button 
              variant={viewMode === "details" ? "default" : "ghost"}
              size="sm" 
              onClick={() => setViewMode("details")}
              className="rounded-none"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
      
      {!isWalletConnected && viewMode === "grid" && (
        <Alert variant="default" className="border-blue-300 bg-blue-50 dark:bg-blue-900/20">
          <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle>Connect Your Wallet</AlertTitle>
          <AlertDescription>
            Connect your wallet to stake $AKR tokens and earn rewards from farm container projects.
          </AlertDescription>
        </Alert>
      )}
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No Projects Found</h3>
          <p className="text-muted-foreground">
            There are no projects matching your filter criteria.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((container) => (
            <ContainerCard 
              key={container.id} 
              container={container} 
              onAction={handleContainerAction}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProjects.map((container) => (
            <ContainerDetailsCard 
              key={container.id} 
              container={container} 
              onStake={handleContainerAction}
            />
          ))}
        </div>
      )}
      
      {/* Stake Modal */}
      <ContainerStakeModal 
        open={isStakeModalOpen}
        onOpenChange={setIsStakeModalOpen}
        containerId={selectedContainerId}
      />
      
      {/* Container Details Modal (for quick view in grid mode) */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Project Details
              {selectedContainer && (
                <Badge variant={
                  selectedContainer.status === 'live' ? "default" : 
                  selectedContainer.status === 'ico' ? "secondary" : 
                  selectedContainer.status === 'upcoming' ? "outline" : 
                  "destructive"
                }>
                  {selectedContainer?.status.toUpperCase()}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedContainer && (
            <ContainerDetailsCard 
              container={selectedContainer} 
              onStake={handleContainerAction}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
