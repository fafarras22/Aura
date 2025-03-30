
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, color = 'primary', trend }: StatCardProps) {
  const getBgColor = () => {
    switch (color) {
      case 'green': return 'bg-green-100 dark:bg-green-900/20';
      case 'red': return 'bg-red-100 dark:bg-red-900/20';
      case 'blue': return 'bg-blue-100 dark:bg-blue-900/20';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900/20';
      case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900/20';
      default: return 'bg-primary/10';
    }
  };

  const getTextColor = () => {
    switch (color) {
      case 'green': return 'text-green-700 dark:text-green-400';
      case 'red': return 'text-red-700 dark:text-red-400';
      case 'blue': return 'text-blue-700 dark:text-blue-400';
      case 'purple': return 'text-purple-700 dark:text-purple-400';
      case 'yellow': return 'text-yellow-700 dark:text-yellow-400';
      default: return 'text-primary';
    }
  };

  return (
    <div className="rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${getBgColor()}`}>
          <Icon className={`h-5 w-5 ${getTextColor()}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-end gap-2">
            <h4 className="text-2xl font-semibold">{value}</h4>
            {trend && (
              <span className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : '-'}{trend.value}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
