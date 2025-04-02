
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMockContainerStatus } from "@/services/mock-data";
import { ContainerGrid } from "@/components/containers/ContainerGrid";
import { Search, SlidersHorizontal, Plus, Filter } from "lucide-react";

const Containers = () => {
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const containerStatus = getMockContainerStatus();
  
  const filteredContainers = containerStatus.filter(container => 
    container.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Container Management | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Farm Containers</h1>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search containers..."
                className="pl-8 w-[200px] md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Container
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Active Containers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {containerStatus.filter(c => c.status === 'active').length}
              </div>
              <p className="text-sm text-muted-foreground">
                {Math.round(containerStatus.filter(c => c.status === 'active').length / containerStatus.length * 100)}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {containerStatus.filter(c => c.status === 'maintenance').length}
              </div>
              <p className="text-sm text-muted-foreground">
                Scheduled maintenance
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Inactive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-500">
                {containerStatus.filter(c => c.status === 'inactive').length}
              </div>
              <p className="text-sm text-muted-foreground">
                Ready for deployment
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Container Status</CardTitle>
              <Tabs defaultValue={view} onValueChange={setView}>
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {filteredContainers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No containers found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredContainers.map(container => (
                  <Card key={container.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{container.name}</h3>
                          <p className="text-sm text-muted-foreground">ID: {container.id}</p>
                        </div>
                        <Badge 
                          variant={
                            container.status === 'active' ? 'success' : 
                            container.status === 'maintenance' ? 'secondary' : 'outline'
                          }
                        >
                          {container.status.charAt(0).toUpperCase() + container.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Temperature</p>
                          <p className="text-md font-medium">{container.currentTemp}°C / {container.targetTemp}°C</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Humidity</p>
                          <p className="text-md font-medium">{container.humidity}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Water Level</p>
                          <p className="text-md font-medium">{container.waterLevel}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Performance</p>
                          <p className="text-md font-medium">{container.harvestPerformance}%</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-muted-foreground">Last Harvest</p>
                            <p>{container.lastHarvest}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Next Maintenance</p>
                            <p>{container.nextMaintenance}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Containers;
