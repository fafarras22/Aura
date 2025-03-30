import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TokenizationData } from '@/services/mockDataService';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, TrendingUp, Users, FileText, ArrowUpRight } from 'lucide-react';

// Updated interface for the component
interface TokenOverviewProps {
  tokenData: TokenizationData;
}

// Update the component declaration to use the interface
export const TokenOverview: React.FC<TokenOverviewProps> = ({ tokenData }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Tokenization Overview</CardTitle>
        <CardDescription>
          Summary of tokenized assets and performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Total Value</div>
            <div className="text-2xl font-bold">IDR {tokenData.totalValue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              <TrendingUp className="inline-block w-4 h-4 mr-1" />
              {tokenData.averageReturn}% average return
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Active Contracts</div>
            <div className="text-2xl font-bold">{tokenData.activeContracts}</div>
            <div className="text-sm text-muted-foreground">
              <CalendarCheck className="inline-block w-4 h-4 mr-1" />
              {tokenData.contractDuration} months average duration
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Token Allocation</CardTitle>
              <CardDescription>Distribution of tokens across different assets</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tokenData.tokenAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tokenData.tokenAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Performance</CardTitle>
              <CardDescription>Historical performance of tokenized investments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tokenData.investmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
