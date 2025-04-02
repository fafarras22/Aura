
import { TokenizationData } from './types';
import { format } from 'date-fns';

export const getMockTokenizationData = (): TokenizationData => {
  return {
    totalValue: 325000000,
    totalTokens: 32500,
    activeContracts: 7,
    totalInvestors: 42,
    averageReturn: 14.5,
    recentActivities: [
      {
        id: "token-act-1",
        type: "invested",
        description: "New investment",
        tokenAmount: 1200,
        date: format(new Date(), "dd MMM yyyy"),
        transactionHash: "0x1234567890abcdef"
      },
      {
        id: "token-act-2",
        type: "harvested",
        description: "Harvest yield distributed",
        tokenAmount: 600,
        date: format(new Date(Date.now() - 86400000), "dd MMM yyyy"),
        transactionHash: "0x0987654321fedcba"
      }
    ],
    tokenBalance: 12000,
    tokenPrice: 10000,
    tokenChange: 3.5,
    tokenChangeType: "increase",
    tokenHolders: [],
    investments: [],
    recentTransactions: [
      {
        id: "tx-1",
        type: "buy",
        date: format(new Date(), "dd MMM yyyy"),
        amount: 100,
        value: 1000000,
        status: "completed"
      },
      {
        id: "tx-2",
        type: "sell",
        date: format(new Date(Date.now() - 86400000), "dd MMM yyyy"),
        amount: 50,
        value: 500000,
        status: "completed"
      },
      {
        id: "tx-3",
        type: "transfer",
        date: format(new Date(Date.now() - 172800000), "dd MMM yyyy"),
        amount: 25,
        value: 250000,
        status: "pending"
      },
    ],
    tokenAllocation: [
      { name: "Farm 1", value: 40 },
      { name: "Farm 2", value: 30 },
      { name: "Farm 3", value: 20 },
      { name: "Reserve", value: 10 }
    ],
    investmentPerformance: [
      { name: "Jan", return: 2.1 },
      { name: "Feb", return: 2.3 },
      { name: "Mar", return: 2.5 },
      { name: "Apr", return: 3.0 },
      { name: "May", return: 2.8 },
      { name: "Jun", return: 3.2 }
    ],
    contractDuration: 12
  };
};
