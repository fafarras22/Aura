
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Investment } from './types';

interface DataTableProps {
  investments: Investment[]
}

export function InvestmentTable({ investments }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Return Rate</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell className="font-medium">{investment.name}</TableCell>
              <TableCell>{investment.location}</TableCell>
              <TableCell>{investment.returnRate}%</TableCell>
              <TableCell>
                <Badge className={cn(
                  investment.riskLevel === "low" ? "bg-green-100 text-green-800" :
                    investment.riskLevel === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800",
                  "border-none"
                )}>
                  {investment.riskLevel}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
                    <DropdownMenuItem>Simulate Investment</DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="https://etherscan.io" target="_blank" rel="noopener noreferrer">
                        View on Etherscan
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
