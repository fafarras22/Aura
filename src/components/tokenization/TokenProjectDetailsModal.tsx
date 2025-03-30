
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { ArrowRight, Leaf, Calendar, CircleDollarSign, Users, FileText, MapPin } from "lucide-react";

export interface ProjectDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: number;
    name: string;
    containerNumber: string;
    crops: string[];
    minAmount: number;
    returnRate: number;
    tokensAvailable: number;
    tokensSold: number;
    period: string;
    risk: string;
    location: string;
    description: string;
    status: string;
    startDate: string;
    harvestDate: string;
    investors: number;
    historicalReturns: Array<{month: string, return: number}>;
  };
  onInvest: () => void;
}

export const TokenProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  open,
  onOpenChange,
  project,
  onInvest
}) => {
  // Calculate the funding progress percentage
  const fundingProgress = (project.tokensSold / (project.tokensSold + project.tokensAvailable)) * 100;
  
  // Format numbers for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };
  
  // Pie chart data for crop allocation
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const cropAllocationData = project.crops.map((crop, index) => ({
    name: crop,
    value: 100 / project.crops.length // Equal distribution for demo
  }));
  
  // Risk color indicator
  const getRiskColor = (risk: string) => {
    switch(risk.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'medium-high':
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // Status color indicator
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'funding':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{project.name}</DialogTitle>
              <DialogDescription className="flex items-center mt-1">
                <span className="text-sm">{project.containerNumber}</span>
                <span className="mx-2">•</span>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </DialogDescription>
            </div>
            <Badge className={getRiskColor(project.risk)}>
              {project.risk} Risk
            </Badge>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>{project.location}</span>
            </div>
            
            <p className="text-sm">
              {project.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Investment Period</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-green-600" />
                  <p className="font-medium">{project.period}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Expected Return</p>
                <div className="flex items-center">
                  <CircleDollarSign className="h-4 w-4 mr-1 text-green-600" />
                  <p className="font-medium">{project.returnRate}%</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Start Date</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                  <p className="font-medium">{project.startDate}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Harvest Date</p>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 mr-1 text-green-600" />
                  <p className="font-medium">{project.harvestDate}</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 mt-4">
              <h3 className="text-sm font-medium mb-2">Crop Allocation</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropAllocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cropAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Minimum Investment</p>
                <p className="text-lg font-medium">{formatCurrency(project.minAmount)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tokens Available</p>
                <p className="text-lg font-medium">{formatNumber(project.tokensAvailable)} AKR</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Current Investors</p>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-blue-600" />
                  <p className="text-lg font-medium">{project.investors}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Funding Progress</h3>
                <p className="text-sm">{fundingProgress.toFixed(0)}%</p>
              </div>
              <Progress value={fundingProgress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatNumber(project.tokensSold)} AKR sold</span>
                <span>{formatNumber(project.tokensSold + project.tokensAvailable)} AKR total</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 mt-4">
              <h3 className="text-sm font-medium mb-2">Historical Returns</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={project.historicalReturns}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="return" 
                      name="Return Rate" 
                      stroke="#4ade80"
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Risk Analysis</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="h-3 w-3" />
                    </div>
                    <span>Audited investment structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="h-3 w-3" />
                    </div>
                    <span>Climate-controlled environment reduces weather risks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="h-3 w-3" />
                    </div>
                    <span>Market price fluctuations may affect returns</span>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Tax Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CircleDollarSign className="h-3 w-3" />
                    </div>
                    <span>Agricultural investment tax incentives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CircleDollarSign className="h-3 w-3" />
                    </div>
                    <span>Carbon credit eligibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CircleDollarSign className="h-3 w-3" />
                    </div>
                    <span>Sustainable development tax benefits</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4 mt-4">
            <div className="relative border-l border-gray-200 ml-3 pl-8 pb-2">
              <div className="mb-8 relative">
                <div className="absolute -left-11 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 ring-8 ring-white dark:ring-gray-900 dark:bg-green-900">
                  <CircleDollarSign className="w-3 h-3 text-green-800 dark:text-green-300" />
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="flex items-center text-lg font-semibold">Initial Investment Phase</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-500">May 15, 2023 - June 30, 2023</time>
                  <p className="text-sm">Initial funding round open to investors. Minimum 65% funding required to proceed.</p>
                </div>
              </div>
              
              <div className="mb-8 relative">
                <div className="absolute -left-11 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <Leaf className="w-3 h-3 text-blue-800 dark:text-blue-300" />
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="flex items-center text-lg font-semibold">Setup & Planting Phase</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-500">July 1, 2023 - July 15, 2023</time>
                  <p className="text-sm">Preparation of growing equipment, seed procurement, and initial planting operations.</p>
                </div>
              </div>
              
              <div className="mb-8 relative">
                <div className="absolute -left-11 flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 ring-8 ring-white dark:ring-gray-900 dark:bg-purple-900">
                  <Leaf className="w-3 h-3 text-purple-800 dark:text-purple-300" />
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="flex items-center text-lg font-semibold">Growth Phase</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-500">July 16, 2023 - October 15, 2023</time>
                  <p className="text-sm">Monitoring of plant growth with regular updates to investors via dashboard.</p>
                </div>
              </div>
              
              <div className="mb-8 relative">
                <div className="absolute -left-11 flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 ring-8 ring-white dark:ring-gray-900 dark:bg-amber-900">
                  <Leaf className="w-3 h-3 text-amber-800 dark:text-amber-300" />
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="flex items-center text-lg font-semibold">Harvest Phase</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-500">October 16, 2023 - November 1, 2023</time>
                  <p className="text-sm">Collection and processing of mature crops for distribution to market channels.</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-11 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 ring-8 ring-white dark:ring-gray-900 dark:bg-green-900">
                  <CircleDollarSign className="w-3 h-3 text-green-800 dark:text-green-300" />
                </div>
                <div className="border rounded-lg p-3">
                  <h3 className="flex items-center text-lg font-semibold">Returns Distribution</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-500">November 15, 2023 - November 30, 2023</time>
                  <p className="text-sm">Profits distributed to token holders based on their investment share.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onInvest} className="flex items-center">
            Invest Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
