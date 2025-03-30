
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { HistoricalReturn } from './types';

interface InvestmentChartProps {
  historicalReturns: HistoricalReturn[];
}

export const InvestmentChart: React.FC<InvestmentChartProps> = ({ historicalReturns }) => {
  const chartColor = '#8884d8';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Returns</CardTitle>
        <CardDescription>Monthly performance of the investment.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={historicalReturns}>
            <defs>
              <linearGradient id="returnGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis unit="%" />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Return']}
              labelFormatter={(label) => `Month: ${label}`} 
            />
            <Area
              type="monotone"
              dataKey="return"
              stroke={chartColor}
              fillOpacity={1}
              fill="url(#returnGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
