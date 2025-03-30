
import React, { useState } from 'react';
import { TokenizationData } from "@/services/mockDataService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { formatCurrency, formatTokenAmount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowRight, Lock, AlertCircle } from "lucide-react";
import { TokenProjectDetailsModal } from "./TokenProjectDetailsModal";
import { TokenPurchaseModal } from "./TokenPurchaseModal";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TokenInvestmentsProps {
  tokenData: TokenizationData;
  isDeveloperMode?: boolean;
}

export const TokenInvestments: React.FC<TokenInvestmentsProps> = ({ tokenData, isDeveloperMode = false }) => {
  const { toast } = useToast();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Sample investment opportunities data with expanded information
  const investmentOpportunities = [
    { 
      id: 1, 
      name: "Green Leafy Pack", 
      containerNumber: "Container 2", 
      minAmount: 5000000, 
      returnRate: 12, 
      tokensAvailable: 5000, 
      tokensSold: 3000,
      period: "6 months", 
      risk: "Low",
      location: "Jakarta Urban Farm Hub",
      description: "A diverse mix of lettuce, spinach, and kale varieties grown in optimized hydroponic systems. This container farm produces chemical-free greens year-round with 95% less water usage than traditional farming.",
      status: "Active",
      startDate: "May 15, 2023",
      harvestDate: "Nov 15, 2023",
      investors: 47,
      crops: ["Lettuce", "Spinach", "Kale", "Arugula"],
      historicalReturns: [
        {month: "Jan", return: 10.5},
        {month: "Feb", return: 11.2},
        {month: "Mar", return: 12.1},
        {month: "Apr", return: 11.8},
        {month: "May", return: 12.3},
        {month: "Jun", return: 12.7}
      ]
    },
    { 
      id: 2, 
      name: "Herb Collection", 
      containerNumber: "Container 5", 
      minAmount: 10000000, 
      returnRate: 15, 
      tokensAvailable: 3000, 
      tokensSold: 4500,
      period: "12 months", 
      risk: "Medium",
      location: "Bali Culinary Hub",
      description: "Premium culinary herbs including basil, mint, cilantro, and parsley targeted to high-end restaurants and hotels in Bali's tourism district. These herbs command premium prices in the luxury hospitality market.",
      status: "Funding",
      startDate: "July 1, 2023",
      harvestDate: "June 30, 2024",
      investors: 28,
      crops: ["Basil", "Mint", "Cilantro", "Parsley", "Dill"],
      historicalReturns: [
        {month: "Jan", return: 13.2},
        {month: "Feb", return: 14.1},
        {month: "Mar", return: 15.3},
        {month: "Apr", return: 14.8},
        {month: "May", return: 15.5},
        {month: "Jun", return: 16.2}
      ]
    },
    { 
      id: 3, 
      name: "Premium Vegetables", 
      containerNumber: "Container 3", 
      minAmount: 25000000, 
      returnRate: 18, 
      tokensAvailable: 2000, 
      tokensSold: 8000,
      period: "18 months", 
      risk: "Medium-High",
      location: "Surabaya Distribution Center",
      description: "High-value specialty vegetables including cherry tomatoes, bell peppers, and cucumbers. This container uses advanced LED technology and vertical growing systems to maximize yield per square meter.",
      status: "Active",
      startDate: "March 10, 2023",
      harvestDate: "September 10, 2024",
      investors: 65,
      crops: ["Cherry Tomatoes", "Bell Peppers", "Cucumbers", "Eggplants"],
      historicalReturns: [
        {month: "Jan", return: 16.5},
        {month: "Feb", return: 17.2},
        {month: "Mar", return: 18.4},
        {month: "Apr", return: 17.9},
        {month: "May", return: 18.6},
        {month: "Jun", return: 19.2}
      ]
    },
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

  const handleOpenDetails = (projectId: number) => {
    setSelectedProject(projectId);
    setIsDetailsModalOpen(true);
  };

  const handleInvest = () => {
    if (isDeveloperMode) {
      toast({
        title: "Access Denied",
        description: "Token purchases are not allowed in Developer mode",
        variant: "destructive"
      });
      return;
    }
    
    setIsDetailsModalOpen(false);
    setIsPurchaseModalOpen(true);
  };

  const handlePurchaseComplete = () => {
    setIsPurchaseModalOpen(false);
    toast({
      title: "Investment Initiated",
      description: "Your investment request has been submitted. Check your email for confirmation.",
    });
  };

  return (
    <div className="space-y-6">
      {isDeveloperMode && (
        <Alert variant="default" className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900 dark:text-amber-300">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            You are viewing all investment data across all containers. Purchasing tokens is disabled in Developer mode.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Investment Performance</CardTitle>
          <CardDescription className="text-sm">Track your token investment growth over time</CardDescription>
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
          <CardTitle className="text-lg font-semibold">Available Investment Opportunities</CardTitle>
          <CardDescription className="text-sm">Current farm containers open for tokenized investment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investmentOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-sm">{opportunity.name}</h4>
                    <p className="text-xs text-muted-foreground">{opportunity.containerNumber}</p>
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
                    <p className="text-xs text-muted-foreground">Minimum</p>
                    <p className="font-medium text-sm">{formatCurrency(opportunity.minAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Return Rate</p>
                    <p className="font-medium text-sm">{opportunity.returnRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Available Tokens</p>
                    <p className="font-medium text-sm">{formatTokenAmount(opportunity.tokensAvailable)} AKR</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Period</p>
                    <p className="font-medium text-sm">{opportunity.period}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="w-full sm:w-auto" 
                    variant="outline"
                    onClick={() => handleOpenDetails(opportunity.id)}
                    size="sm"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                  {isDeveloperMode ? (
                    <Button 
                      className="w-full sm:w-auto"
                      variant="outline"
                      size="sm"
                      disabled
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Admin View Only
                    </Button>
                  ) : (
                    <Button 
                      className="w-full sm:w-auto"
                      onClick={() => handleOpenDetails(opportunity.id)}
                      size="sm"
                    >
                      Invest Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Details Modal */}
      {selectedProject !== null && (
        <TokenProjectDetailsModal
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
          project={investmentOpportunities.find(p => p.id === selectedProject)!}
          onInvest={handleInvest}
          isDeveloperMode={isDeveloperMode}
        />
      )}

      {/* Purchase Modal - only show for non-developer mode */}
      {!isDeveloperMode && (
        <TokenPurchaseModal
          open={isPurchaseModalOpen}
          onOpenChange={setIsPurchaseModalOpen}
          onComplete={handlePurchaseComplete}
          tokenId={selectedProject ? `token-${selectedProject}` : null}
        />
      )}
    </div>
  );
};
