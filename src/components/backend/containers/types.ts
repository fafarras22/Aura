
export interface ContainerData {
  id: string;
  name: string;
  owner: string;
  status: string;
  location: string;
  nextPaymentDue: string; // Use string for ISO date format
  currentYield: number;
  projectedYield: number;
  createdAt: string; // Use string for ISO date format
}
