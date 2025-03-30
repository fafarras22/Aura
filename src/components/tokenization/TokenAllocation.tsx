
import React from 'react';
import { TokenizationData } from "@/services/mockDataService";
import { FundAllocationChart } from './allocation/FundAllocationChart';
import { ContainerAllocationTabs } from './allocation/ContainerAllocation';
import { allocationData } from './allocation/mockData';

interface TokenAllocationProps {
  tokenData: TokenizationData;
}

export const TokenAllocation: React.FC<TokenAllocationProps> = ({ tokenData }) => {
  return (
    <div className="space-y-6">
      <FundAllocationChart fundAllocationData={allocationData.fundAllocation} />
      <ContainerAllocationTabs containerAllocations={allocationData.containerAllocations} />
    </div>
  );
};
