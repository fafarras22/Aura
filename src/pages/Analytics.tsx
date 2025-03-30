import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { BarChart2, TrendingUp, LineChart, PieChart, Download, Filter, Shield, AlertTriangle, Lock } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { SalesDetailsCard } from "@/components/dashboard/SalesDetailsCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { LoginDialog } from "@/components/dashboard/LoginDialog";

// Mock data for demonstration
const getMonthlyYieldData = (isAdmin: boolean) => [
  { name: "Jan", yield: isAdmin ? 420 : 120 },
  { name: "Feb", yield: isAdmin ? 380 : 105 },
  { name: "Mar", yield: isAdmin ? 450 : 135 },
  { name: "Apr", yield: isAdmin ? 520 : 160 },
  { name: "May", yield: isAdmin ? 550 : 170 },
  { name: "Jun", yield: isAdmin ? 580 : 175 },
  { name: "Jul", yield: isAdmin ? 620 : 190 },
];

const getResourceUsageData = (isAdmin: boolean) => [
  { name: "Jan", water: isAdmin ? 1200 : 400, electricity: isAdmin ? 800 : 260 },
  { name: "Feb", water: isAdmin ? 1100 : 370, electricity: isAdmin ? 830 : 275 },
  { name: "Mar", water: isAdmin ? 1300 : 430, electricity: isAdmin ? 810 : 270 },
  { name: "Apr", water: isAdmin ? 1400 : 460, electricity: isAdmin ? 850 : 280 },
  { name: "May", water: isAdmin ? 1350 : 450, electricity: isAdmin ? 870 : 290 },
  { name: "Jun", water: isAdmin ? 1450 : 480, electricity: isAdmin ? 900 : 300 },
  { name: "Jul", water: isAdmin ? 1500 : 490, electricity: isAdmin ? 940 : 310 },
];

// Sales distribution data
const salesDistributionData = [
  { name: "Supermarkets", value: 60 },
  { name: "Restaurants", value: 25 },
  { name: "Direct Consumers", value: 10 },
  { name: "Export", value: 5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const { isDeveloperMode, currentUser, login, loginAsAdmin } = useDeveloperMode();
  const [timeRange, setTimeRange] = useState("6months");
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const isAdmin = isDeveloperMode || (currentUser?.role === 'admin');
  const monthlyYieldData = getMonthlyYieldData(isAdmin);
  const resourceUsageData = getResourceUsageData(isAdmin);

  // Check if user is logged in when component mounts
  useEffect(() => {
    if (!currentUser) {
      setShowLoginDialog(true);
    }
  }, [currentUser]);

  const handleLoginSubmit = (type: 'admin' | 'user', username: string, password: string) => {
    let success = false;
    
    if (type === 'admin') {
      success = loginAsAdmin(password);
    } else {
      success = login(username, password);
    }
    
    if (success) {
      setShowLoginDialog(false);
    }
    
    return success;
  };

  // If not logged in, show only the login dialog with locked background
  if (!currentUser) {
    return (
      <div className="relative">
        {/* Blurred/Locked Analytics Background */}
        <div className="filter blur-sm pointer-events-none">
          <div className="space-y-8 opacity-40">
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            
            <div className="p-6 border rounded-lg bg-muted/30">
              <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
              <p>Please log in to view analytics content</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 border rounded-lg bg-muted/30 h-40"></div>
              <div className="p-6 border rounded-lg bg-muted/30 h-40"></div>
              <div className="p-6 border rounded-lg bg-muted/30 h-40"></div>
            </div>
            
            <div className="p-6 border rounded-lg bg-muted/30 h-60">
              <div className="flex items-center justify-center h-full">
                <Lock className="w-16 h-16 opacity-10" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Forced Login Dialog */}
        <LoginDialog 
          open={showLoginDialog} 
          onOpenChange={setShowLoginDialog}
          onLogin={handleLoginSubmit}
        />
      </div>
    );
  }

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

      {!isDeveloperMode && (
        <Alert variant="warning" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Limited Access</AlertTitle>
          <AlertDescription>
            You are viewing client-specific analytics. For full company data, please switch to Developer Mode.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="yield">
        <TabsList>
          <TabsTrigger value="yield">Yield</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          {isDeveloperMode && <TabsTrigger value="sales">Sales</TabsTrigger>}
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
                Monthly production in kilograms{isDeveloperMode ? " across all containers" : " for your containers"}
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
                <div className="text-3xl font-bold">{isDeveloperMode ? "3,520" : "890"} kg</div>
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
                <div className="text-3xl font-bold">{isDeveloperMode ? "6,800" : "1,750"} kg</div>
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
        
        {/* Sales Analytics - Only for Developer Mode */}
        {isDeveloperMode && (
          <TabsContent value="sales" className="space-y-4 mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5" />
                  Sales Distribution
                </CardTitle>
                <CardDescription>
                  Sales distribution by market segment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={salesDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salesDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <SalesDetailsCard />
          </TabsContent>
        )}
        
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
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Security Analytics</h3>
                  <div className="flex items-center mb-4 text-green-600">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="font-medium">System Security: Enhanced Protection Active</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm font-medium">Access Attempts</div>
                      <div className="text-2xl font-bold">324</div>
                      <div className="text-xs text-muted-foreground">Last 30 days</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm font-medium">Blocked Attacks</div>
                      <div className="text-2xl font-bold">27</div>
                      <div className="text-xs text-muted-foreground">Last 30 days</div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm font-medium">Security Score</div>
                      <div className="text-2xl font-bold">94/100</div>
                      <div className="text-xs text-green-600">Excellent</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      {/* Login Dialog - will only show if triggered by state */}
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        onLogin={handleLoginSubmit}
      />
    </div>
  );
};

export default Analytics;
