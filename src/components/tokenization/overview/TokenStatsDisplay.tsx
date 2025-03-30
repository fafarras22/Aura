
import React from 'react';
import { TokenizationData } from "@/services/mockDataService";
import { TrendingUp, CalendarCheck } from 'lucide-react';

interface TokenStatsDisplayProps {
  tokenData: TokenizationData;
}

export const TokenStatsDisplay: React.FC<TokenStatsDisplayProps> = ({ tokenData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">Total Value</div>
        <div className="text-2xl font-bold">IDR {tokenData.totalValue.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">
          <TrendingUp className="inline-block w-4 h-4 mr-1" />
          {tokenData.averageReturn}% average return
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Active Contracts</div>
        <div className="text-2xl font-bold">{tokenData.activeContracts}</div>
        <div className="text-sm text-muted-foreground">
          <CalendarCheck className="inline-block w-4 h-4 mr-1" />
          {tokenData.contractDuration} months average duration
        </div>
      </div>
    </div>
  );
};
