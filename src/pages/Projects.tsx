
import React, { useState } from "react";
import { ContainerGrid } from "@/components/containers/ContainerGrid";
import { ContainerStakeModal } from "@/components/containers/ContainerStakeModal";
import { useDBSetup } from "@/lib/db-setup";
import { useEffect } from "react";

const Projects = () => {
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initializeDB } = useDBSetup();

  // Initialize database on component mount
  useEffect(() => {
    initializeDB();
  }, [initializeDB]);

  const handleContainerSelect = (containerId: string) => {
    setSelectedContainerId(containerId);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Farm Projects</h1>
        <p className="text-muted-foreground">
          Invest in container farming projects with $AKR tokens
        </p>
      </div>

      <ContainerGrid onSelectContainer={handleContainerSelect} />

      <ContainerStakeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        containerId={selectedContainerId}
      />
    </div>
  );
};

export default Projects;
