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
