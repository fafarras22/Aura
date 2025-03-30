
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, Calendar, CircleDollarSign, Info, Clock, Warehouse } from "lucide-react";
import { getMockHarvests } from "@/services/mockDataService";

const Harvest = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const harvests = getMockHarvests();
  
  // Map the status values correctly
  const readyHarvests = harvests.filter(h => h.status === 'ready');
  const inProgressHarvests = harvests.filter(h => h.status === 'in progress');
  const completedHarvests = harvests.filter(h => h.status === 'completed');
  
  const getStatusColorClass = (status: string) => {
    switch(status) {
      case 'ready': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'in progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Harvest Management</h1>
          <p className="text-muted-foreground">
            Track and manage all container farm harvests
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {completedHarvests.length} Completed
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            {readyHarvests.length} Ready
          </Badge>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Harvest Tracker</CardTitle>
          <CardDescription>
            Monitor growth cycles and plan upcoming harvests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="ready">Ready for Harvest</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <ScrollArea className="h-[650px] pr-4">
                <div className="space-y-4">
                  {harvests.map(harvest => (
                    <Card key={harvest.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-5 h-full">
                          {/* Image column */}
                          <div className="aspect-video md:aspect-auto md:h-auto bg-slate-100 relative">
                            {harvest.images && harvest.images.length > 0 ? (
                              <img 
                                src={harvest.images[0]} 
                                alt={harvest.plantName || harvest.crop}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Leaf className="h-12 w-12 text-slate-300" />
                              </div>
                            )}
                            <Badge 
                              variant="outline" 
                              className={`absolute top-2 right-2 ${getStatusColorClass(harvest.status)}`}
                            >
                              {harvest.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          {/* Content column */}
                          <div className="md:col-span-4 p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-xl font-bold">{harvest.plantName || harvest.crop}</h3>
                                <p className="text-sm text-muted-foreground">{harvest.plantType || harvest.crop} - {harvest.unit}</p>
                              </div>
                              <div className="space-x-2">
                                <Badge variant="secondary">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  {harvest.plantedDate || harvest.date}
                                </Badge>
                                <Badge variant="outline">
                                  <Warehouse className="mr-1 h-3 w-3" />
                                  {harvest.container || "Container A"}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Quantity</p>
                                <p className="text-lg font-medium">{harvest.quantity} {harvest.unit}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Est. Value</p>
                                <p className="text-lg font-medium">
                                  IDR {(harvest.quantity * 50000).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Growth Period</p>
                                <p className="text-lg font-medium">{harvest.plantedDate && harvest.estimatedHarvestDate ? "45 days" : "30 days"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Nutrients</p>
                                <p className="text-lg font-medium">Optimal</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-auto">
                              <Button variant="outline" size="sm">
                                <Info className="mr-2 h-4 w-4" />
                                Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule
                              </Button>
                              <Button variant="outline" size="sm">
                                <CircleDollarSign className="mr-2 h-4 w-4" />
                                Market Value
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="ready" className="space-y-4">
              <ScrollArea className="h-[650px] pr-4">
                <div className="space-y-4">
                  {readyHarvests.map(harvest => (
                    <Card key={harvest.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-5 h-full">
                          {/* Image column */}
                          <div className="aspect-video md:aspect-auto md:h-auto bg-slate-100 relative">
                            {harvest.images && harvest.images.length > 0 ? (
                              <img 
                                src={harvest.images[0]} 
                                alt={harvest.plantName || harvest.crop}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Leaf className="h-12 w-12 text-slate-300" />
                              </div>
                            )}
                            <Badge 
                              variant="outline" 
                              className="absolute top-2 right-2 bg-yellow-50 text-yellow-700 border-yellow-200"
                            >
                              READY
                            </Badge>
                          </div>
                          
                          {/* Content column */}
                          <div className="md:col-span-4 p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-xl font-bold">{harvest.plantName || harvest.crop}</h3>
                                <p className="text-sm text-muted-foreground">{harvest.plantType || harvest.crop} - {harvest.unit}</p>
                              </div>
                              <div className="space-x-2">
                                <Badge variant="secondary">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  {harvest.plantedDate || harvest.date}
                                </Badge>
                                <Badge variant="outline">
                                  <Clock className="mr-1 h-3 w-3" />
                                  Harvest Due: {harvest.estimatedHarvestDate || "Today"}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Est. Quantity</p>
                                <p className="text-lg font-medium">{harvest.quantity} {harvest.unit}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Est. Value</p>
                                <p className="text-lg font-medium">
                                  IDR {(harvest.quantity * 50000).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Container</p>
                                <p className="text-lg font-medium">{harvest.container || "Container A"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Assignee</p>
                                <p className="text-lg font-medium">Team B</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-auto">
                              <Button variant="default" size="sm">
                                <Leaf className="mr-2 h-4 w-4" />
                                Start Harvest
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Reschedule
                              </Button>
                              <Button variant="outline" size="sm">
                                <Info className="mr-2 h-4 w-4" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="in-progress" className="space-y-4">
              <ScrollArea className="h-[650px] pr-4">
                <div className="space-y-4">
                  {inProgressHarvests.map(harvest => (
                    <Card key={harvest.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-5 h-full">
                          {/* Image column */}
                          <div className="aspect-video md:aspect-auto md:h-auto bg-slate-100 relative">
                            {harvest.images && harvest.images.length > 0 ? (
                              <img 
                                src={harvest.images[0]} 
                                alt={harvest.plantName || harvest.crop}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Leaf className="h-12 w-12 text-slate-300" />
                              </div>
                            )}
                            <Badge 
                              variant="outline" 
                              className="absolute top-2 right-2 bg-blue-50 text-blue-700 border-blue-200"
                            >
                              IN PROGRESS
                            </Badge>
                          </div>
                          
                          {/* Content column */}
                          <div className="md:col-span-4 p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-xl font-bold">{harvest.plantName || harvest.crop}</h3>
                                <p className="text-sm text-muted-foreground">{harvest.plantType || harvest.crop} - {harvest.unit}</p>
                              </div>
                              <div className="space-x-2">
                                <Badge variant="secondary">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  {harvest.plantedDate || harvest.date}
                                </Badge>
                                <Badge variant="secondary">
                                  <Warehouse className="mr-1 h-3 w-3" />
                                  {harvest.container || "Container A"}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Growth Progress</p>
                                <p className="text-lg font-medium">65%</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Days Remaining</p>
                                <p className="text-lg font-medium">15 days</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Health Status</p>
                                <p className="text-lg font-medium">Good</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Est. Yield</p>
                                <p className="text-lg font-medium">{harvest.quantity} {harvest.unit}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-auto">
                              <Button variant="outline" size="sm">
                                <Info className="mr-2 h-4 w-4" />
                                Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Growth Log
                              </Button>
                              <Button variant="outline" size="sm">
                                <CircleDollarSign className="mr-2 h-4 w-4" />
                                Market Value
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              <ScrollArea className="h-[650px] pr-4">
                <div className="space-y-4">
                  {completedHarvests.map(harvest => (
                    <Card key={harvest.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-5 h-full">
                          {/* Image column */}
                          <div className="aspect-video md:aspect-auto md:h-auto bg-slate-100 relative">
                            {harvest.images && harvest.images.length > 0 ? (
                              <img 
                                src={harvest.images[0]} 
                                alt={harvest.plantName || harvest.crop}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <Leaf className="h-12 w-12 text-slate-300" />
                              </div>
                            )}
                            <Badge 
                              variant="outline" 
                              className="absolute top-2 right-2 bg-green-50 text-green-700 border-green-200"
                            >
                              COMPLETED
                            </Badge>
                          </div>
                          
                          {/* Content column */}
                          <div className="md:col-span-4 p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-xl font-bold">{harvest.plantName || harvest.crop}</h3>
                                <p className="text-sm text-muted-foreground">{harvest.plantType || harvest.crop} - {harvest.unit}</p>
                              </div>
                              <div className="space-x-2">
                                <Badge variant="outline">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  Harvested: {harvest.actualHarvestDate || harvest.date}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Actual Yield</p>
                                <p className="text-lg font-medium">{harvest.harvestWeight || harvest.quantity} {harvest.unit}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Revenue</p>
                                <p className="text-lg font-medium">
                                  IDR {((harvest.harvestWeight || harvest.quantity) * 50000).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Quality Grade</p>
                                <p className="text-lg font-medium">A</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Container</p>
                                <p className="text-lg font-medium">{harvest.container || "Container A"}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Distribution</p>
                              <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                              </div>
                              <div className="flex justify-between text-xs text-slate-500">
                                <span>75% Distributed</span>
                                <span>25% In Storage</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-4">
                              <Button variant="outline" size="sm">
                                <Info className="mr-2 h-4 w-4" />
                                Harvest Report
                              </Button>
                              <Button variant="outline" size="sm">
                                <CircleDollarSign className="mr-2 h-4 w-4" />
                                Sales Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Harvest;
