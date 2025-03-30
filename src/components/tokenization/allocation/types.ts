
export interface FundAllocationData {
  name: string;
  value: number;
  color: string;
}

export interface AllocationItem {
  category: string;
  percentage: number;
  amount: number;
}

export interface ContainerAllocation {
  id: number;
  name: string;
  allocations: AllocationItem[];
}

export interface TokenAllocationData {
  fundAllocation: FundAllocationData[];
  containerAllocations: ContainerAllocation[];
}
