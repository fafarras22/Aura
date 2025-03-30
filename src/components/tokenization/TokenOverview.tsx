
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TokenizationData } from '@/services/mockDataService';
import { PieChartDisplay } from './overview/PieChartDisplay';
import { BarChartDisplay } from './overview/BarChartDisplay';
import { TokenStatsDisplay } from './overview/TokenStatsDisplay';

interface TokenOverviewProps {
  tokenData: TokenizationData;
}

export const TokenOverview: React.FC<TokenOverviewProps> = ({ tokenData }) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Tokenization Overview</CardTitle>
        <CardDescription>
          Summary of tokenized assets and performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TokenStatsDisplay tokenData={tokenData} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PieChartDisplay 
            data={tokenData.tokenAllocation}
            title="Token Allocation"
            description="Distribution of tokens across different assets"
          />
          <BarChartDisplay 
            data={tokenData.investmentPerformance}
            title="Investment Performance"
            description="Historical performance of tokenized investments"
          />
        </div>
      </CardContent>
    </Card>
  );
};
