
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TokenizationData } from "@/services/mockDataService";
import { formatTokenAmount, formatCurrency, shortenAddress } from "@/lib/utils";

interface TokenizationOverviewProps {
  tokenData: TokenizationData;
}

export const TokenizationOverview = ({ tokenData }: TokenizationOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Crop Tokenization</CardTitle>
            <CardDescription>ERC-20 tokens representing your farm produce</CardDescription>
          </div>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
            Blockchain
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 mb-2">
              <CircleDollarSign className="h-5 w-5 text-green-600" />
              <h4 className="font-medium">Total Token Value</h4>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(tokenData.totalValue)}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {formatTokenAmount(tokenData.totalTokens || 0)} AKAR tokens
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium">Active Contracts</h4>
            </div>
            <div className="text-2xl font-bold">{tokenData.activeContracts}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {tokenData.totalInvestors || 0} investors participating
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 mb-2">
              <CircleDollarSign className="h-5 w-5 text-amber-600" />
              <h4 className="font-medium">Avg. Return Rate</h4>
            </div>
            <div className="text-2xl font-bold">{tokenData.averageReturn}%</div>
            <div className="text-sm text-muted-foreground mt-1">
              Annual projected returns
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Recent Tokenization Activity</h3>
          <div className="space-y-3">
            {(tokenData.recentActivities || []).slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'invested' ? 'bg-green-100 text-green-700' : 
                    activity.type === 'harvested' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {activity.type === 'invested' ? (
                      <CircleDollarSign className="h-5 w-5" />
                    ) : activity.type === 'harvested' ? (
                      <FileText className="h-5 w-5" />
                    ) : (
                      <ArrowRight className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {activity.transactionHash && <span>Tx: {shortenAddress(activity.transactionHash)}</span>}
                      <span>•</span>
                      <span>{activity.date}</span>
                    </div>
                  </div>
                </div>
                
                <Badge variant={
                  activity.type === 'invested' ? 'default' : 
                  activity.type === 'harvested' ? 'secondary' : 
                  'outline'
                }>
                  {formatTokenAmount(activity.tokenAmount)} AKAR
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" className="w-full">
              View All Token Activity
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
