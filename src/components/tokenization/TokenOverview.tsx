
import React from 'react';
import { formatCurrency, formatTokenAmount } from "@/lib/utils";
import { TokenizationData } from "@/services/mockDataService";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, TrendingUp, Users } from "lucide-react";

interface TokenOverviewProps {
  tokenData: TokenizationData;
}

export const TokenOverview: React.FC<TokenOverviewProps> = ({ tokenData }) => {
  const tokenDistributionData = [
    { name: 'Container 1', value: 25 },
    { name: 'Container 2', value: 15 },
    { name: 'Container 3', value: 20 },
    { name: 'Container 4', value: 10 },
    { name: 'Container 5', value: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <CircleDollarSign className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Token Value</p>
                <h4 className="text-2xl font-bold">{formatCurrency(tokenData.totalValue)}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Yield</p>
                <h4 className="text-2xl font-bold">{tokenData.averageReturn}%</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Investors</p>
                <h4 className="text-2xl font-bold">{tokenData.totalInvestors}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Token Distribution by Container</CardTitle>
            <CardDescription>How your tokens are distributed across farm containers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tokenDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {tokenDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Token Performance</CardTitle>
            <CardDescription>Token value performance over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokenData.recentActivities.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className={`text-sm font-medium ${
                    activity.type === 'invested' ? 'text-green-600' : 
                    activity.type === 'harvested' ? 'text-blue-600' : 'text-amber-600'
                  }`}>
                    {formatTokenAmount(activity.tokenAmount)} AKR
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
