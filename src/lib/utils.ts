
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTokenAmount(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

export function shortenAddress(address: string): string {
  if (!address) return '';
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'completed':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
}

export function calculateTokenPrice(basePrice: number, yieldRate: number, timeHeld: number): number {
  // Simple token price calculation based on base price, yield rate, and time held
  // In a real app, this would be much more complex and would come from blockchain data
  return basePrice * (1 + (yieldRate / 100) * (timeHeld / 12));
}

export function calculateROI(initialInvestment: number, currentValue: number): number {
  return ((currentValue - initialInvestment) / initialInvestment) * 100;
}
