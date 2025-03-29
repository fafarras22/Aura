
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { BarChart2, TrendingUp, LineChart, PieChart, Download, Filter } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Mock data for demonstration
const monthlyYieldData = [
  { name: "Jan", yield: 420 },
  { name: "Feb", yield: 380 },
  { name: "Mar", yield: 450 },
  { name: "Apr", yield: 520 },
  { name: "May", yield: 550 },
  { name: "Jun", yield: 580 },
  { name: "Jul", yield: 620 },
];

const resourceUsageData = [
  { name: "Jan", water: 1200, electricity: 800 },
  { name: "Feb", water: 1100, electricity: 830 },
  { name: "Mar", water: 1300, electricity: 810 },
  { name: "Apr", water: 1400, electricity: 850 },
  { name: "May", water: 1350, electricity: 870 },
  { name: "Jun", water: 1450, electricity: 900 },
  { name: "Jul", water: 1500, electricity: 940 },
];

const Analytics = () => {
  const { isDeveloperMode } = useDeveloperMode();
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Farm Analytics</h1>
        
        <div className="flex items-center space-x-2">
          <Select 
            value={timeRange} 
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          {isDeveloperMode && (
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="yield">
        <TabsList>
          <TabsTrigger value="yield">Yield</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          {isDeveloperMode && <TabsTrigger value="advanced">Advanced</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="yield" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" /> 
                Monthly Harvest Yield
              </CardTitle>
              <CardDescription>
                Monthly production in kilograms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyYieldData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="yield" 
                      name="Yield (kg)" 
                      fill="#22c55e" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Yield</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3,520 kg</div>
                <Badge className="mt-2" variant="success">+12% from last period</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top Performer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Lettuce</div>
                <div className="text-muted-foreground">890 kg harvested</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6,800 kg</div>
                <div className="text-muted-foreground">Annual estimate</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="mr-2 h-5 w-5" /> 
                Resource Consumption
              </CardTitle>
              <CardDescription>
                Monthly water (liters) and electricity (kWh) usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={resourceUsageData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="water" 
                      name="Water (L)" 
                      stroke="#3b82f6" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="electricity" 
                      name="Electricity (kWh)" 
                      stroke="#f59e0b" 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Water Efficiency</CardTitle>
                <CardDescription>
                  Water usage per kg of produce
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">3.2 L/kg</div>
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Current efficiency</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                  <div className="text-xs text-muted-foreground">Target: 90%</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Energy Efficiency</CardTitle>
                <CardDescription>
                  Energy usage per kg of produce
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">1.5 kWh/kg</div>
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Current efficiency</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} />
                  <div className="text-xs text-muted-foreground">Target: 85%</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="efficiency" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Growing Efficiency</CardTitle>
              <CardDescription>
                Comparison of growth rates and resource utilization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Growing Cycle Times</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Lettuce</span>
                        <span>32 days</span>
                      </div>
                      <Progress value={80} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Spinach</span>
                        <span>29 days</span>
                      </div>
                      <Progress value={90} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Kale</span>
                        <span>38 days</span>
                      </div>
                      <Progress value={70} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Space Utilization</h3>
                  <div className="text-3xl font-bold">92%</div>
                  <Badge variant="success">Excellent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isDeveloperMode && (
          <TabsContent value="advanced" className="space-y-4 mt-6">
            <Card className="border-dashed border-2 border-yellow-300">
              <CardHeader>
                <CardTitle>Advanced Analytics (Admin Only)</CardTitle>
                <CardDescription>
                  Detailed metrics and predictive analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Predictive Harvest Models</h3>
                    <p className="text-muted-foreground mb-4">
                      Use AI to predict optimal harvest times and expected yields
                    </p>
                    <Button variant="outline">Configure Models</Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Custom Reports</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate detailed reports with custom metrics
                    </p>
                    <Button variant="outline">Create Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Analytics;
