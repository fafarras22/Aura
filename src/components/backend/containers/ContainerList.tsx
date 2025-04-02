
import React from "react";
import { ContainerCard } from "./ContainerCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ContainerData } from "./types";

interface ContainerListProps {
  containers: Partial<ContainerData>[];
  onUpdateContainer: (id: string, field: keyof ContainerData, value: any) => void;
  onRemoveContainer: (id: string) => void;
  onAddContainer: () => void;
  loading: boolean;
}

export const ContainerList = ({
  containers,
  onUpdateContainer,
  onRemoveContainer,
  onAddContainer,
  loading
}: ContainerListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {containers.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No containers available. Add a new container to get started.
        </div>
      ) : (
        containers.map((container, index) => (
          <ContainerCard
            key={container.id}
            container={container}
            index={index}
            onUpdate={onUpdateContainer}
            onRemove={onRemoveContainer}
          />
        ))
      )}
      
      <div className="flex justify-center">
        <Button onClick={onAddContainer} variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add New Container
        </Button>
      </div>
    </div>
  );
};
