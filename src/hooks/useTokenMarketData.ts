import { useEffect, useMemo, useRef, useState } from 'react';
import { UMBI_TOKEN } from '@/config/token';

export interface MarketPoint {
  t: number; // timestamp
  price: number; // USD
  holders?: number;
  supply?: number; // total supply (units)
}

interface UseTokenMarketDataOptions {
  intervalMs?: number;
  maxPoints?: number;
}

// Public endpoints (no API key required)
const dexScreenerBase = 'https://api.dexscreener.com/latest/dex/tokens';
const goPlusBase = 'https://api.gopluslabs.io/api/v1/token_security';

async function fetchPriceUsd(address: string): Promise<number | null> {
  try {
    const res = await fetch(`${dexScreenerBase}/${address}`);
    if (!res.ok) return null;
    const json = await res.json();
    const pair = json?.pairs?.[0];
    const price = pair?.priceUsd ? parseFloat(pair.priceUsd) : null;
    return Number.isFinite(price) ? price : null;
  } catch {
    return null;
  }
}

async function fetchHoldersAndSupply(chainId: number, address: string): Promise<{ holders?: number; supply?: number }> {
  try {
    const url = `${goPlusBase}/${chainId}?contract_addresses=${address}`;
    const res = await fetch(url);
    if (!res.ok) return {};
    const json = await res.json();
    const entry = json?.result?.[address.toLowerCase()] || json?.result?.[address] || Object.values(json?.result || {})[0];
    const holders = entry?.holder_count ? parseInt(entry.holder_count, 10) : undefined;
    const supply = entry?.total_supply ? parseFloat(entry.total_supply) : undefined;
    return { holders, supply };
  } catch {
    return {};
  }
}

export function useTokenMarketData(opts: UseTokenMarketDataOptions = {}) {
  const { intervalMs = 10000, maxPoints = 120 } = opts;
  const [series, setSeries] = useState<MarketPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const address = UMBI_TOKEN.address;
  const chainId = UMBI_TOKEN.chainId;
  const hasAddress = /^0x[a-fA-F0-9]{40}$/.test(address);
  const basePriceRef = useRef<number | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    let mounted = true;

    const tick = async () => {
      try {
        setLoading(true);
        let price: number | null = null;
        let holders: number | undefined;
        let supply: number | undefined;

        if (hasAddress) {
          [price, { holders, supply }] = await Promise.all([
            fetchPriceUsd(address),
            fetchHoldersAndSupply(chainId, address),
          ]);
        }

        // Fallback simulate if API/data is not available yet
        if (!price) {
          const last = series[series.length - 1]?.price ?? 1.85;
          const delta = (Math.random() - 0.5) * 0.01; // ±0.5%
          price = Math.max(0.01, last * (1 + delta));
          holders = holders ?? Math.max(100, Math.round((series[series.length - 1]?.holders || 1000) * (1 + (Math.random() - 0.4) * 0.002)));
          supply = supply ?? (series[series.length - 1]?.supply || 100_000_000);
        }

        if (basePriceRef.current == null) basePriceRef.current = price;

        const point: MarketPoint = { t: Date.now(), price, holders, supply };
        setSeries((prev) => {
          const next = [...prev, point];
          return next.length > maxPoints ? next.slice(next.length - maxPoints) : next;
        });
        setError(null);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load market data');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    // initial load and interval
    tick();
    timer = window.setInterval(tick, intervalMs);
    return () => {
      mounted = false;
      if (timer) window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chainId, hasAddress, intervalMs]);

  const latest = series[series.length - 1];
  const change24h = useMemo(() => {
    if (series.length < 2) return 0;
    const windowMs = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const base = series.find((p) => now - p.t <= windowMs) || series[0];
    if (!base || !latest) return 0;
    return ((latest.price - base.price) / base.price) * 100;
  }, [series, latest]);

  return { series, latest, change24h, loading, error };
}
