import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, FileText, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTokenAmount, formatCurrency, shortenAddress } from "@/lib/utils";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

interface TokenInvestmentsProps {
  // tokenData: TokenizationData;
}

interface Investment {
  id: number;
  name: string;
  containerNumber: string;
  minAmount: number;
  returnRate: number;
  tokensAvailable: number;
  tokensSold: number;
  period: string;
  risk: string;
  location: string;
  description: string;
  imageUrl: string;
  status: string;
  fundingGoal: number;
  fundingProgress: number;
  duration: number;
  riskLevel: string;
  startDate: string;
  endDate: string;
  historicalReturns: { month: string; return: number }[];
}

const investmentData: Investment[] = [
  {
    id: 1,
    name: "Jakarta Container #JKT001",
    containerNumber: "AKAR-JKT001",
    minAmount: 5000000,
    returnRate: 14.5,
    tokensAvailable: 10000,
    tokensSold: 7500,
    period: "12 months",
    risk: "Medium",
    location: "Jakarta, Indonesia",
    description: "Hydroponic leafy greens production facility serving high-end supermarkets in Jakarta.",
    imageUrl: "",
    status: "active",
    fundingGoal: 100000000,
    fundingProgress: 75,
    duration: 12,
    riskLevel: "medium",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    historicalReturns: [
      { month: "Jan", return: 1.2 },
      { month: "Feb", return: 1.3 },
      { month: "Mar", return: 1.1 },
      { month: "Apr", return: 1.4 },
      { month: "May", return: 1.3 },
      { month: "Jun", return: 1.2 }
    ]
  },
  {
    id: 2,
    name: "Surabaya Container #SBY002",
    containerNumber: "AKAR-SBY002",
    minAmount: 7500000,
    returnRate: 16.0,
    tokensAvailable: 12000,
    tokensSold: 9000,
    period: "12 months",
    risk: "Low",
    location: "Surabaya, Indonesia",
    description: "Vertical farming operation specializing in organic herbs for local restaurants.",
    imageUrl: "",
    status: "active",
    fundingGoal: 120000000,
    fundingProgress: 80,
    duration: 12,
    riskLevel: "low",
    startDate: "2023-02-20",
    endDate: "2024-02-20",
    historicalReturns: [
      { month: "Jan", return: 1.3 },
      { month: "Feb", return: 1.4 },
      { month: "Mar", return: 1.2 },
      { month: "Apr", return: 1.5 },
      { month: "May", return: 1.4 },
      { month: "Jun", return: 1.3 }
    ]
  },
  {
    id: 3,
    name: "Medan Container #MDN003",
    containerNumber: "AKAR-MDN003",
    minAmount: 6000000,
    returnRate: 15.0,
    tokensAvailable: 11000,
    tokensSold: 8000,
    period: "12 months",
    risk: "Medium",
    location: "Medan, Indonesia",
    description: "Specialized in exotic fruits for export to Singapore and Malaysia.",
    imageUrl: "",
    status: "active",
    fundingGoal: 110000000,
    fundingProgress: 70,
    duration: 12,
    riskLevel: "medium",
    startDate: "2023-03-10",
    endDate: "2024-03-10",
    historicalReturns: [
      { month: "Jan", return: 1.1 },
      { month: "Feb", return: 1.2 },
      { month: "Mar", return: 1.0 },
      { month: "Apr", return: 1.3 },
      { month: "May", return: 1.2 },
      { month: "Jun", return: 1.1 }
    ]
  },
  {
    id: 4,
    name: "Makassar Container #MKS004",
    containerNumber: "AKAR-MKS004",
    minAmount: 7000000,
    returnRate: 15.5,
    tokensAvailable: 13000,
    tokensSold: 10000,
    period: "12 months",
    risk: "Low",
    location: "Makassar, Indonesia",
    description: "Focusing on sustainable vegetable production for local markets.",
    imageUrl: "",
    status: "active",
    fundingGoal: 130000000,
    fundingProgress: 85,
    duration: 12,
    riskLevel: "low",
    startDate: "2023-04-01",
    endDate: "2024-04-01",
    historicalReturns: [
      { month: "Jan", return: 1.4 },
      { month: "Feb", return: 1.5 },
      { month: "Mar", return: 1.3 },
      { month: "Apr", return: 1.6 },
      { month: "May", return: 1.5 },
      { month: "Jun", return: 1.4 }
    ]
  },
  {
    id: 5,
    name: "Denpasar Container #DPS005",
    containerNumber: "AKAR-DPS005",
    minAmount: 5500000,
    returnRate: 14.0,
    tokensAvailable: 10500,
    tokensSold: 8000,
    period: "12 months",
    risk: "Medium",
    location: "Denpasar, Indonesia",
    description: "Cultivating high-demand herbs for the tourism and hospitality sector.",
    imageUrl: "",
    status: "active",
    fundingGoal: 105000000,
    fundingProgress: 72,
    duration: 12,
    riskLevel: "medium",
    startDate: "2023-05-15",
    endDate: "2024-05-15",
    historicalReturns: [
      { month: "Jan", return: 1.0 },
      { month: "Feb", return: 1.1 },
      { month: "Mar", return: 0.9 },
      { month: "Apr", return: 1.2 },
      { month: "May", return: 1.1 },
      { month: "Jun", return: 1.0 }
    ]
  }
];

const dummyInvestment = {
  id: 1,
  name: "Jakarta Container #JKT001",
  containerNumber: "AKAR-JKT001",
  minAmount: 5000000,
  returnRate: 14.5,
  tokensAvailable: 10000,
  tokensSold: 7500,
  period: "12 months",
  risk: "Medium",
  location: "Jakarta, Indonesia",
  description: "Hydroponic leafy greens production facility serving high-end supermarkets in Jakarta.",
  imageUrl: "",
  status: "active",
  fundingGoal: 100000000,
  fundingProgress: 75,
  duration: 12, // Add this field
  riskLevel: "medium", // Add this field with correct type
  startDate: "2023-01-15",
  endDate: "2024-01-15",
  historicalReturns: [
    { month: "Jan", return: 1.2 },
    { month: "Feb", return: 1.3 },
    { month: "Mar", return: 1.1 },
    { month: "Apr", return: 1.4 },
    { month: "May", return: 1.3 },
    { month: "Jun", return: 1.2 }
  ]
};

interface DataTableProps {
  investments: Investment[]
}

function calculateRiskColor(risk: string): string {
  switch (risk.toLowerCase()) {
    case "low":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "high":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

export function DataTable({ investments }: DataTableProps) {
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
  )
}

interface InvestmentSimulationProps {
  investment: Investment;
}

export const InvestmentSimulation: React.FC<InvestmentSimulationProps> = ({ investment }) => {
  const [investmentAmount, setInvestmentAmount] = React.useState<number>(investment.minAmount);
  const [duration, setDuration] = React.useState<number>(investment.duration);

  const calculatePotentialReturn = (amount: number, rate: number, duration: number): number => {
    return amount * (1 + (rate / 100) * (duration / 12));
  };

  const potentialReturn = calculatePotentialReturn(investmentAmount, investment.returnRate, duration);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Investment Simulation</CardTitle>
        <CardDescription>Simulate your investment and see potential returns.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Investment Amount (IDR)</Label>
          <Input
            id="amount"
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Investment Duration (Months)</Label>
          <Slider
            id="duration"
            defaultValue={[investment.duration]}
            max={24}
            min={6}
            step={1}
            onValueChange={(value) => setDuration(value[0])}
          />
          <p className="text-sm text-muted-foreground">
            Selected Duration: {duration} months
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">
            Potential Return: {formatCurrency(potentialReturn)}
          </p>
        </div>
        <Button>Invest Now</Button>
      </CardContent>
    </Card>
  );
};

interface InvestmentChartProps {
  historicalReturns: { month: string; return: number }[];
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
            <Tooltip labelFormatter={(label) => `Month: ${label}`} />
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

const TokenInvestments = () => {
  const { isDeveloperMode, currentUser } = useDeveloperMode();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold">Investment Opportunities</CardTitle>
              <CardDescription className="text-sm">Invest in sustainable agriculture and earn returns.</CardDescription>
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              Blockchain
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <DataTable investments={investmentData} />
        </CardContent>
      </Card>

      <InvestmentSimulation investment={dummyInvestment} />
      <InvestmentChart historicalReturns={dummyInvestment.historicalReturns} />
    </div>
  );
};

export default TokenInvestments;
