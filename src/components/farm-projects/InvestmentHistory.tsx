
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const InvestmentHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Mock investment history data
  const investments = [
    {
      id: "inv-1",
      container: "Container A - Premium Herbs",
      containerNumber: "001",
      amount: 200,
      date: "2023-11-01",
      apy: 12.5,
      status: "active",
      endDate: "2024-11-01",
      transactions: [
        { id: "tx-1", hash: "0x1a2b3c...", type: "stake" }
      ]
    },
    {
      id: "inv-2",
      container: "Container D - Microgreens Expansion",
      containerNumber: "004",
      amount: 100,
      date: "2023-12-15",
      apy: 14.2,
      status: "active",
      endDate: "2024-12-15",
      transactions: [
        { id: "tx-2", hash: "0x4d5e6f...", type: "stake" }
      ]
    },
    {
      id: "inv-3",
      container: "Container B - Exotic Fruits",
      containerNumber: "002",
      amount: 150,
      date: "2023-08-10",
      apy: 18.5,
      status: "completed",
      endDate: "2023-11-10",
      transactions: [
        { id: "tx-3", hash: "0x7g8h9i...", type: "stake" },
        { id: "tx-4", hash: "0xj0k1l2...", type: "unstake" }
      ]
    },
    {
      id: "inv-4",
      container: "Container F - Hydroponic System",
      containerNumber: "007",
      amount: 75,
      date: "2023-09-22",
      apy: 13.8,
      status: "completed",
      endDate: "2023-12-22",
      transactions: [
        { id: "tx-5", hash: "0xm3n4o5...", type: "stake" },
        { id: "tx-6", hash: "0xp6q7r8...", type: "unstake" }
      ]
    }
  ];
  
  // Filter investments based on search term and status filter
  const filteredInvestments = investments
    .filter(inv => 
      inv.container.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inv.containerNumber.includes(searchTerm)
    )
    .filter(inv => filterStatus === "all" || inv.status === filterStatus);
  
  // Export investment history as CSV
  const exportToCSV = () => {
    // CSV header
    const header = "ID,Container,Container #,Amount,Date,APY,Status,End Date\n";
    
    // CSV rows
    const rows = investments.map(inv => 
      `${inv.id},${inv.container},${inv.containerNumber},${inv.amount},${inv.date},${inv.apy}%,${inv.status},${inv.endDate}`
    ).join("\n");
    
    // Create CSV content
    const csvContent = `data:text/csv;charset=utf-8,${header}${rows}`;
    
    // Create download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "investment-history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Investment History</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2"
            onClick={exportToCSV}
          >
            <FileDown className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by container..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-40">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableCaption>A history of all your farm investments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Container</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>APY</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestments.length > 0 ? (
                filteredInvestments.map(inv => (
                  <TableRow key={inv.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{inv.container}</p>
                        <p className="text-xs text-muted-foreground">#{inv.containerNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{inv.amount} AGRI</TableCell>
                    <TableCell>{inv.date}</TableCell>
                    <TableCell className="text-green-600 font-medium">{inv.apy}%</TableCell>
                    <TableCell>
                      <Badge variant={inv.status === "active" ? "default" : "outline"}>
                        {inv.status === "active" ? "Active" : "Completed"}
                      </Badge>
                    </TableCell>
                    <TableCell>{inv.endDate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No investments found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
