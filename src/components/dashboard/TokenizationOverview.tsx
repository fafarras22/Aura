
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, FileText, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TokenizationData } from "@/services/mockDataService";
import { formatTokenAmount, formatCurrency, shortenAddress } from "@/lib/utils";
import { useDeveloperMode } from "@/context/DeveloperModeContext";

interface TokenizationOverviewProps {
  tokenData: TokenizationData;
}

export const TokenizationOverview = ({ tokenData }: TokenizationOverviewProps) => {
  const { isDeveloperMode, currentUser } = useDeveloperMode();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">Crop Tokenization</CardTitle>
            <CardDescription className="text-sm">ERC-20 tokens representing your farm produce</CardDescription>
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
              <CircleDollarSign className="h-4 w-4 text-green-600" />
              <h4 className="font-medium text-sm">Total Token Value</h4>
            </div>
            <div className="text-xl font-bold">{formatCurrency(tokenData.totalValue)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatTokenAmount(tokenData.totalTokens || 0)} AKAR tokens
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium text-sm">Active Contracts</h4>
            </div>
            <div className="text-xl font-bold">{tokenData.activeContracts}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {tokenData.totalInvestors || 0} investors participating
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2 mb-2">
              <CircleDollarSign className="h-4 w-4 text-amber-600" />
              <h4 className="font-medium text-sm">Avg. Return Rate</h4>
            </div>
            <div className="text-xl font-bold">{tokenData.averageReturn}%</div>
            <div className="text-xs text-muted-foreground mt-1">
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
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'invested' ? 'bg-green-100 text-green-700' : 
                    activity.type === 'harvested' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {activity.type === 'invested' ? (
                      <CircleDollarSign className="h-4 w-4" />
                    ) : activity.type === 'harvested' ? (
                      <FileText className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium text-sm">{activity.description}</p>
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
            {isDeveloperMode ? (
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-md p-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Token purchases are restricted in Developer mode</span>
              </div>
            ) : (
              <Button variant="outline" className="w-full">
                View All Token Activity
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
