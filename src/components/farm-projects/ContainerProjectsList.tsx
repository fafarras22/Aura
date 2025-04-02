
import React from "react";
import { ContainerCard } from "@/components/containers/ContainerCard";
import { getMockContainerProjects } from "@/services/mock-data/containerProjects";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wallet } from "lucide-react";

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
  const handleContainerAction = (containerId: string) => {
    if (!isWalletConnected) {
      onConnectWallet();
      return;
    }
    
    // Handle container action based on status
    console.log(`Container action for ${containerId}`);
  };
  
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {containerProjects.map((container) => (
          <ContainerCard 
            key={container.id} 
            container={container} 
            onAction={handleContainerAction}
          />
        ))}
      </div>
    </div>
  );
};
