
import React from 'react';
import { TokenizationData } from "@/services/mockDataService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { formatCurrency, formatTokenAmount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowRight } from "lucide-react";

interface TokenInvestmentsProps {
  tokenData: TokenizationData;
}

export const TokenInvestments: React.FC<TokenInvestmentsProps> = ({ tokenData }) => {
  // Sample investment opportunities data
  const investmentOpportunities = [
    { id: 1, name: "Green Leafy Pack", container: "Container 2", minAmount: 5000000, returnRate: 12, tokensAvailable: 5000, period: "6 months", risk: "Low" },
    { id: 2, name: "Herb Collection", container: "Container 5", minAmount: 10000000, returnRate: 15, tokensAvailable: 3000, period: "12 months", risk: "Medium" },
    { id: 3, name: "Premium Vegetables", container: "Container 3", minAmount: 25000000, returnRate: 18, tokensAvailable: 2000, period: "18 months", risk: "Medium-High" },
  ];

  // Sample investment performance data
  const performanceData = [
    { month: 'Jan', investment: 50, return: 53.5 },
    { month: 'Feb', investment: 100, return: 108 },
    { month: 'Mar', investment: 150, return: 165 },
    { month: 'Apr', investment: 200, return: 222 },
    { month: 'May', investment: 250, return: 280 },
    { month: 'Jun', investment: 300, return: 342 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Investment Performance</CardTitle>
          <CardDescription>Track your token investment growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} AKR`, 'Amount']} />
                <Legend />
                <Bar dataKey="investment" name="Initial Investment" fill="#8884d8" />
                <Bar dataKey="return" name="Current Value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Investment Opportunities</CardTitle>
          <CardDescription>Current farm containers open for tokenized investment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investmentOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{opportunity.name}</h4>
                    <p className="text-sm text-muted-foreground">{opportunity.container}</p>
                  </div>
                  <Badge variant={
                    opportunity.risk === 'Low' ? 'outline' :
                    opportunity.risk === 'Medium' ? 'secondary' : 'default'
                  }>
                    {opportunity.risk} Risk
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Minimum</p>
                    <p className="font-medium">{formatCurrency(opportunity.minAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Return Rate</p>
                    <p className="font-medium">{opportunity.returnRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available Tokens</p>
                    <p className="font-medium">{formatTokenAmount(opportunity.tokensAvailable)} AKR</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="font-medium">{opportunity.period}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="w-full sm:w-auto" variant="outline">
                    <Wallet className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                  <Button className="w-full sm:w-auto">
                    Invest Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
