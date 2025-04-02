
import { useState, useEffect } from 'react';

// Export the main hook function
export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (not in SSR)
    if (typeof window === 'undefined') return;

    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

// Add an alias for the same function to maintain backward compatibility
export const useIsMobile = useMobile;
