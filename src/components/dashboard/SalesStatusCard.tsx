
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { ContainerSalesData } from "@/services/mockDataService";

interface SalesStatusCardProps {
  data: ContainerSalesData;
}

export function SalesStatusCard({ data }: SalesStatusCardProps) {
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
    return new Intl.NumberFormat('id-ID').format(value);
  };
  
  const truncateName = (name: string, maxLength = 16) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  };

  // Get random color for the chart
  const getChartColor = () => {
    const colors = ['#4CAF50', '#2E7D32', '#1B5E20', '#8BC34A'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const chartColor = getChartColor();

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">
              {data.containerName}
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <span className="mr-2">Client:</span>
              <Avatar className="h-6 w-6 mr-2">
                {data.supermarketClient.imageUrl && (
                  <AvatarImage src={data.supermarketClient.imageUrl || ""} alt={data.supermarketClient.name} />
                )}
                <AvatarFallback>{data.supermarketClient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{truncateName(data.supermarketClient.name)}</span>
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex justify-between items-baseline">
            <div className="text-2xl font-bold">{formatNumber(data.totalSales)} units</div>
            <div className="text-sm text-muted-foreground">
              {data.totalRevenue ? formatCurrency(data.totalRevenue) : 'Revenue data unavailable'}
            </div>
          </div>
          
          <div className="h-[80px] mt-2">
            {data.monthlySales && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data.monthlySales.map((value, index) => ({
                    month: index,
                    sales: value
                  }))}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <Tooltip 
                    formatter={(value) => [formatNumber(Number(value)), 'Sales']}
                    labelFormatter={(label) => `Month ${Number(label) + 1}`}
                  />
                  <defs>
                    <linearGradient id={`salesGradient-${data.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke={chartColor} 
                    fillOpacity={1}
                    fill={`url(#salesGradient-${data.id})`} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-3">
            <div className="text-sm font-medium mb-1">Top Customers</div>
            <div className="flex flex-wrap gap-1">
              {data.recurringCustomers.slice(0, 5).map((customer) => (
                <Avatar key={customer.id} className="h-8 w-8 border-2 border-white">
                  {customer.imageUrl && <AvatarImage src={customer.imageUrl} alt={customer.name} />}
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {data.recurringCustomers.length > 5 && (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs">
                  +{data.recurringCustomers.length - 5}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
