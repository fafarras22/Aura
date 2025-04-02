
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ContainerProject } from '@/components/containers/ContainerCard';
import { getMockContainerProjects } from '@/services/mock-data/containerProjects';

export const useContainers = () => {
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
        
        // First try to get data from the database
        try {
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
            return;
          }
        } catch (dbError) {
          console.log('Database error, falling back to mock data:', dbError);
          // Continue to use mock data
        }
        
        // If we get here, use mock data
        const mockData = getMockContainerProjects();
        setContainers(mockData);
        setFilteredContainers(mockData);
      } catch (error) {
        console.error('Error fetching containers:', error);
        toast({
          title: 'Error fetching containers',
          description: 'Using sample data instead.',
          variant: 'default',
        });
        
        // Use mock data on error
        const mockData = getMockContainerProjects();
        setContainers(mockData);
        setFilteredContainers(mockData);
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

  return {
    filteredContainers,
    isLoading,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab
  };
};
