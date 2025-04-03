
import React, { useState } from "react";
import { ContainerCard } from "@/components/containers/ContainerCard";
import { ContainerDetailsCard } from "@/components/containers/ContainerDetailsCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Wallet, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState<string>("available");
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  // Filter projects by status
  const availableProjects = containerProjects.filter(container => 
    container.status === 'live'
  );
  
  const icoProjects = containerProjects.filter(container => 
    container.status === 'ico' || container.status === 'upcoming'
  );
  
  const completedProjects = containerProjects.filter(container => 
    container.status === 'completed'
  );
  
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

  const selectedContainer = containerProjects.find(c => c.id === selectedContainerId);
  
  return (
    <div className="space-y-6">
      {!isWalletConnected && (
        <Alert variant="default" className="border-blue-300 bg-blue-50 dark:bg-blue-900/20">
          <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle>Connect Your Wallet</AlertTitle>
          <AlertDescription>
            Connect your wallet to stake $AKR tokens and earn rewards from farm container projects.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="available" className="flex gap-2 items-center">
            <Badge variant="default" className="h-5 px-1.5 font-mono">
              {availableProjects.length}
            </Badge>
            Available Projects
          </TabsTrigger>
          <TabsTrigger value="ico" className="flex gap-2 items-center">
            <Badge variant="secondary" className="h-5 px-1.5 font-mono">
              {icoProjects.length}
            </Badge>
            ICO & Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex gap-2 items-center">
            <Badge variant="outline" className="h-5 px-1.5 font-mono">
              {completedProjects.length}
            </Badge>
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          {availableProjects.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No Available Projects Found</h3>
              <p className="text-muted-foreground">
                There are currently no live projects open for staking.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProjects.map((container) => (
                <ContainerCard 
                  key={container.id} 
                  container={container} 
                  onAction={handleContainerAction}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ico">
          {icoProjects.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No ICO Projects Found</h3>
              <p className="text-muted-foreground">
                There are currently no ICO or upcoming projects available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {icoProjects.map((container) => (
                <ContainerCard 
                  key={container.id} 
                  container={container} 
                  onAction={handleContainerAction}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {completedProjects.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No Completed Projects Found</h3>
              <p className="text-muted-foreground">
                There are no completed projects to display.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((container) => (
                <ContainerCard 
                  key={container.id} 
                  container={container} 
                  onAction={handleContainerAction}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
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
