import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTokenMarketData } from '@/hooks/useTokenMarketData';

export const LiveTokenChart: React.FC = () => {
  const { series, latest, change24h } = useTokenMarketData({ intervalMs: 10000, maxPoints: 180 });
  
  return (
    <div className="relative rounded-xl overflow-hidden border shadow-lg bg-card h-full">
      <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between text-xs">
        <div className="font-medium">$UMBI Live</div>
        {latest && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Price</span>
            <span className="font-semibold">${latest.price.toFixed(4)}</span>
            <span className={change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
              {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
            </span>
          </div>
        )}
      </div>
      <div className="h-full pt-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="t" tickFormatter={(t) => new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground" />
            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground" />
            <Tooltip formatter={(val: any, name: any) => [typeof val === 'number' ? `$${val.toFixed(4)}` : val, name === 'price' ? 'Price' : name]} labelFormatter={(t) => new Date(t).toLocaleTimeString()} />
            <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#priceGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {latest && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4 text-xs flex items-center justify-center gap-4">
          {latest.holders != null && <span>Holders: <strong>{latest.holders.toLocaleString()}</strong></span>}
          {latest.supply != null && <span>Supply: <strong>{latest.supply.toLocaleString()}</strong></span>}
        </div>
      )}
    </div>
  );
};
