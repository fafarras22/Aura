
import React from 'react';
import { TokenizationData } from "@/services/mockDataService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TokenAllocationProps {
  tokenData: TokenizationData;
}

export const TokenAllocation: React.FC<TokenAllocationProps> = ({ tokenData }) => {
  // Sample fund allocation data
  const fundAllocationData = [
    { name: 'Operations & Maintenance', value: 30, color: '#0088FE' },
    { name: 'Technology & Innovation', value: 25, color: '#00C49F' },
    { name: 'Farming Materials', value: 20, color: '#FFBB28' },
    { name: 'Investor Returns', value: 15, color: '#FF8042' },
    { name: 'Community Development', value: 10, color: '#8884d8' },
  ];

  // Sample container-specific allocation
  const containerAllocations = [
    {
      id: 1,
      name: "Container 1",
      allocations: [
        { category: "Seeds & Plants", percentage: 25, amount: 15750000 },
        { category: "Utilities", percentage: 15, amount: 9450000 },
        { category: "Labor", percentage: 30, amount: 18900000 },
        { category: "Technology", percentage: 20, amount: 12600000 },
        { category: "Maintenance", percentage: 10, amount: 6300000 },
      ]
    },
    {
      id: 2,
      name: "Container 2",
      allocations: [
        { category: "Seeds & Plants", percentage: 20, amount: 12600000 },
        { category: "Utilities", percentage: 15, amount: 9450000 },
        { category: "Labor", percentage: 25, amount: 15750000 },
        { category: "Technology", percentage: 30, amount: 18900000 },
        { category: "Maintenance", percentage: 10, amount: 6300000 },
      ]
    },
    {
      id: 3,
      name: "Container 3",
      allocations: [
        { category: "Seeds & Plants", percentage: 30, amount: 18900000 },
        { category: "Utilities", percentage: 10, amount: 6300000 },
        { category: "Labor", percentage: 25, amount: 15750000 },
        { category: "Technology", percentage: 15, amount: 9450000 },
        { category: "Maintenance", percentage: 20, amount: 12600000 },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fund Allocation Overview</CardTitle>
          <CardDescription>How your investment is distributed across operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundAllocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {fundAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {fundAllocationData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" indicatorClassName={`bg-[${item.color}]`} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Container-Specific Allocation</CardTitle>
          <CardDescription>Detailed breakdown of fund usage per container</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="container1">
            <TabsList className="grid grid-cols-3 mb-6">
              {containerAllocations.map((container) => (
                <TabsTrigger key={container.id} value={`container${container.id}`}>
                  {container.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {containerAllocations.map((container) => (
              <TabsContent key={container.id} value={`container${container.id}`}>
                <div className="space-y-4">
                  {container.allocations.map((allocation, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{allocation.category}</span>
                        <div className="text-right">
                          <span className="text-sm">{allocation.percentage}%</span>
                          <p className="text-xs text-muted-foreground">
                            IDR {(allocation.amount).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Progress value={allocation.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
