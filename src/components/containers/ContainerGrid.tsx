
import React, { useState, useEffect } from 'react';
import { ContainerCard, ContainerProject } from '@/components/containers/ContainerCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

// Mock data to use as fallback
const MOCK_CONTAINERS: ContainerProject[] = [
  {
    id: 'container-a',
    name: 'Container A - Premium Herbs',
    description: 'High-yield herb farming in climate-controlled environment',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    totalTokens: 1000,
    filledTokens: 960,
    apy: 12.5,
    runtimeDays: 365,
    status: 'live'
  },
  {
    id: 'container-b',
    name: 'Container B - Exotic Fruits',
    description: 'Specialized container for rare tropical fruits',
    imageUrl: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    totalTokens: 1000,
    filledTokens: 200,
    apy: 18.5,
    runtimeDays: 365,
    status: 'live'
  },
  {
    id: 'container-c',
    name: 'Container C - Organic Greens ICO',
    description: 'Initial container offering for new organic greens project',
    imageUrl: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    totalTokens: 1000,
    filledTokens: 100,
    apy: 15.0,
    runtimeDays: 180,
    status: 'ico'
  },
  {
    id: 'container-d',
    name: 'Container D - Microgreens Expansion',
    description: 'Expanding our microgreens production capacity',
    imageUrl: 'https://images.unsplash.com/photo-1620654458511-52bb2fc847dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    totalTokens: 1500,
    filledTokens: 500,
    apy: 14.2,
    runtimeDays: 365,
    status: 'live'
  },
  {
    id: 'container-e',
    name: 'Container E - Vertical Farm Tech',
    description: 'Next-generation vertical farming technology showcase',
    imageUrl: 'https://images.unsplash.com/photo-1621456941931-cb157a247ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    totalTokens: 2000,
    filledTokens: 200,
    apy: 16.8,
    runtimeDays: 730,
    status: 'upcoming'
  }
];

interface ContainerGridProps {
  onSelectContainer: (containerId: string) => void;
}

export const ContainerGrid = ({ onSelectContainer }: ContainerGridProps) => {
  const [containers, setContainers] = useState<ContainerProject[]>([]);
  const [filteredContainers, setFilteredContainers] = useState<ContainerProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('containers')
          .select('*');

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Transform database data to match our ContainerProject interface
          const transformedData: ContainerProject[] = data.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description || undefined,
            imageUrl: item.image_url || undefined,
            totalTokens: item.total_tokens || 1000,
            filledTokens: item.filled_tokens || 0,
            apy: item.apy || 12.5,
            runtimeDays: item.runtime_days || 365,
            status: item.status as 'live' | 'upcoming' | 'completed' | 'ico' || 'live'
          }));
          
          setContainers(transformedData);
          setFilteredContainers(transformedData);
        } else {
          // If no data, use mock data
          console.log('No container data found, using mock data');
          setContainers(MOCK_CONTAINERS);
          setFilteredContainers(MOCK_CONTAINERS);
        }
      } catch (error) {
        console.error('Error fetching containers:', error);
        toast({
          title: 'Error fetching containers',
          description: 'Could not load container data. Using sample data instead.',
          variant: 'destructive',
        });
        
        // Use mock data on error
        setContainers(MOCK_CONTAINERS);
        setFilteredContainers(MOCK_CONTAINERS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContainers();
  }, [toast]);

  // Filter containers based on search query and active tab
  useEffect(() => {
    let filtered = containers;
    
    // Filter by status if not showing all
    if (activeTab !== 'all') {
      filtered = filtered.filter(container => container.status === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(container => 
        container.name.toLowerCase().includes(query) ||
        (container.description && container.description.toLowerCase().includes(query))
      );
    }
    
    setFilteredContainers(filtered);
  }, [containers, activeTab, searchQuery]);

  return (
    <div className="space-y-6">
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
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[400px] rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      ) : filteredContainers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContainers.map((container) => (
            <ContainerCard
              key={container.id}
              container={container}
              onAction={onSelectContainer}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No container projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
