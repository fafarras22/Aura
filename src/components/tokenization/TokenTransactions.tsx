
import React from 'react';
import { TokenizationData } from "@/services/mockDataService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTokenAmount, shortenAddress } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TokenTransactionsProps {
  tokenData: TokenizationData;
}

export const TokenTransactions: React.FC<TokenTransactionsProps> = ({ tokenData }) => {
  // Sample transaction data
  const transactions = [
    { 
      id: "tx1", 
      date: "2023-09-01",
      type: "buy", 
      amount: 500,
      tokenPrice: 15000,
      txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
      status: "confirmed"
    },
    { 
      id: "tx2", 
      date: "2023-09-15",
      type: "harvest", 
      amount: 120,
      tokenPrice: 15500,
      txHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
      status: "confirmed"
    },
    { 
      id: "tx3", 
      date: "2023-10-01",
      type: "sell", 
      amount: 200,
      tokenPrice: 16000,
      txHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
      status: "confirmed"
    },
    { 
      id: "tx4", 
      date: "2023-10-15",
      type: "buy", 
      amount: 1000,
      tokenPrice: 16200,
      txHash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
      status: "confirmed"
    },
    { 
      id: "tx5", 
      date: "2023-11-01",
      type: "dividend", 
      amount: 75,
      tokenPrice: 16500,
      txHash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
      status: "confirmed"
    },
    { 
      id: "tx6", 
      date: "2023-11-15",
      type: "harvest", 
      amount: 130,
      tokenPrice: 16800,
      txHash: "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a",
      status: "pending"
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All blockchain token transactions</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Input
                placeholder="Search transactions..."
                className="pl-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Token Price</TableHead>
                  <TableHead className="hidden md:table-cell">Transaction Hash</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                        tx.type === 'buy' ? 'default' :
                        tx.type === 'sell' ? 'destructive' :
                        tx.type === 'harvest' ? 'secondary' : 'outline'
                      }>
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatTokenAmount(tx.amount)} AKR</TableCell>
                    <TableCell className="hidden md:table-cell">
                      IDR {tx.tokenPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-xs font-mono">{shortenAddress(tx.txHash)}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        tx.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {tx.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View on explorer</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
