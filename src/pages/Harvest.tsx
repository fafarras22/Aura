
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getMockHarvests } from "@/services/mockDataService";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { format, parseISO, differenceInDays } from "date-fns";
import { Leaf, Calendar, Clock, AlertCircle, Plus, Pencil, Scale } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Harvest = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const harvests = getMockHarvests();
  const { toast } = useToast();
  
  // Group harvests by status
  const readyHarvests = harvests.filter(h => h.status === 'ready');
  const growingHarvests = harvests.filter(h => h.status === 'growing');
  const harvestedHarvests = harvests.filter(h => h.status === 'harvested');

  const handleMarkHarvested = () => {
    toast({
      title: "Marked as Harvested",
      description: "The plant has been successfully marked as harvested.",
    });
  };

  const handleAddNewHarvest = () => {
    toast({
      title: "Add New Harvest",
      description: "You can add new plants to track for harvesting.",
    });
  };

  // Calculate growth progress for growing plants
  const calculateGrowthProgress = (planted: string, estimated: string) => {
    const plantedDate = parseISO(planted);
    const estimatedDate = parseISO(estimated);
    const today = new Date();
    
    const totalDays = differenceInDays(estimatedDate, plantedDate);
    const daysPassed = differenceInDays(today, plantedDate);
    
    // Cap progress at 100%
    return Math.min(Math.round((daysPassed / totalDays) * 100), 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Harvest Management</h1>
        <div className="flex space-x-2">
          {isDeveloperMode && (
            <Button onClick={handleAddNewHarvest}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Planting
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="ready">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ready">
            Ready to Harvest <Badge variant="outline" className="ml-2">{readyHarvests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="growing">
            Growing <Badge variant="outline" className="ml-2">{growingHarvests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="harvested">
            Harvested <Badge variant="outline" className="ml-2">{harvestedHarvests.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        {/* Ready to Harvest Tab */}
        <TabsContent value="ready" className="space-y-6 mt-6">
          {readyHarvests.length === 0 ? (
            <div className="text-center py-10">
              <Leaf className="h-12 w-12 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No plants currently ready for harvest</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readyHarvests.map(harvest => (
                <Card key={harvest.id} className="overflow-hidden border-green-200 dark:border-green-900">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={harvest.images[0]} 
                      alt={harvest.plantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <Badge className="w-fit bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Ready to Harvest
                    </Badge>
                    <CardTitle>{harvest.plantName}</CardTitle>
                    <CardDescription>{harvest.plantType}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Planted: {format(parseISO(harvest.plantedDate), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Leaf className="mr-2 h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">Harvest now!</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{harvest.container}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleMarkHarvested} className="w-full">
                      Mark as Harvested
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Growing Tab */}
        <TabsContent value="growing" className="space-y-6 mt-6">
          {growingHarvests.length === 0 ? (
            <div className="text-center py-10">
              <Leaf className="h-12 w-12 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No plants currently growing</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {growingHarvests.map(harvest => {
                const progress = calculateGrowthProgress(harvest.plantedDate, harvest.estimatedHarvestDate);
                
                return (
                  <Card key={harvest.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={harvest.images[0]} 
                        alt={harvest.plantName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <Badge className="w-fit bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        Growing
                      </Badge>
                      <CardTitle>{harvest.plantName}</CardTitle>
                      <CardDescription>{harvest.plantType}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Planted: {format(parseISO(harvest.plantedDate), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          Expected harvest: {format(parseISO(harvest.estimatedHarvestDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} />
                      </div>
                    </CardContent>
                    {isDeveloperMode && (
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Details
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        {/* Harvested Tab */}
        <TabsContent value="harvested" className="space-y-6 mt-6">
          {harvestedHarvests.length === 0 ? (
            <div className="text-center py-10">
              <Leaf className="h-12 w-12 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No harvested plants to display</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {harvestedHarvests.map(harvest => (
                <Card key={harvest.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={harvest.images[0]} 
                      alt={harvest.plantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <Badge className="w-fit bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      Harvested
                    </Badge>
                    <CardTitle>{harvest.plantName}</CardTitle>
                    <CardDescription>{harvest.plantType}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        Planted: {format(parseISO(harvest.plantedDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        Harvested: {harvest.actualHarvestDate ? format(parseISO(harvest.actualHarvestDate), 'MMM d, yyyy') : 'N/A'}
                      </span>
                    </div>
                    {harvest.harvestWeight && (
                      <div className="flex items-center text-sm">
                        <Scale className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Yield: {harvest.harvestWeight} kg</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{harvest.container}</span>
                    </div>
                  </CardContent>
                  {harvest.images.length > 1 && (
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Photos
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {isDeveloperMode && (
        <Card className="border-dashed border-2 border-yellow-300">
          <CardHeader>
            <CardTitle>Harvest Management (Admin Only)</CardTitle>
            <CardDescription>Advanced configuration for harvest tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Plant Type
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Adjust Growth Timelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Scale className="mr-2 h-4 w-4" />
                  Yield Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Harvest;
