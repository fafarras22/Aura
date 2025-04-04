
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContainerCard, ContainerProject } from "@/components/containers/ContainerCard";
import { ArrowRight } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface HomeProjectsProps {
  featuredContainers: ContainerProject[];
  onNavigate: NavigateFunction;
  onContainerSelect: (containerId: string) => void;
}

export const HomeProjects: React.FC<HomeProjectsProps> = ({ 
  featuredContainers, 
  onNavigate, 
  onContainerSelect 
}) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Live Projects */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Badge variant="default" className="mb-2">LIVE</Badge>
              <h2 className="text-3xl font-bold">Available Projects</h2>
              <p className="text-muted-foreground">Ready-to-stake agricultural projects</p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => onNavigate('/farm-projects')}
              className="gap-2"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredContainers
              .filter(c => c.status === 'live')
              .slice(0, 3)
              .map((container) => (
                <ContainerCard
                  key={container.id}
                  container={container}
                  onAction={onContainerSelect}
                />
              ))}
          </div>
        </div>

        {/* ICO Projects */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <Badge variant="secondary" className="mb-2">UPCOMING</Badge>
              <h2 className="text-3xl font-bold">ICO Projects</h2>
              <p className="text-muted-foreground">Pre-launch investment opportunities</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredContainers
              .filter(c => c.status === 'ico' || c.status === 'upcoming')
              .slice(0, 3)
              .map((container) => (
                <ContainerCard
                  key={container.id}
                  container={container}
                  onAction={onContainerSelect}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
