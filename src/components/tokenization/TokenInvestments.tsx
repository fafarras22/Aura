
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InvestmentTable } from './investments/InvestmentTable';
import { InvestmentSimulation } from './investments/InvestmentSimulation';
import { InvestmentChart } from './investments/InvestmentChart';
import { investmentData, dummyInvestment } from './investments/mockData';

interface TokenInvestmentsProps {
  isDeveloperMode?: boolean;
}

const TokenInvestments: React.FC<TokenInvestmentsProps> = ({ isDeveloperMode }) => {
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
          <InvestmentTable investments={investmentData} />
        </CardContent>
      </Card>

      <InvestmentSimulation investment={dummyInvestment} />
      <InvestmentChart historicalReturns={dummyInvestment.historicalReturns} />
    </div>
  );
};

export default TokenInvestments;
