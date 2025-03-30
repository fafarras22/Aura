
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SensorStatus = 'normal' | 'warning' | 'error';

interface SensorCardProps {
  name: string;
  value: number | string;
  unit: string;
  icon: ReactNode;
  status: SensorStatus;
  lastUpdated?: string;
}

export function SensorCard({
  name,
  value,
  unit,
  icon,
  status,
  lastUpdated,
}: SensorCardProps) {
  const statusColors = {
    normal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <Card className="sensor-card dark:border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-medium">{name}</CardTitle>
        <Badge variant="outline" className={statusColors[status]}>
          {status === 'normal' ? 'Normal' : status === 'warning' ? 'Warning' : 'Critical'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-xl text-gray-500 dark:text-gray-400">{unit}</div>
          <div className="text-akar-green p-2 rounded-full bg-akar-lightgreen/20 dark:bg-green-900/30">{icon}</div>
        </div>
        
        {lastUpdated && (
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
