import React, { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTokenMarketData } from '@/hooks/useTokenMarketData';
import { UMBI_TOKEN } from '@/config/token';

// Supported timeframes for the headline chart
const TIMEFRAMES = [
  { key: '1m', label: '1m', windowMs: 60 * 1000 },
  { key: '1h', label: '1h', windowMs: 60 * 60 * 1000 },
  { key: '1d', label: '1D', windowMs: 24 * 60 * 60 * 1000 },
  { key: '1mo', label: '1M', windowMs: 30 * 24 * 60 * 60 * 1000 },
  { key: '3mo', label: '3M', windowMs: 90 * 24 * 60 * 60 * 1000 },
] as const;

type TimeframeKey = typeof TIMEFRAMES[number]['key'];

async function fetchHistoryByTimeframe(address: string, timeframe: TimeframeKey) {
  // Map timeframe to Coingecko 'days' param
  const daysMap: Record<TimeframeKey, number> = { '1m': 1, '1h': 1, '1d': 1, '1mo': 30, '3mo': 90 };
  const days = daysMap[timeframe];
  const network = UMBI_TOKEN.chainId === 42161 ? 'arbitrum-one' : UMBI_TOKEN.chain || 'ethereum';
  const url = `https://api.coingecko.com/api/v3/coins/${network}/contract/${address}/market_chart?vs_currency=usd&days=${days}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [] as { t: number; price: number }[];
    const json = await res.json();
    const prices: [number, number][] = json?.prices || [];
    return prices.map(([t, p]) => ({ t, price: p }));
  } catch {
    return [] as { t: number; price: number }[];
  }
}

export const LiveTokenChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<TimeframeKey>('1h');

  // Dynamic polling and buffer sizes by timeframe
  const intervalMs = useMemo(() => {
    switch (timeframe) {
      case '1m':
        return 3000; // 3s for snappier 1m view
      case '1h':
        return 10000; // 10s
      case '1d':
        return 30000; // 30s
      default:
        return 60000; // 60s for 1M / 3M
    }
  }, [timeframe]);

  const maxPoints = useMemo(() => {
    switch (timeframe) {
      case '1m':
        return 200;
      case '1h':
        return 1000;
      case '1d':
        return 3000;
      default:
        return 5000;
    }
  }, [timeframe]);

  const { series, latest } = useTokenMarketData({ intervalMs, maxPoints });

  // Load historical data for wider windows
  const [history, setHistory] = useState<{ t: number; price: number }[]>([]);
  useEffect(() => {
    let active = true;
    const hasAddress = /^0x[a-fA-F0-9]{40}$/.test(UMBI_TOKEN.address);
    if (!hasAddress) {
      setHistory([]);
      return;
    }
    if (['1d', '1mo', '3mo', '1h'].includes(timeframe)) {
      fetchHistoryByTimeframe(UMBI_TOKEN.address, timeframe).then((data) => {
        if (!active) return;
        setHistory(data);
      });
    } else {
      setHistory([]);
    }
    return () => {
      active = false;
    };
  }, [timeframe]);

  // Merge history with live series and filter by selected window
  const viewData = useMemo(() => {
    const windowMs = TIMEFRAMES.find((t) => t.key === timeframe)!.windowMs;
    const now = Date.now();
    const merged = [...history, ...series]
      .sort((a, b) => a.t - b.t)
      .filter((p, idx, arr) => idx === 0 || p.t !== arr[idx - 1].t);
    return merged.filter((p) => now - p.t <= windowMs);
  }, [series, history, timeframe]);

  const changePct = useMemo(() => {
    if (viewData.length < 2) return 0;
    const first = viewData[0].price;
    const last = viewData[viewData.length - 1].price;
    return ((last - first) / first) * 100;
  }, [viewData]);

  // Axis tick formatters
  const formatTick = (t: number) => {
    const d = new Date(t);
    switch (timeframe) {
      case '1m':
      case '1h':
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '1d':
        return d.toLocaleTimeString([], { hour: '2-digit' });
      default:
        return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const changePositive = changePct >= 0;

  return (
    <div className="relative rounded-xl overflow-hidden border shadow-lg bg-card h-full">
      <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between text-xs">
        <div className="font-medium">$UMBI Live</div>
        {latest && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Price</span>
            <span className="font-semibold">${latest.price.toFixed(4)}</span>
            <span className={changePositive ? 'text-green-600' : 'text-red-600'}>
              {changePositive ? '+' : ''}{changePct.toFixed(2)}%
            </span>
          </div>
        )}
      </div>

      {/* Timeframe selector */}
      <div className="absolute top-10 right-2 z-10 flex gap-1">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf.key}
            onClick={() => setTimeframe(tf.key)}
            className={`px-2 py-1 rounded border text-[10px] ${
              timeframe === tf.key ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground/80'
            }`}
            aria-label={`Show ${tf.label} timeframe`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      <div className="h-full pt-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={viewData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="t" tickFormatter={formatTick} tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground" />
            <YAxis domain={["dataMin", "dataMax"]} tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground" />
            <Tooltip
              formatter={(val: any, name: any) => [typeof val === 'number' ? `$${val.toFixed(4)}` : val, name === 'price' ? 'Price' : name]}
              labelFormatter={(t) => new Date(t).toLocaleString()}
            />
            <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#priceGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {latest && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3 text-[11px] flex items-center justify-center gap-4">
          {latest.holders != null && <span>Holders: <strong>{latest.holders.toLocaleString()}</strong></span>}
          {latest.supply != null && <span>Supply: <strong>{latest.supply.toLocaleString()}</strong></span>}
        </div>
      )}
    </div>
  );
};
