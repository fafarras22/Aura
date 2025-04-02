
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface ContainerFiltersProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const ContainerFilters = ({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery 
}: ContainerFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="live">Active</TabsTrigger>
          <TabsTrigger value="ico">ICO</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="relative w-full md:w-64">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search container projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
};
