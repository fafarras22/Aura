
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Calendar, Filter, Plus, SearchIcon, SlidersHorizontal } from "lucide-react";
import { getMockHarvestData2 } from "@/services/mock-data/harvests";

const Harvest = () => {
  const [view, setView] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const harvestData = getMockHarvestData2();
  
  const filteredHarvests = harvestData.filter(harvest => 
    harvest.containerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    harvest.cropType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format data for charts
  const monthlyYield = [
    { name: "Jan", yield: 230 },
    { name: "Feb", yield: 280 },
    { name: "Mar", yield: 250 },
    { name: "Apr", yield: 310 },
    { name: "May", yield: 290 },
    { name: "Jun", yield: 340 },
    { name: "Jul", yield: 380 },
    { name: "Aug", yield: 350 },
    { name: "Sep", yield: 400 },
    { name: "Oct", yield: 380 },
    { name: "Nov", yield: 340 },
    { name: "Dec", yield: 360 },
  ];
  
  const cropComparison = [
    { name: "Lettuce", quantity: 1240, revenue: 9200 },
    { name: "Basil", quantity: 980, revenue: 12800 },
    { name: "Kale", quantity: 750, revenue: 6500 },
    { name: "Spinach", quantity: 890, revenue: 7300 },
    { name: "Arugula", quantity: 620, revenue: 8100 },
    { name: "Tomatoes", quantity: 450, revenue: 5900 },
  ];

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Harvest Management | AKAR Farm</title>
      </Helmet>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Harvest Management</h1>
          
          <div className="flex gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search harvests..."
                className="pl-8 w-[200px] md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Record Harvest
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Harvested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                4,120 kg
              </div>
              <p className="text-sm text-muted-foreground">
                This year
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Scheduled Harvests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                12
              </div>
              <p className="text-sm text-muted-foreground">
                Next 7 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Yield Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-violet-600">
                87%
              </div>
              <p className="text-sm text-muted-foreground">
                Average across all containers
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Yield</CardTitle>
            <CardDescription>Harvested weight (kg) per month in the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyYield}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="yield" fill="#4ade80" name="Yield (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Harvest Records</CardTitle>
              <Tabs defaultValue={view} onValueChange={setView}>
                <TabsList>
                  <TabsTrigger value="active">Recent</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {filteredHarvests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No harvests found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredHarvests.map(harvest => (
                  <Card key={harvest.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{harvest.cropType}</h3>
                          <p className="text-sm text-muted-foreground">Container: {harvest.containerName}</p>
                        </div>
                        <Badge 
                          variant={
                            harvest.status === 'completed' ? 'success' : 
                            harvest.status === 'scheduled' ? 'secondary' : 'outline'
                          }
                        >
                          {harvest.status.charAt(0).toUpperCase() + harvest.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Weight</p>
                          <p className="text-md font-medium">{harvest.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Quality</p>
                          <p className="text-md font-medium">{harvest.quality}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Harvest Date</p>
                          <p className="text-md font-medium">{harvest.harvestDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Batch Number</p>
                          <p className="text-md font-medium">{harvest.batchNumber}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-muted-foreground">Assigned to</p>
                            <p>{harvest.assignedTo}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <p className={
                              harvest.status === 'completed' ? 'text-green-600' :
                              harvest.status === 'scheduled' ? 'text-blue-600' : ''
                            }>
                              {harvest.status.charAt(0).toUpperCase() + harvest.status.slice(1)}
                            </p>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Crop Comparison</CardTitle>
              <CardDescription>Harvest quantity by crop type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cropComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#60a5fa" name="Quantity (kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Crop</CardTitle>
              <CardDescription>Estimated revenue from each crop (USD)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cropComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} name="Revenue (USD)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Harvest;
