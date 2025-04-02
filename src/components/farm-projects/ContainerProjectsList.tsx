
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContainerProject } from "@/components/containers/ContainerCard";
import { ProjectCard } from "./ProjectCard";

interface ContainerProjectsListProps {
  containerProjects: ContainerProject[];
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

export const ContainerProjectsList: React.FC<ContainerProjectsListProps> = ({
  containerProjects,
  isWalletConnected,
  onConnectWallet
}) => {
  // Filter projects by status for display
  const liveProjects = containerProjects.filter(project => project.status === 'live');
  const upcomingProjects = containerProjects.filter(project => project.status === 'upcoming');
  const icoProjects = containerProjects.filter(project => project.status === 'ico');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Available Farm Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-3">Live Projects</h3>
            {liveProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isWalletConnected={isWalletConnected}
                    onConnectWallet={onConnectWallet}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">No live projects available at the moment.</p>
            )}
          </div>
          
          {icoProjects.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-3">Initial Container Offerings (ICO)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {icoProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isWalletConnected={isWalletConnected}
                    onConnectWallet={onConnectWallet}
                  />
                ))}
              </div>
            </div>
          )}
          
          {upcomingProjects.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Upcoming Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isWalletConnected={isWalletConnected}
                    onConnectWallet={onConnectWallet}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
