
import React from 'react';
import { ContainerCard, ContainerProject } from '@/components/containers/ContainerCard';

interface ContainerListProps {
  containers: ContainerProject[];
  onSelectContainer: (containerId: string) => void;
  isLoading: boolean;
}

export const ContainerList = ({ containers, onSelectContainer, isLoading }: ContainerListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[400px] rounded-md bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (containers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No container projects found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {containers.map((container) => (
        <ContainerCard
          key={container.id}
          container={container}
          onAction={onSelectContainer}
        />
      ))}
    </div>
  );
};
