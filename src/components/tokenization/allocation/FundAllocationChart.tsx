
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { FundAllocationData } from './types';

interface FundAllocationChartProps {
  fundAllocationData: FundAllocationData[];
}

export const FundAllocationChart: React.FC<FundAllocationChartProps> = ({ fundAllocationData }) => {
  return (
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
                <Progress value={item.value} className="h-2" style={{backgroundColor: item.color}} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
