
export interface Investment {
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
  historicalReturns: HistoricalReturn[];
}

export interface HistoricalReturn {
  month: string;
  return: number;
}
