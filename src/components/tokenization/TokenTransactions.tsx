
import React from 'react';
import { TokenizationData } from "@/services/mockDataService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowRight } from "lucide-react";

export interface TokenTransactionsProps {
  tokenData: TokenizationData;
}

export const TokenTransactions: React.FC<TokenTransactionsProps> = ({ tokenData }) => {
  // Function to get transaction icon based on type
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <ArrowDown className="h-4 w-4 text-green-500" />;
      case 'sell':
        return <ArrowUp className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowRight className="h-4 w-4 text-blue-500" />;
    }
  };

  // Function to get badge variant based on status
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'outline';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Recent token transactions and trading activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tokenData.recentTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium capitalize">{transaction.type} Transaction</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{transaction.amount} AKR</span>
                  <Badge variant={getStatusVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  IDR {transaction.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">View All Transactions</Button>
        </div>
      </CardContent>
    </Card>
  );
};
