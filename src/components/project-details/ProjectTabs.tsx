
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContainerProject } from "@/components/containers/ContainerCard";
import ProjectStatCards from "./ProjectStatCards";
import ProjectDescription from "./ProjectDescription";
import InvestorsTab from "./InvestorsTab";
import ProjectUpdatesTab from "./ProjectUpdatesTab";

interface ProjectTabsProps {
  container: ContainerProject;
  progressPercentage: number;
  investors: number;
}

const ProjectTabs = ({ container, progressPercentage, investors }: ProjectTabsProps) => {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="investors">Investors</TabsTrigger>
        <TabsTrigger value="updates">Updates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4 pt-4">
        <ProjectStatCards 
          progressPercentage={progressPercentage} 
          apy={container.apy} 
          runtimeDays={container.runtimeDays} 
        />
        
        <ProjectDescription 
          description={container.description}
          progressPercentage={progressPercentage}
          filledTokens={container.filledTokens}
          totalTokens={container.totalTokens}
        />
      </TabsContent>
      
      <TabsContent value="investors" className="space-y-4 pt-4">
        <InvestorsTab investors={investors} />
      </TabsContent>
      
      <TabsContent value="updates" className="space-y-4 pt-4">
        <ProjectUpdatesTab container={container} />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectTabs;
