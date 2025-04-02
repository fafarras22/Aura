
import { TokenizationData } from './types';

// Mock tokenization data
export const getMockTokenizationData = (): TokenizationData => {
  return {
    totalValue: 8750000000, // In IDR
    activeContracts: 125,
    averageReturn: 12.5,
    tokenBalance: 5000,
    tokenPrice: 15000, // IDR per token
    tokenChange: 3.2,
    tokenChangeType: 'increase',
    contractDuration: 12, // Added property
    recentTransactions: [
      {
        id: 't1',
        type: 'buy',
        amount: 250,
        value: 3750000,
        date: '2023-11-10',
        status: 'completed'
      },
      {
        id: 't2',
        type: 'sell',
        amount: 100,
        value: 1500000,
        date: '2023-11-09',
        status: 'completed'
      },
      {
        id: 't3',
        type: 'transfer',
        amount: 50,
        value: 750000,
        date: '2023-11-08',
        status: 'completed'
      },
      {
        id: 't4',
        type: 'buy',
        amount: 500,
        value: 7500000,
        date: '2023-11-07',
        status: 'completed'
      },
      {
        id: 't5',
        type: 'buy',
        amount: 1000,
        value: 15000000,
        date: '2023-11-05',
        status: 'completed'
      }
    ],
    tokenHolders: [
      { category: 'Institutional Investors', percentage: 45 },
      { category: 'Retail Investors', percentage: 30 },
      { category: 'Team & Advisors', percentage: 15 },
      { category: 'Community Rewards', percentage: 10 }
    ],
    investments: [
      {
        id: 'i1',
        name: 'Jakarta Central Farm Expansion',
        tokens: 2000,
        value: 30000000,
        returnRate: 14.5,
        startDate: '2023-06-01',
        endDate: '2024-06-01',
        status: 'active'
      },
      {
        id: 'i2',
        name: 'Bali Eco Center Containers',
        tokens: 1500,
        value: 22500000,
        returnRate: 12.0,
        startDate: '2023-08-15',
        endDate: '2024-08-15',
        status: 'active'
      },
      {
        id: 'i3',
        name: 'Surabaya Technology Upgrade',
        tokens: 1000,
        value: 15000000,
        returnRate: 10.5,
        startDate: '2023-09-01',
        endDate: '2024-03-01',
        status: 'active'
      },
      {
        id: 'i4',
        name: 'Yogyakarta Research Initiative',
        tokens: 500,
        value: 7500000,
        returnRate: 11.0,
        startDate: '2023-07-01',
        endDate: '2023-10-01',
        status: 'completed'
      }
    ],
    // Adding missing properties
    totalTokens: 7,
    totalInvestors: 350,
    recentActivities: [
      {
        id: 'a1',
        type: 'invested',
        description: 'New investment in Jakarta Central Farm',
        tokenAmount: 500,
        date: '2023-11-12',
        transactionHash: '0x1a2b3c4d5e6f7g8h9i0j'
      },
      {
        id: 'a2',
        type: 'harvested',
        description: 'Harvest yield distributed as tokens',
        tokenAmount: 250,
        date: '2023-11-10'
      },
      {
        id: 'a3',
        type: 'other',
        description: 'Community rewards distributed',
        tokenAmount: 100,
        date: '2023-11-05',
        transactionHash: '0xabcdef1234567890'
      }
    ],
    tokenAllocation: [
      { name: 'Operations', value: 30 },
      { name: 'Expansion', value: 25 },
      { name: 'Investor Returns', value: 20 },
      { name: 'Technology', value: 15 },
      { name: 'Community', value: 10 }
    ],
    investmentPerformance: [
      { month: 'Jan', value: 8.2 },
      { month: 'Feb', value: 7.8 },
      { month: 'Mar', value: 9.3 },
      { month: 'Apr', value: 10.1 },
      { month: 'May', value: 11.2 },
      { month: 'Jun', value: 12.0 },
      { month: 'Jul', value: 11.5 },
      { month: 'Aug', value: 12.3 },
      { month: 'Sep', value: 13.1 },
      { month: 'Oct', value: 12.8 },
      { month: 'Nov', value: 12.5 },
      { month: 'Dec', value: 13.2 }
    ]
  };
};
