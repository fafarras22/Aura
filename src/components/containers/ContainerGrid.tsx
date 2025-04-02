
import React from 'react';
import { ContainerFilters } from './grid/ContainerFilters';
import { ContainerList } from './grid/ContainerList';
import { useContainers } from './grid/useContainers';

interface ContainerGridProps {
  onSelectContainer: (containerId: string) => void;
}

export const ContainerGrid = ({ onSelectContainer }: ContainerGridProps) => {
  const {
    filteredContainers,
    isLoading,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab
  } = useContainers();

  return (
    <div className="space-y-6">
      <ContainerFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <ContainerList
        containers={filteredContainers}
        onSelectContainer={onSelectContainer}
        isLoading={isLoading}
      />
    </div>
  );
};
