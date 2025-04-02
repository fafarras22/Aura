
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMockHarvests } from "@/services/mock-data";
import { Search, Calendar, Clock, Leaf, ArrowDown, ArrowUp, Filter } from "lucide-react";

const Harvest = () => {
  const [view, setView] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const harvests = getMockHarvests();

  // Filter harvests based on view and search term
  const filteredHarvests = harvests.filter(harvest => 
    (view === "upcoming" && (harvest.status === "growing" || harvest.status === "ready")) || 
    (view === "completed" && harvest.status === "harvested") ||
    view === "all"
  ).filter(harvest => 
    harvest.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    harvest.containerNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort harvests by date
  const sortedHarvests = [...filteredHarvests].sort((a, b) => {
    if (view === "completed") {
      return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime(); // Most recent first
    }
    return new Date(a.harvestDate).getTime() - new Date(b.harvestDate).getTime(); // Soonest first
  });

  // Calculate statistics
  const totalUpcoming = harvests.filter(h => h.status === "growing" || h.status === "ready").length;
  const readyToHarvest = harvests.filter(h => h.status === "ready").length;
  const totalHarvested = harvests.filter(h => h.status === "harvested").length;

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.round((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays > 0 && diffDays < 7) return `In ${diffDays} days`;
    if (diffDays < 0 && diffDays > -7) return `${Math.abs(diffDays)} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Harvest Management | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Harvest Schedule</h1>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search harvests..."
                className="pl-8 w-[200px] md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar View
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Upcoming Harvests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{totalUpcoming}</div>
              <p className="text-sm text-muted-foreground">Scheduled harvests</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Ready to Harvest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{readyToHarvest}</div>
              <p className="text-sm text-muted-foreground">
                {readyToHarvest > 0 ? "Requires immediate attention" : "No crops ready at this time"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{totalHarvested}</div>
              <p className="text-sm text-muted-foreground">Successfully harvested</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Harvest Schedule</CardTitle>
              <Tabs defaultValue={view} onValueChange={setView}>
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              {view === "upcoming" ? "Scheduled and ready harvests" : 
               view === "completed" ? "Previously harvested crops" : "All harvests"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Container</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Planted Date</TableHead>
                  <TableHead>Harvest Date</TableHead>
                  <TableHead className="text-right">Yield</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedHarvests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No harvests found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedHarvests.map((harvest) => (
                    <TableRow key={harvest.id}>
                      <TableCell className="font-medium">{harvest.cropName}</TableCell>
                      <TableCell>{harvest.containerNumber}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            harvest.status === "growing" ? "outline" :
                            harvest.status === "ready" ? "warning" : "success"
                          }
                        >
                          {harvest.status === "growing" ? "Growing" :
                           harvest.status === "ready" ? "Ready" : "Harvested"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(harvest.plantedDate)}</TableCell>
                      <TableCell>{formatDate(harvest.harvestDate)}</TableCell>
                      <TableCell className="text-right">
                        {harvest.status === "harvested" && harvest.actualYield ? 
                          `${harvest.actualYield} kg` : 
                          `${harvest.estimatedYield} kg (est.)`}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Harvest;
