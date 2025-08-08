
import { useEffect, useMemo, useRef, useState } from "react";

interface UseTokenPriceResult {
  price: number;
  change24h: number; // percentage
  loading: boolean;
  error: string | null;
}

// Simple client-side price ticker with gentle random walk.
// Replace the fetchPrice function later with a real API (e.g., CoinGecko/Supabase) when available.
export function useTokenPrice(symbol: string, opts?: { intervalMs?: number; initialPrice?: number }) : UseTokenPriceResult {
  const intervalMs = opts?.intervalMs ?? 10000; // 10s
  const [price, setPrice] = useState<number>(opts?.initialPrice ?? 1.85);
  const [change24h, setChange24h] = useState<number>(0.0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const baseRef = useRef<number>(price);

  // Placeholder fetcher – swap with real API when available
  const fetchPrice = async (): Promise<{ price: number; change24h: number }> => {
    // Simulate a bounded random walk around the current price
    const delta = (Math.random() - 0.5) * 0.02; // ±1%
    const next = Math.max(0.01, price * (1 + delta));
    // Simulate a 24h change percentage (kept within ±8%)
    const simulated24h = Math.max(-8, Math.min(8, (next - baseRef.current) / baseRef.current * 100));
    return { price: parseFloat(next.toFixed(4)), change24h: parseFloat(simulated24h.toFixed(2)) };
  };

  useEffect(() => {
    let timer: number | undefined;
    let mounted = true;

    const tick = async () => {
      try {
        setLoading(true);
        const { price: p, change24h: c } = await fetchPrice();
        if (!mounted) return;
        setPrice(p);
        setChange24h(c);
        setError(null);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? 'Failed to fetch price');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    // Prime base reference on first mount to anchor 24h change
    baseRef.current = price;

    // Initial tick and interval
    tick();
    timer = window.setInterval(tick, intervalMs);
    return () => {
      mounted = false;
      if (timer) window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, intervalMs]);

  return useMemo(() => ({ price, change24h, loading, error }), [price, change24h, loading, error]);
}
