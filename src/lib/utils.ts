
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shorten a blockchain address for display
 * @param address The full address to shorten 
 * @returns Shortened address (e.g. 0x1234...5678)
 */
export function shortenAddress(address: string): string {
  if (!address) return '';
  return address.length > 10 
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : address;
}

/**
 * Format currency values for display
 * @param value The number to format
 * @param currency The currency code (default: IDR)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency: string = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Format token amount for display
 * @param amount The token amount to format
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted token amount string
 */
export function formatTokenAmount(amount: number, decimals: number = 2): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
}
