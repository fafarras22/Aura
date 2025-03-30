
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ClientData, ContainerSalesData } from "@/services/mockDataService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";

interface SalesStatusCardProps {
  salesData: ContainerSalesData;
}

export const SalesStatusCard = ({ salesData }: SalesStatusCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{salesData.containerName}</CardTitle>
            <CardDescription>Sales performance and client connections</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-1">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Primary Client</h4>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={salesData.supermarketClient.imageUrl} alt={salesData.supermarketClient.name} />
                  <AvatarFallback>{salesData.supermarketClient.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{salesData.supermarketClient.name}</p>
                  <p className="text-xs text-muted-foreground">{salesData.supermarketClient.location}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Sales Summary</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Total Sales</p>
                  <p className="text-xl font-bold mt-1">{salesData.totalSales} kg</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-xl font-bold mt-1">{formatCurrency(salesData.totalRevenue)}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <p className="text-lg font-semibold">
                {formatCurrency(salesData.priceRange.min)} - {formatCurrency(salesData.priceRange.max)} <span className="text-xs text-muted-foreground">per kg</span>
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Tokenization</h4>
              <div className="flex items-center gap-2 p-2 rounded-md bg-purple-50 border border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                <CircleDollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm font-medium">AKAR Tokens Available</p>
                  <p className="text-xs text-muted-foreground">This container's produce is tokenized as ERC-20</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Monthly Sales (kg)</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData.monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} kg`, 'Sales']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="sales" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">
            Recurring Customers <span className="text-muted-foreground">({salesData.recurringCustomers.length})</span>
          </h4>
          <div className="flex flex-wrap gap-1">
            {salesData.recurringCustomers.slice(0, 5).map((customer) => (
              <Avatar key={customer.id} className="h-7 w-7 border border-border" title={customer.name}>
                <AvatarImage src={customer.imageUrl} alt={customer.name} />
                <AvatarFallback>{customer.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            ))}
            {salesData.recurringCustomers.length > 5 && (
              <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs">
                +{salesData.recurringCustomers.length - 5}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
