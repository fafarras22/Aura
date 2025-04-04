
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Sprout, Fish, GrainIcon, PalmTree, ChevronsUpDown, ArrowUpDown, Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ContainerProject } from '@/components/containers/ContainerCard';
import { getMockContainerProjects } from '@/services/mock-data/containerProjects';

interface ContainerProjectsListProps {
  isLoading?: boolean;
  showFilters?: boolean;
}

const ContainerProjectsList: React.FC<ContainerProjectsListProps> = ({ 
  isLoading = false,
  showFilters = true
}) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ContainerProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ContainerProject[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('apy-desc');
  const [filterType, setFilterType] = useState<string>('');
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchedProjects = getMockContainerProjects();
    setProjects(fetchedProjects);
    setFilteredProjects(fetchedProjects);
  }, []);
  
  // Filter and sort projects when any filter/sort changes
  useEffect(() => {
    let result = [...projects];
    
    // Apply status filter
    if (selectedTab !== 'all') {
      result = result.filter(project => project.status === selectedTab);
    }
    
    // Apply type filter
    if (filterType) {
      result = result.filter(project => project.type === filterType);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'apy-desc':
        result.sort((a, b) => b.apy - a.apy);
        break;
      case 'apy-asc':
        result.sort((a, b) => a.apy - b.apy);
        break;
      case 'filled-desc':
        result.sort((a, b) => (b.filledTokens / b.totalTokens) - (a.filledTokens / a.totalTokens));
        break;
      case 'filled-asc':
        result.sort((a, b) => (a.filledTokens / a.totalTokens) - (b.filledTokens / b.totalTokens));
        break;
      default:
        break;
    }
    
    setFilteredProjects(result);
  }, [projects, selectedTab, sortBy, filterType]);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'container':
        return <Sprout className="h-4 w-4" />;
      case 'fishery':
        return <Fish className="h-4 w-4" />;
      case 'rice':
        return <GrainIcon className="h-4 w-4" />;
      case 'palm-oil':
        return <PalmTree className="h-4 w-4" />;
      default:
        return <Sprout className="h-4 w-4" />;
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex-1 justify-between">
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {filterType ? `Filter: ${filterType}` : 'Filter Type'}
                  </span>
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search type..." />
                  <CommandEmpty>No type found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem onSelect={() => setFilterType('')} className="cursor-pointer">
                      <Check className={cn("mr-2 h-4 w-4", filterType === '' ? "opacity-100" : "opacity-0")} />
                      All Types
                    </CommandItem>
                    <CommandItem onSelect={() => setFilterType('container')} className="cursor-pointer">
                      <Check className={cn("mr-2 h-4 w-4", filterType === 'container' ? "opacity-100" : "opacity-0")} />
                      Container Farms
                    </CommandItem>
                    <CommandItem onSelect={() => setFilterType('fishery')} className="cursor-pointer">
                      <Check className={cn("mr-2 h-4 w-4", filterType === 'fishery' ? "opacity-100" : "opacity-0")} />
                      Fisheries
                    </CommandItem>
                    <CommandItem onSelect={() => setFilterType('rice')} className="cursor-pointer">
                      <Check className={cn("mr-2 h-4 w-4", filterType === 'rice' ? "opacity-100" : "opacity-0")} />
                      Rice Farms
                    </CommandItem>
                    <CommandItem onSelect={() => setFilterType('palm-oil')} className="cursor-pointer">
                      <Check className={cn("mr-2 h-4 w-4", filterType === 'palm-oil' ? "opacity-100" : "opacity-0")} />
                      Palm Oil
                    </CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1 w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apy-desc">APY: Highest</SelectItem>
                <SelectItem value="apy-asc">APY: Lowest</SelectItem>
                <SelectItem value="filled-desc">% Filled: Highest</SelectItem>
                <SelectItem value="filled-asc">% Filled: Lowest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-t-lg"></div>
              <CardHeader>
                <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
                <div className="h-8 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
              </CardContent>
              <div className="p-6 pt-0">
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or check back later for new projects.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${project.imageUrl || '/placeholder.svg'})` }}
                ></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge 
                        variant={project.status === 'live' ? 'default' : project.status === 'upcoming' ? 'secondary' : 'outline'}
                        className="mb-2"
                      >
                        {project.status.toUpperCase()}
                      </Badge>
                      <CardTitle>{project.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getTypeIcon(project.type)}
                      {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{project.location}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span>{Math.round((project.filledTokens / project.totalTokens) * 100)}%</span>
                  </div>
                  <Progress value={(project.filledTokens / project.totalTokens) * 100} className="h-2 mb-4" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">APY</p>
                      <p className="font-bold text-green-600">{project.apy}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Runtime</p>
                      <p className="font-bold">{project.runtimeDays} days</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Raise</p>
                      <p className="font-bold">{project.totalTokens.toLocaleString()} AKR</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current</p>
                      <p className="font-bold">{project.filledTokens.toLocaleString()} AKR</p>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6 pt-2">
                  <Button 
                    variant={project.status === 'completed' ? 'outline' : 'default'} 
                    className="w-full"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    {project.status === 'live' ? 'Invest Now' : 
                      project.status === 'upcoming' ? 'View Details' : 
                      'View Results'}
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ContainerProjectsList;
